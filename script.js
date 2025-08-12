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

// PREBUILT OUTFIT COLLECTION (Runway Lookbook)
const lookbook = {
  scraggles: [
    {
      label: "Crown & Coronation",
      data: {
        color: "ivory, gold and royal purple",
        topwear: "brocade bodice with peplum",
        bottomwear: "layered court skirt",
        pattern: "damask and tiny fleur-de-lis",
        cloak: "velvet train with ermine",
        sleeve: "elbow lace",
        headwear: "tall crystal crown",
        footwear: "pearl‑trim slippers",
        accessories: ["scepter","opera gloves"],
        fx: "soft aurora halo",
        affinity: ""
      }
    },
    {
      label: "Tea on the Balcony",
      data: {
        color: "mint, cream and gold",
        topwear: "cropped bouclé jacket",
        bottomwear: "pleated tea skirt",
        pattern: "herringbone tweed",
        cloak: "short capelet",
        sleeve: "3/4 sleeves",
        headwear: "crown fascinator",
        footwear: "slingback flats",
        accessories: ["satin gloves","teacup"],
        fx: "sun‑kiss shimmer",
        affinity: ""
      }
    },
    {
      label: "Battle‑Queen Aegis",
      data: {
        color: "onyx, gold and crimson",
        topwear: "gold‑inlaid breastplate",
        bottomwear: "armored skirt panels and leggings",
        pattern: "scale‑embossed metal",
        cloak: "short crimson war mantle",
        sleeve: "rune vambraces",
        headwear: "circlet‑helm",
        footwear: "sabaton boots",
        accessories: ["sword belt","gauntlets"],
        fx: "radiant barrier",
        affinity: ""
      }
    },
    {
      label: "Forest Diplomat",
      data: {
        color: "sage, cream and bronze",
        topwear: "linen wrap blouse",
        bottomwear: "split riding skirt",
        pattern: "leaf filigree",
        cloak: "moss travel cloak",
        sleeve: "bishop sleeves",
        headwear: "leaf crown",
        footwear: "riding boots",
        accessories: ["map case","leather gloves"],
        fx: "whispering leaves",
        affinity: ""
      }
    },
    {
      label: "Starlight Soirée",
      data: {
        color: "midnight, silver and opal",
        topwear: "off‑shoulder sequin bodice",
        bottomwear: "tulle mermaid tea‑length",
        pattern: "constellation beading",
        cloak: "sheer comet‑trail",
        sleeve: "long sheer gloves",
        headwear: "comet tiara",
        footwear: "crystal heels",
        accessories: ["satin clutch","diamond choker"],
        fx: "star‑glow aura",
        affinity: ""
      }
    }
  ],
  tibberz: [
    {
      label: "Classic Star Wizard",
      data: {
        color: "cobalt, silver and white",
        topwear: "star‑spangled long robe",
        bottomwear: "wide trousers under robe",
        pattern: "stitched constellations",
        cloak: "pointed mantle",
        sleeve: "bell sleeves",
        headwear: "tall cone hat",
        footwear: "curled slippers",
        accessories: ["round glasses","potion satchel"],
        fx: "rune sparkles",
        affinity: ""
      }
    },
    {
      label: "Street Alchemist",
      data: {
        color: "olive, charcoal and brass",
        topwear: "utility vest over linen",
        bottomwear: "cargo breeches",
        pattern: "patchwork canvas",
        cloak: "pocketed half‑cape apron",
        sleeve: "rolled sleeves",
        headwear: "newsboy cap with goggles",
        footwear: "lace‑up boots",
        accessories: ["vial bandolier","gloves"],
        fx: "fizzing cloud",
        affinity: ""
      }
    },
    {
      label: "Archmage Ceremonial",
      data: {
        color: "ivory, lapis and gold",
        topwear: "embroidered high‑collar robe",
        bottomwear: "layered panels and trousers",
        pattern: "geometric sigils",
        cloak: "ombré floor cape",
        sleeve: "layered cuffs",
        headwear: "halo brim hat",
        footwear: "soft slippers",
        accessories: ["staff","sigil gloves"],
        fx: "spell‑circle halo",
        affinity: ""
      }
    },
    {
      label: "Battle Mage",
      data: {
        color: "gunmetal, violet and ember",
        topwear: "reinforced short robe",
        bottomwear: "armored leggings",
        pattern: "hex‑stitch",
        cloak: "split combat cloak",
        sleeve: "rune bracers",
        headwear: "runic hood",
        footwear: "combat boots",
        accessories: ["spell grenades","fingerless gloves"],
        fx: "crackling ward",
        affinity: ""
      }
    },
    {
      label: "Winter Enchanter",
      data: {
        color: "frost blue, cream and silver",
        topwear: "knitted sweater‑tunic",
        bottomwear: "wool trousers",
        pattern: "fair‑isle snowflakes",
        cloak: "fur‑lined capelet",
        sleeve: "cable‑knit cuffs",
        headwear: "pom beanie (rune patch)",
        footwear: "fur boots",
        accessories: ["mittens","cocoa mug"],
        fx: "breath sparkles",
        affinity: ""
      }
    }
  ],
  buster: [
    {
      label: "Market Merchant Classic",
      data: {
        color: "warm brown, tan and moss",
        topwear: "quilted tunic",
        bottomwear: "rugged breeches",
        pattern: "grid quilting",
        cloak: "short leather capelet",
        sleeve: "rolled work sleeves",
        headwear: "flat cap",
        footwear: "ankle work boots",
        accessories: ["coin belt","apron"],
        fx: "luck aura",
        affinity: ""
      }
    },
    {
      label: "Highway Rascal",
      data: {
        color: "charcoal, burgundy and brass",
        topwear: "leather jacket",
        bottomwear: "knee‑patched trousers",
        pattern: "subtle chevron",
        cloak: "half‑cape",
        sleeve: "bracers",
        headwear: "hood with bandit scarf",
        footwear: "riding boots",
        accessories: ["grappling hook","gloves"],
        fx: "shadow blur",
        affinity: ""
      }
    },
    {
      label: "Poster Baddie Armor",
      data: {
        color: "obsidian and red",
        topwear: "sleek chestplate",
        bottomwear: "greaves and pants",
        pattern: "matte scales",
        cloak: "dramatic short cape",
        sleeve: "gauntlets",
        headwear: "open‑face helm",
        footwear: "heavy sabatons",
        accessories: ["utility belt","shield"],
        fx: "intimidation smoke",
        affinity: ""
      }
    },
    {
      label: "Festival Barker",
      data: {
        color: "saffron, teal and cream",
        topwear: "striped waistcoat",
        bottomwear: "cuffed trousers",
        pattern: "candy stripes",
        cloak: "showman tailcoat",
        sleeve: "puff sleeves",
        headwear: "bowler with ticket",
        footwear: "polished shoes",
        accessories: ["whistle","gloves"],
        fx: "confetti burst",
        affinity: ""
      }
    },
    {
      label: "River Scout",
      data: {
        color: "navy, olive and sand",
        topwear: "canvas field shirt",
        bottomwear: "utility shorts and leggings",
        pattern: "ripstop",
        cloak: "packable poncho",
        sleeve: "rolled sleeves",
        headwear: "wide‑brim hat",
        footwear: "waterproof boots",
        accessories: ["compass","knife"],
        fx: "current‑sense",
        affinity: ""
      }
    }
  ],
  muffins: [
    {
      label: "Leaf‑Queen Regalia",
      data: {
        color: "emerald, bark and gold",
        topwear: "woven leaf corset",
        bottomwear: "petal skirt",
        pattern: "vine embroidery",
        cloak: "trailing moss mantle",
        sleeve: "sheer vine sleeves",
        headwear: "living flower crown",
        footwear: "leaf‑lace sandals",
        accessories: ["druid staff","gloves"],
        fx: "biolume spores",
        affinity: ""
      }
    },
    {
      label: "Shaman’s Grotto",
      data: {
        color: "indigo, sage and charcoal",
        topwear: "wrap top",
        bottomwear: "sarong pants",
        pattern: "hand‑dyed shibori",
        cloak: "hooded shawl",
        sleeve: "arm‑warmers",
        headwear: "talisman hood",
        footwear: "moccasins",
        accessories: ["bone charms","crystal pendulum"],
        fx: "mist aura",
        affinity: ""
      }
    },
    {
      label: "River Rider",
      data: {
        color: "seafoam, slate and white",
        topwear: "waterproof vest",
        bottomwear: "quick‑dry pants",
        pattern: "fish‑scale quilt",
        cloak: "splash‑guard cape",
        sleeve: "roll‑tabs",
        headwear: "reed hat",
        footwear: "river boots",
        accessories: ["rope belt","gloves"],
        fx: "water‑walk ripple",
        affinity: ""
      }
    },
    {
      label: "Moonlit Ceremony",
      data: {
        color: "silver, lavender and midnight",
        topwear: "silk drape",
        bottomwear: "layered chiffon",
        pattern: "crescent motifs",
        cloak: "glowing gossamer",
        sleeve: "long bell sleeves",
        headwear: "crescent halo",
        footwear: "soft slippers",
        accessories: ["lantern","lace gloves"],
        fx: "lunar halo",
        affinity: ""
      }
    },
    {
      label: "Harvest Matriarch",
      data: {
        color: "pumpkin, wheat and russet",
        topwear: "linen blouse",
        bottomwear: "work skirt and apron",
        pattern: "plaid and embroidery",
        cloak: "short shawl",
        sleeve: "rolled sleeves",
        headwear: "straw crown",
        footwear: "ankle boots",
        accessories: ["basket","leather gloves"],
        fx: "bounty charm",
        affinity: ""
      }
    }
  ],
  pika: [
    {
      label: "Signature Street Prince",
      data: {
        color: "crimson, olive, charcoal and gold",
        topwear: "crimson hoodie",
        bottomwear: "olive shorts",
        pattern: "patched knit",
        cloak: "",
        sleeve: "rib cuffs",
        headwear: "",
        footwear: "rugged sneakers",
        accessories: ["crossbody pouch","wristband"],
        fx: "mischief spark",
        affinity: ""
      }
    },
    {
      label: "River Rogue",
      data: {
        color: "teal, sand and charcoal",
        topwear: "utility vest over tee",
        bottomwear: "quick‑dry cargos",
        pattern: "ripstop",
        cloak: "packable poncho",
        sleeve: "arm wraps",
        headwear: "cap with frog pin",
        footwear: "river sneakers",
        accessories: ["rope bracelet","gloves"],
        fx: "current hop",
        affinity: ""
      }
    },
    {
      label: "Royal Runaway",
      data: {
        color: "crimson, cream and gold",
        topwear: "cropped embroidered vest over hoodie",
        bottomwear: "soft tailored breeches",
        pattern: "crest embroidery",
        cloak: "short single‑shoulder cape",
        sleeve: "rolled sleeves",
        headwear: "cap with tiny crown pin",
        footwear: "ankle boots",
        accessories: ["utility belt","signet tag necklace"],
        fx: "royal spark",
        affinity: ""
      }
    },
    {
      label: "Shadow Courier",
      data: {
        color: "black, graphite and neon‑lime",
        topwear: "stealth zip‑up",
        bottomwear: "tapered joggers",
        pattern: "matte microgrid",
        cloak: "cropped stealth cape",
        sleeve: "thumb loops",
        headwear: "hood and mask",
        footwear: "silent runners",
        accessories: ["utility strap","messenger pack"],
        fx: "blur dash",
        affinity: ""
      }
    },
    {
      label: "Birthday King",
      data: {
        color: "ruby, confetti brights and white",
        topwear: "satin patch bomber",
        bottomwear: "tailored shorts with piping",
        pattern: "party crests",
        cloak: "short festive cape",
        sleeve: "bracelet‑length bands",
        headwear: "paper crown",
        footwear: "clean high‑tops",
        accessories: ["party whistle","tiny frog‑charm chain"],
        fx: "confetti sparkles",
        affinity: ""
      }
    }
  ],
  bey: [
    {
      label: "Apprentice Chic",
      data: {
        color: "olive, tan and brown",
        topwear: "cropped blouse",
        bottomwear: "uneven skirt (patched)",
        pattern: "visible stitching",
        cloak: "short travel mantle",
        sleeve: "rolled sleeves",
        headwear: "",
        footwear: "soft adventurer boots",
        accessories: ["frog pouch","gloves"],
        fx: "luck‑glow",
        affinity: ""
      }
    },
    {
      label: "Cliffside Scout",
      data: {
        color: "sky, charcoal and rust",
        topwear: "windbreaker vest over tunic",
        bottomwear: "shorts and leggings",
        pattern: "wind chevrons",
        cloak: "hooded short cape",
        sleeve: "elbow guards",
        headwear: "aviator cap with goggles",
        footwear: "grip boots",
        accessories: ["carabiners","gloves"],
        fx: "updraft glide",
        affinity: ""
      }
    },
    {
      label: "Frog Prince Heist",
      data: {
        color: "jade, black and gold",
        topwear: "sleek rogue vest",
        bottomwear: "tapered trousers",
        pattern: "leaf brocade",
        cloak: "half‑cape",
        sleeve: "lace‑up wraps",
        headwear: "frog‑stitched hood",
        footwear: "quiet boots",
        accessories: ["lockpicks","gloves"],
        fx: "camo shimmer",
        affinity: ""
      }
    },
    {
      label: "Festival Rogue",
      data: {
        color: "magenta, gold and black",
        topwear: "corset peplum",
        bottomwear: "flared skirt‑shorts",
        pattern: "filigree swirls",
        cloak: "playful capelet",
        sleeve: "puff sleeves",
        headwear: "feather mini hat",
        footwear: "heeled boots",
        accessories: ["lace gloves","coin chain"],
        fx: "sparkler aura",
        affinity: ""
      }
    },
    {
      label: "Shadow Diplomat",
      data: {
        color: "plum, charcoal and silver",
        topwear: "longline vest",
        bottomwear: "cigarette pants",
        pattern: "subtle jacquard",
        cloak: "structured shoulder cape",
        sleeve: "fitted sleeves",
        headwear: "wide‑brim hat",
        footwear: "pointed boots",
        accessories: ["document tube","gloves"],
        fx: "truth‑glow",
        affinity: ""
      }
    }
  ],
  ling: [
    {
      label: "Dragon‑Scale Hero",
      data: {
        color: "deep blue, charcoal and onyx",
        topwear: "dragon‑scale leather tunic",
        bottomwear: "dark pants",
        pattern: "scaled emboss",
        cloak: "one‑shoulder half‑cape",
        sleeve: "forearm guards",
        headwear: "",
        footwear: "adventurer boots",
        accessories: ["utility belt","gloves"],
        fx: "ember‑resist aura",
        affinity: ""
      }
    },
    {
      label: "Courtyard Duelist",
      data: {
        color: "white, navy and silver",
        topwear: "ruffled shirt with vest",
        bottomwear: "slim breeches",
        pattern: "pinstripe vest",
        cloak: "fencing capelet",
        sleeve: "puff‑to‑fitted sleeves",
        headwear: "plumed cap",
        footwear: "fencing boots",
        accessories: ["glove","rapier belt"],
        fx: "precision aura",
        affinity: ""
      }
    },
    {
      label: "River Pirate Captain",
      data: {
        color: "navy, rust and cream",
        topwear: "open coat over stripes",
        bottomwear: "cropped sailor trousers",
        pattern: "nautical stripe",
        cloak: "coat tails",
        sleeve: "cuffed sleeves",
        headwear: "tricorne",
        footwear: "deck boots",
        accessories: ["compass","gloves"],
        fx: "wave‑call",
        affinity: ""
      }
    },
    {
      label: "Royal Guard Trainee",
      data: {
        color: "crimson, gold and black",
        topwear: "military jacket",
        bottomwear: "pressed trousers",
        pattern: "chevron braid",
        cloak: "shoulder sash",
        sleeve: "button cuffs",
        headwear: "cadet cap",
        footwear: "polished boots",
        accessories: ["gloves","belt"],
        fx: "shield aura",
        affinity: ""
      }
    },
    {
      label: "Explorer Trickshot",
      data: {
        color: "khaki, moss and umber",
        topwear: "safari pocket shirt",
        bottomwear: "reinforced trousers",
        pattern: "herringbone canvas",
        cloak: "rolled poncho",
        sleeve: "roll‑tab sleeves",
        headwear: "adventure hat",
        footwear: "trail boots",
        accessories: ["slingshot holster","gloves"],
        fx: "eagle‑eye aura",
        affinity: ""
      }
    }
  ]
};

