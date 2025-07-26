export default {
  /**
   * Handle incoming HTTP requests to the Worker. When no `prompt` query
   * parameter is present, a simple HTML form is returned so the user can
   * enter a prompt. When a prompt is provided, the Worker will call the
   * Cloudflare Workers AI model and return an HTML page with the generated
   * image embedded as a data URI.
   *
   * Because the Flux model returns a base64 encoded JPEG, this implementation
   * avoids doing any manual binary‑to‑base64 conversion. Should you wish to
   * change to another model (like Stable Diffusion XL), update the model
   * identifier below and adjust how the response is handled.
   *
   * @param {Request} request Incoming request
   * @param {Object} env Worker environment bindings, including `AI`
   * @returns {Promise<Response>} HTML page or generated image
   */
  async fetch(request, env) {
    const url = new URL(request.url);
    const prompt = url.searchParams.get('prompt');

    // When no prompt is provided return a minimal HTML form.
    if (!prompt) {
      const html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>AI Image Generator</title>
            <style>
              body { font-family: sans-serif; margin: 2rem; }
              form { margin-top: 1rem; }
              input[type="text"] { width: 300px; padding: 0.5rem; }
              button { padding: 0.5rem 1rem; margin-left: 0.5rem; }
            </style>
          </head>
          <body>
            <h1>AI Image Generator</h1>
            <p>Enter a description and we will generate an image for you using Workers AI.</p>
            <form method="GET">
              <input type="text" name="prompt" placeholder="e.g. a cyberpunk lizard" required />
              <button type="submit">Generate</button>
            </form>
          </body>
        </html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    try {
      // Use the Flux Schnell model, which returns base64 encoded JPEG data.
      // A random seed ensures different results on each call.
      const seed = Math.floor(Math.random() * 1000000);
      const result = await env.AI.run('@cf/black-forest-labs/flux-1-schnell', { prompt, seed });

      // Compose an HTML page embedding the base64 image.
      const dataURI = `data:image/jpeg;base64,${result.image}`;
      const html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>AI Image Result</title>
            <style>
              body { font-family: sans-serif; margin: 2rem; }
              img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
              a { display: inline-block; margin-top: 1rem; }
            </style>
          </head>
          <body>
            <h1>Generated Image</h1>
            <p><strong>Prompt:</strong> ${this._escape(prompt)}</p>
            <img src="${dataURI}" alt="Generated image" />
            <p><a href="/">Generate another image</a></p>
          </body>
        </html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    } catch (err) {
      // If the AI call fails, return a helpful error message.
      const errorHtml = `<!DOCTYPE html>
        <html lang="en">
          <head><meta charset="utf-8" /><title>Error</title></head>
          <body>
            <h1>Something went wrong</h1>
            <p>We were unable to generate an image from your prompt.</p>
            <pre>${this._escape(err.message || String(err))}</pre>
            <p><a href="/">Try again</a></p>
          </body>
        </html>`;
      return new Response(errorHtml, { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
  },

  /**
   * Escape HTML special characters to prevent XSS when echoing user input
   * in the HTML response.
   *
   * @param {string} str
   * @returns {string}
   */
  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
};
