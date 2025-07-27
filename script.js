/* Tibberz Prompt Generator
   — encapsulated in an IIFE to avoid global pollution — */
(() => {
  'use strict';

  /*** -------------------- Data -------------------- ***/
const categories = [
    { id:'color', label:'🎨 Color Scheme', mandatory:true, items:[
      {t:'deep purple',          m:['Regal','Mysterious','Dramatic']},
      {t:'forest green',         m:['Whimsical','Cozy']},
      {t:'midnight blue',        m:['Mysterious','Academic']},
      {t:'burnt orange',         m:['Battle‑ready','Dramatic']},
      {t:'charcoal grey',        m:['Academic','Regal','Battle‑ready']},
      {t:'pale ivory with gold trim',  m:['Regal','Academic']},
      {t:'plum + ash blend',     m:['Regal','Whimsical']},
      {t:'rust red + black',     m:['Battle‑ready','Dramatic']},
      {t:'bronze with obsidian edge',  m:['Regal','Dramatic']},
      {t:'dusty rose with starlight shimmer', m:['Whimsical','Cozy']}
    ]},
    { id:'topwear', label:'🧥 Topwear', mandatory:true, items:[
      {t:'embroidered arcane robe', m:['Regal','Academic']},
      {t:'silk scholar’s shirt with scroll‑stamped runes',m:['Academic']},
      {t:'loose woven tunic with asymmetrical wrap',m:['Cozy','Whimsical']},
      {t:'high‑collar coat with velvet trim',m:['Regal','Dramatic']},
      {t:'fitted padded vest with looped cord fasteners',m:['Battle‑ready']},
      {t:'quilted overcoat with stitched constellation patterns',m:['Mysterious']},
      {t:'double‑breasted coat with gemstone toggles',m:['Regal']},
      {t:'soft hooded pullover with arcane threadwork',m:['Cozy','Whimsical']},
      {t:'leather shoulder wrap with magic insignias',m:['Battle‑ready']},
      {t:'sleeveless ceremonial tabard with side slits',m:['Academic','Dramatic']},
      {t:'chainstitched undershirt with potion‑resistant fibers',m:['Academic','Cozy']}
    ]},
    { id:'bottomwear', label:'👖 Bottomwear', mandatory:true, items:[
      {t:'layered skirt robe',m:['Whimsical','Regal']},
      {t:'quilted leggings with glyph panels',m:['Battle‑ready','Academic']},
      {t:'patched trousers with arcane tags',m:['Cozy','Whimsical']},
      {t:'wide‑split hakama with rune hems',m:['Academic','Battle‑ready']},
      {t:'flowing robe skirt with side vents',m:['Whimsical']},
      {t:'woven pants with ankle binding ties',m:['Cozy','Battle‑ready']},
      {t:'sigil‑marked thigh wraps',m:['Battle‑ready']},
      {t:'textured leather breeches with reinforced knees',m:['Battle‑ready','Dramatic']},
      {t:'baggy mage pants with scroll pockets',m:['Academic','Whimsical']},
      {t:'wraparound pants with braided rope belt',m:['Whimsical','Cozy']}
    ]},
    { id:'pattern', label:'🧵 Pattern', mandatory:true, items:[
      {t:'arcane runes',m:['Academic','Mysterious']},
      {t:'sigil lattice',m:['Academic']},
      {t:'constellation lines',m:['Mysterious']},
      {t:'crescent moons',m:['Whimsical']},
      {t:'circular spell seals',m:['Regal','Academic']},
      {t:'enchanted vines',m:['Whimsical']},
      {t:'geometric magical gridwork',m:['Academic','Dramatic']},
      {t:'whimsical patch stitching',m:['Cozy','Whimsical']},
      {t:'floating glyph embroidery',m:['Mysterious','Regal']},
      {t:'glowing stitched trim',m:['Dramatic','Mysterious']}
    ]},
    { id:'cloak', label:'🧥 Cloak / Cape', mandatory:true, items:[
      {t:'floor‑length mage cloak',m:['Regal','Dramatic']},
      {t:'short half‑cape with pin',m:['Whimsical']},
      {t:'triangular scarf cloak',m:['Cozy','Whimsical']},
      {t:'cloak made of illusionary thread',m:['Mysterious']},
      {t:'druidic vine cloak',m:['Whimsical']},
      {t:'constellation cape',m:['Mysterious','Regal']},
      {t:'magical animated fabric mantle',m:['Whimsical','Dramatic']},
      {t:'torn battle cloak with protective enchantment',m:['Battle‑ready','Dramatic']},
      {t:'silk winged cloak with subtle motion charm',m:['Regal','Whimsical']}
    ]},
    { id:'sleeve', label:'🧤 Sleeve & Shoulder', mandatory:true, items:[
      {t:'no sleeves',m:['Battle‑ready','Cozy']},
      {t:'loose sleeves with rune‑thread seams',m:['Whimsical','Academic']},
      {t:'bell sleeves with velvet lining',m:['Regal','Dramatic']},
      {t:'half‑length arcane‑marked sleeves',m:['Academic','Battle‑ready']},
      {t:'layered arm wraps with straps',m:['Battle‑ready']},
      {t:'rolled sleeves with brass fasteners',m:['Cozy','Academic']},
      {t:'leather spaulders etched with protective glyphs',m:['Battle‑ready','Dramatic']},
      {t:'feathered shoulder coverings',m:['Whimsical']},
      {t:'rigid cloth pads with symbol embroidery',m:['Academic','Regal']}
    ]},
    { id:'headwear', label:'👑 Headwear', mandatory:true, items:[
      {t:'classic wizard hat with bent tip',m:['Whimsical','Academic']},
      {t:'mushroom cap crown',m:['Whimsical']},
      {t:'rune‑stamped head wrap',m:['Battle‑ready','Academic']},
      {t:'floating chalk‑ring halo',m:['Mysterious','Dramatic']},
      {t:'scroll‑stacked circlet crown',m:['Regal']},
      {t:'decorative hood with clasped front',m:['Cozy','Mysterious']},
      {t:'mage’s veil with transparent crest',m:['Regal','Mysterious']},
      {t:'leaf‑and‑wire tiara',m:['Whimsical']}
    ]},
    { id:'footwear', label:'👞 Footwear', mandatory:true, items:[
      {t:'curled leather boots',m:['Whimsical','Regal']},
      {t:'barefoot with glowing sigils',m:['Mysterious']},
      {t:'reinforced cloth wraps',m:['Battle‑ready']},
      {t:'soft platform slippers',m:['Cozy','Regal']},
      {t:'high‑laced mage sandals',m:['Academic']},
      {t:'metal‑rimmed flats',m:['Dramatic','Regal']},
      {t:'tabi‑style enchanted socks',m:['Battle‑ready','Cozy']},
      {t:'patterned ankle boots with star buckles',m:['Whimsical','Dramatic']}
    ]},
    { id:'accessories', label:'🎒 Accessories (≤2)', mandatory:true, multi:true, max:2, items:[
      {t:'wand holster belt',m:['Battle‑ready','Academic']},
      {t:'mini spellbook satchel',m:['Academic','Cozy']},
      {t:'pet familiar (owl, frog, or small dragon)',m:['Whimsical']},
      {t:'glowing animated scarf',m:['Dramatic','Whimsical']},
      {t:'potion vials on a charm ring',m:['Academic']},
      {t:'chain‑bound scroll case',m:['Academic','Regal']},
      {t:'floating monocle',m:['Regal','Mysterious']},
      {t:'enchanted brooch',m:['Regal','Whimsical']},
      {t:'trinket pouch with button crest',m:['Cozy','Whimsical']},
      {t:'runed crystal on a cord necklace',m:['Mysterious','Regal']}
    ]},
    { id:'fx', label:'🌌 Passive Magic FX (optional)', mandatory:false, items:[
      {t:'floating arcane rings',m:['Academic','Dramatic']},
      {t:'rotating rune halo',m:['Mysterious']},
      {t:'sparkling foot trail',m:['Whimsical']},
      {t:'dust motes of enchanted light',m:['Cozy','Whimsical']},
      {t:'heat shimmer outline',m:['Battle‑ready','Dramatic']},
      {t:'whispering symbols in ambient glow',m:['Mysterious','Academic']},
      {t:'spiraling text around wrists',m:['Dramatic','Academic']},
      {t:'blink shimmer at fingertips',m:['Whimsical','Mysterious']},
      {t:'',m:[]} // allows "none"
    ]},
    { id:'affinity', label:'🔮 Magic Affinity (optional)', mandatory:false, items:[
      {t:'chronomancy',m:['Academic','Mysterious']},
      {t:'nature',m:['Cozy']},
      {t:'chaos',m:['Dramatic']},
      {t:'light',m:['Whimsical','Regal']},
      {t:'shadow',m:['Mysterious','Dramatic']},
      {t:'dream',m:['Whimsical','Cozy']},
      {t:'alchemy',m:['Academic']},
      {t:'divination',m:['Academic','Regal']},
      {t:'weather',m:['Whimsical']},
      {t:'',m:[]}
    ]}
];

  const characters = {
    scraggles: { name: 'Queen Scraggles 👑', desc: 'an anthropomorphic gray and white shitzu Queen' },
    tibberz:   { name: 'Tibberz🧙', desc: 'an anthropomorphic brown Pomeranian with round glasses' },
    muffins:   { name: 'Muffins🌲', desc: 'an anthropomorphic mystical gray cat' },
    buster:    { name: 'Buster 🍗', desc: 'an anthropomorphic friendly brown dog with floppy ears' },
    pika:      { name: 'Pika🧡', desc: 'an anthropomorphic young fluffy orange cat' },
    bey:       { name: 'Bey🐸', desc: 'a young anthropomorphic black and calico cat with defined orange eyebrows' },
    ling:      { name: 'Ling🕶️', desc: 'a young anthropomorphic platinum blonde cat' },
  };

  /*** -------------------- Utilities -------------------- ***/
  const $ = sel => document.querySelector(sel);

  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sampleN = (arr, n = 2) => {
    const work = [...arr];
    const out  = [];
    while (out.length < n && work.length) {
      out.push(work.splice(Math.floor(Math.random() * work.length), 1)[0]);
    }
    return out;
  };

  /*** -------------------- Core Class -------------------- ***/
  class PromptGenerator {
    constructor() {
      this.moodSelect     = $('#mood');
      this.characterSelect = $('#character');
      this.catZone        = $('#categoryZone');
      this.outputEls  = {
        full:    $('#outFull'),
        outfit:  $('#outOutfit'),
        caption: $('#outCaption'),
        doll:    $('#outDoll'),
        json:    $('#outJSON')
      };
      this.buildUI();
      this.attachTopEvents();
      // first render
      this.populateOptions();
      this.randomize(true);
    }

    /** Build every category card dynamically */
    buildUI() {
      categories.forEach(cat => {
        // card
        const card = document.createElement('div');
        card.className = 'card';

        // label
        const lab = document.createElement('label');
        lab.textContent = cat.label;
        card.appendChild(lab);

        // select
        const sel = document.createElement('select');
        sel.id = cat.id;
        if (cat.multi) sel.multiple = true;
        card.appendChild(sel);

        // lock toggle (checkbox + label) (for mandatory categories)
        const lockDiv = document.createElement('div');
        lockDiv.className = 'lock';

        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.id = `lock_${cat.id}`;
        lockDiv.appendChild(chk);

        const lbl = document.createElement('label');
        lbl.htmlFor = chk.id;
        lbl.textContent = 'lock';
        lockDiv.appendChild(lbl);

        card.appendChild(lockDiv);
        this.catZone.appendChild(card);

        // selection change updates output
        sel.addEventListener('change', () => this.updateOutput());
      });

      // buttons
      $('#btnRandomAll').addEventListener('click', () => this.randomize(true));
      $('#btnReroll').addEventListener('click', () => this.randomize(false));
    }

    /** Attach mood change listener */
  attachTopEvents() {
    this.moodSelect.addEventListener('change', () => {
      this.populateOptions();
      this.randomize(true);
    });
    this.characterSelect.addEventListener('change', () => this.updateOutput());
  }

    /** Populate each <select> with options filtered by mood */
    populateOptions() {
      const mood = this.moodSelect.value;
      categories.forEach(cat => {
        const sel = $(`#${cat.id}`);
        sel.innerHTML = ''; // clear
        this.getPool(cat, mood).forEach(it => {
          const opt = document.createElement('option');
          opt.textContent = opt.value = it.t;
          sel.appendChild(opt);
        });
      });
    }

    /** Return array of items fitting current mood (or all for Wildcard) */
    getPool(cat, mood) {
      if (mood === 'Wildcard') return cat.items;
      return cat.items.filter(it => it.m.includes(mood));
    }

    /** Randomize selections; all = true forces every category, otherwise respects "lock" checkboxes */
    randomize(all = true) {
      const mood = this.moodSelect.value;
      categories.forEach(cat => {
        if (!all && $(`#lock_${cat.id}`).checked) return;

        const sel = $(`#${cat.id}`);
        const pool = this.getPool(cat, mood);

        if (cat.multi) {
          // clear existing
          [...sel.options].forEach(o => o.selected = false);
          sampleN(pool, cat.max || 2).forEach(item => {
            const opt = [...sel.options].find(o => o.value === item.t);
            if (opt) opt.selected = true;
          });
        } else {
          sel.value = sample(pool).t;
        }
      });
      this.updateOutput();
    }

    /** Build every export string and JSON */
    updateOutput() {
      const data = {};
      categories.forEach(cat => {
        const sel = $(`#${cat.id}`);
        data[cat.id] = cat.multi
          ? [...sel.selectedOptions].map(o => o.value).slice(0, cat.max || 2)
          : sel.value;
      });

      /* ----- Text helpers ----- */
      const accessoriesTxt = data.accessories.length
        ? data.accessories.join(' and ')
        : 'no accessories';

      const char = characters[this.characterSelect.value] || characters.tibberz;

      const fxSentence = data.fx.trim()
        ? `A ${data.fx} follows them wherever they move.`
        : '';

      const affinitySentence = data.affinity.trim()
        ? `Their style is unmistakably shaped by a connection to ${data.affinity} magic — practical, layered, and spell‑ready.`
        : 'Their style is practical, layered, and spell‑ready.';

      /* ----- Full prompt (cleanly assembled) ----- */
      const fullParts = [
        `${char.name}, ${char.desc}, wears a ${data.color} ${data.topwear} decorated with ${data.pattern}, paired with ${data.bottomwear} designed for balance and movement.`,
        `Draped over their shoulders is a ${data.cloak} and their ${data.sleeve} adds dramatic flair.`,
        `On their head sits a ${data.headwear}, and they walk confidently in ${data.footwear}.`,
        `They carry ${accessoriesTxt}.`,
        fxSentence,
        affinitySentence
      ];

      const tidy = txt => txt.replace(/\s+/g, ' ').trim();

      this.outputEls.full.value    = tidy(fullParts.filter(Boolean).join(' '));
      this.outputEls.outfit.value  = tidy(
        `A ${data.color} ${data.topwear} with ${data.pattern}; ${data.bottomwear}; ${data.cloak}; ${data.sleeve}; ${data.headwear}; ${data.footwear}; accessories: ${accessoriesTxt}${data.fx ? ', ' + data.fx : ''}.`
      );
      this.outputEls.caption.value = tidy(
        `A ${data.color}-clad ${char.name} dons a ${data.topwear} and ${data.cloak}, ready for adventure.`
      );
      this.outputEls.doll.value    = tidy(
        `${char.name} plush doll in ${data.color} outfit with ${data.headwear} and tiny ${data.cloak}.`
      );
      this.outputEls.json.value    = JSON.stringify(data, null, 2);
    }
  }

  /*** -------------------- Initialise -------------------- ***/
  window.addEventListener('DOMContentLoaded', () => new PromptGenerator());
})();