characters.pika.desc = 'an orange cat with slightly messy hair';
characters.bey.desc  = 'a black-and-calico cat with orange eyebrows';

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
      this.moodSelect      = $('#mood');
      this.characterSelect = $('#character');
      this.lookbookSelect  = $('#lookbook');   // new line
      this.catZone         = $('#categoryZone');
      this.outputEls       = {
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
      this.updateLookbookSelect();             // new line
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
    this.characterSelect.addEventListener('change', () => {
      this.populateOptions();
      this.randomize(true);
      this.updateLookbookSelect();          // new line
    });
    if (this.lookbookSelect) {
      this.lookbookSelect.addEventListener('change', () => this.applyLookbook()); // new line
    }
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
      if (this.lookbookSelect) {
        this.lookbookSelect.value = '';  // reset lookbook to Custom/Random on randomize
      }
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

    // Populate lookbook select based on chosen character
    updateLookbookSelect() {
      if (!this.lookbookSelect) return;
      const charKey = this.characterSelect.value;
      const select = this.lookbookSelect;
      select.innerHTML = '';
      const baseOpt = document.createElement('option');
      baseOpt.value = '';
      baseOpt.textContent = 'Custom/Random';
      select.appendChild(baseOpt);
      const entries = lookbook[charKey] || [];
      entries.forEach((entry, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = entry.label;
        select.appendChild(opt);
      });
    }

    // Apply a prebuilt outfit when selected
    applyLookbook() {
      const charKey = this.characterSelect.value;
      const idx = this.lookbookSelect?.value;
      if (!idx) return;
      const entries = lookbook[charKey] || [];
      const outfit = entries[idx];
      if (!outfit) return;
      const data = outfit.data;
      categories.forEach(cat => {
        const sel = document.getElementById(cat.id);
        if (!sel) return;
        if (data.hasOwnProperty(cat.id)) {
          if (cat.multi) {
            const values = Array.isArray(data[cat.id]) ? data[cat.id] : [data[cat.id]];
            [...sel.options].forEach(o => { o.selected = values.includes(o.value); });
          } else {
            sel.value = data[cat.id] || '';
          }
        }
      });
      this.updateOutput();
    }
  }

  /*** -------------------- Initialise -------------------- ***/
  window.addEventListener('DOMContentLoaded', () => new PromptGenerator());
})();
