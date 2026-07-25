// tank-data.js - Comprehensive Fuel Tank Capacity Database
// Tank capacity in litres (L) and US gallons (gal)

const TANK_DATABASE = {
  // ── Indian Brands ──────────────────────────────────────────
  "maruti": {
    "swift": { L: 37, gal: 9.8 },
    "baleno": { L: 37, gal: 9.8 },
    "dzire": { L: 37, gal: 9.8 },
    "vitara brezza": { L: 48, gal: 12.7 },
    "brezza": { L: 48, gal: 12.7 },
    "wagonr": { L: 32, gal: 8.5 },
    "wagon r": { L: 32, gal: 8.5 },
    "ertiga": { L: 45, gal: 11.9 },
    "alto": { L: 35, gal: 9.2 },
    "celerio": { L: 32, gal: 8.5 },
    "s-cross": { L: 48, gal: 12.7 },
    "ciaz": { L: 43, gal: 11.4 },
    "xl6": { L: 45, gal: 11.9 },
    "ignis": { L: 32, gal: 8.5 },
    "alto k10": { L: 35, gal: 9.2 },
    "jimny": { L: 40, gal: 10.6 },
    "fronx": { L: 37, gal: 9.8 },
    "invicto": { L: 52, gal: 13.7 },
    "grand vitara": { L: 45, gal: 11.9 },
  },
  "suzuki": {
    "swift": { L: 37, gal: 9.8 },
    "baleno": { L: 37, gal: 9.8 },
    "dzire": { L: 37, gal: 9.8 },
    "vitara brezza": { L: 48, gal: 12.7 },
    "brezza": { L: 48, gal: 12.7 },
    "wagonr": { L: 32, gal: 8.5 },
    "ertiga": { L: 45, gal: 11.9 },
    "jimny": { L: 40, gal: 10.6 },
    "fronx": { L: 37, gal: 9.8 },
    "grand vitara": { L: 45, gal: 11.9 },
    "vitara": { L: 47, gal: 12.4 },
    "sx4": { L: 43, gal: 11.4 },
  },
  "tata": {
    "nexon": { L: 44, gal: 11.6 },
    "harrier": { L: 50, gal: 13.2 },
    "safari": { L: 50, gal: 13.2 },
    "altroz": { L: 37, gal: 9.8 },
    "tiago": { L: 35, gal: 9.2 },
    "punch": { L: 37, gal: 9.8 },
    "tigor": { L: 35, gal: 9.2 },
    "curvv": { L: 50, gal: 13.2 },
  },
  "mahindra": {
    "xuv300": { L: 42, gal: 11.1 },
    "xuv700": { L: 60, gal: 15.9 },
    "thar": { L: 57, gal: 15.1 },
    "scorpio": { L: 55, gal: 14.5 },
    "scorpio n": { L: 57, gal: 15.1 },
    "bolero": { L: 60, gal: 15.9 },
    "xuv500": { L: 55, gal: 14.5 },
    "xuv400": { L: 0, gal: 0, electric: true },
    "be 6": { L: 0, gal: 0, electric: true },
  },

  // ── Japanese Brands ────────────────────────────────────────
  "toyota": {
    "camry": { L: 60, gal: 15.8 },
    "corolla": { L: 50, gal: 13.2 },
    "rav4": { L: 55, gal: 14.5 },
    "highlander": { L: 67.5, gal: 17.9 },
    "tacoma": { L: 68, gal: 18.0 },
    "tundra": { L: 80, gal: 22.5 },
    "prius": { L: 43, gal: 11.3 },
    "4runner": { L: 68, gal: 23.0 },
    "avalon": { L: 60, gal: 15.8 },
    "yaris": { L: 42, gal: 11.1 },
    "supra": { L: 52, gal: 13.7 },
    "gr86": { L: 50, gal: 13.2 },
    "fortuner": { L: 80, gal: 21.1 },
    "innova": { L: 55, gal: 14.5 },
    "innova crysta": { L: 55, gal: 14.5 },
    "glanza": { L: 37, gal: 9.8 },
    "urban cruiser": { L: 48, gal: 12.7 },
    "hyryder": { L: 45, gal: 11.9 },
    "land cruiser": { L: 93, gal: 24.6 },
    "venza": { L: 55, gal: 14.5 },
    "sienna": { L: 68, gal: 18.0 },
    "chr": { L: 50, gal: 13.2 },
    "c-hr": { L: 50, gal: 13.2 },
  },
  "honda": {
    "civic": { L: 47, gal: 12.4 },
    "accord": { L: 56, gal: 14.8 },
    "cr-v": { L: 53, gal: 14.0 },
    "crv": { L: 53, gal: 14.0 },
    "hr-v": { L: 40, gal: 10.6 },
    "hrv": { L: 40, gal: 10.6 },
    "pilot": { L: 72, gal: 19.0 },
    "odyssey": { L: 73, gal: 19.5 },
    "fit": { L: 40, gal: 10.6 },
    "ridgeline": { L: 73, gal: 19.5 },
    "city": { L: 40, gal: 10.6 },
    "amaze": { L: 35, gal: 9.2 },
    "jazz": { L: 40, gal: 10.6 },
    "wr-v": { L: 40, gal: 10.6 },
    "wrv": { L: 40, gal: 10.6 },
    "br-v": { L: 42, gal: 11.1 },
    "passport": { L: 74, gal: 19.5 },
    "insight": { L: 40, gal: 10.6 },
    "elevate": { L: 40, gal: 10.6 },
  },
  "nissan": {
    "altima": { L: 61, gal: 16.2 },
    "sentra": { L: 50, gal: 13.2 },
    "rogue": { L: 55, gal: 14.5 },
    "pathfinder": { L: 72, gal: 19.0 },
    "frontier": { L: 73, gal: 19.4 },
    "murano": { L: 60, gal: 15.8 },
    "maxima": { L: 68, gal: 18.0 },
    "kicks": { L: 41, gal: 10.8 },
    "magnite": { L: 40, gal: 10.6 },
    "versa": { L: 41, gal: 10.8 },
    "titan": { L: 98, gal: 26.0 },
    "armada": { L: 98, gal: 26.0 },
    "leaf": { L: 0, gal: 0, electric: true },
  },
  "mazda": {
    "mazda3": { L: 51, gal: 13.5 },
    "3": { L: 51, gal: 13.5 },
    "mazda6": { L: 62, gal: 16.4 },
    "6": { L: 62, gal: 16.4 },
    "cx-5": { L: 56, gal: 14.8 },
    "cx5": { L: 56, gal: 14.8 },
    "cx-9": { L: 73, gal: 19.3 },
    "cx9": { L: 73, gal: 19.3 },
    "cx-30": { L: 48, gal: 12.7 },
    "cx30": { L: 48, gal: 12.7 },
    "cx-50": { L: 60, gal: 15.8 },
    "mx-5": { L: 45, gal: 11.9 },
    "miata": { L: 45, gal: 11.9 },
  },
  "subaru": {
    "outback": { L: 63, gal: 16.6 },
    "forester": { L: 63, gal: 16.6 },
    "crosstrek": { L: 63, gal: 16.6 },
    "impreza": { L: 50, gal: 13.2 },
    "wrx": { L: 60, gal: 15.9 },
    "ascent": { L: 73, gal: 19.3 },
    "legacy": { L: 60, gal: 15.9 },
    "brz": { L: 50, gal: 13.2 },
  },
  "mitsubishi": {
    "outlander": { L: 60, gal: 15.9 },
    "eclipse cross": { L: 54, gal: 14.3 },
    "outlander sport": { L: 60, gal: 15.9 },
    "pajero": { L: 68, gal: 18.0 },
    "triton": { L: 75, gal: 19.8 },
  },

  // ── American Brands ──────────────────────────────────────
  "ford": {
    "f-150": { L: 98, gal: 26.0 },
    "f150": { L: 98, gal: 26.0 },
    "mustang": { L: 60, gal: 16.0 },
    "explorer": { L: 70, gal: 18.6 },
    "escape": { L: 53, gal: 14.0 },
    "fusion": { L: 54, gal: 14.2 },
    "focus": { L: 50, gal: 13.2 },
    "ranger": { L: 80, gal: 21.1 },
    "bronco": { L: 64, gal: 16.9 },
    "bronco sport": { L: 54, gal: 14.2 },
    "edge": { L: 67, gal: 17.5 },
    "expedition": { L: 104, gal: 27.8 },
    "ecosport": { L: 52, gal: 13.7 },
    "maverick": { L: 52, gal: 13.8 },
    "f-250": { L: 120, gal: 31.7 },
    "f250": { L: 120, gal: 31.7 },
    "endeavour": { L: 80, gal: 21.1 },
  },
  "chevrolet": {
    "silverado": { L: 91, gal: 24.0 },
    "camaro": { L: 72, gal: 19.0 },
    "malibu": { L: 55, gal: 14.5 },
    "equinox": { L: 53, gal: 14.0 },
    "traverse": { L: 73, gal: 19.4 },
    "corvette": { L: 70, gal: 18.5 },
    "tahoe": { L: 91, gal: 24.0 },
    "suburban": { L: 91, gal: 24.0 },
    "colorado": { L: 63, gal: 16.6 },
    "blazer": { L: 55, gal: 14.5 },
    "trax": { L: 48, gal: 12.6 },
    "bolt": { L: 0, gal: 0, electric: true },
  },
  "dodge": {
    "charger": { L: 68, gal: 18.0 },
    "challenger": { L: 70, gal: 18.5 },
    "durango": { L: 93, gal: 24.6 },
  },
  "ram": {
    "1500": { L: 98, gal: 26.0 },
    "2500": { L: 120, gal: 31.7 },
  },
  "jeep": {
    "wrangler": { L: 72, gal: 18.5 },
    "grand cherokee": { L: 93, gal: 24.6 },
    "cherokee": { L: 60, gal: 15.8 },
    "compass": { L: 51, gal: 13.5 },
    "gladiator": { L: 83, gal: 21.5 },
    "renegade": { L: 48, gal: 12.7 },
    "meridian": { L: 50, gal: 13.2 },
  },
  "gmc": {
    "sierra": { L: 91, gal: 24.0 },
    "terrain": { L: 55, gal: 14.5 },
    "acadia": { L: 73, gal: 19.4 },
    "yukon": { L: 91, gal: 24.0 },
    "canyon": { L: 63, gal: 16.6 },
  },

  // ── Korean Brands ──────────────────────────────────────────
  "hyundai": {
    "elantra": { L: 47, gal: 12.4 },
    "sonata": { L: 60, gal: 15.9 },
    "tucson": { L: 54, gal: 14.3 },
    "santa fe": { L: 67, gal: 17.7 },
    "kona": { L: 47, gal: 12.4 },
    "venue": { L: 37, gal: 9.8 },
    "palisade": { L: 71, gal: 18.8 },
    "i10": { L: 35, gal: 9.2 },
    "grand i10": { L: 35, gal: 9.2 },
    "i20": { L: 37, gal: 9.8 },
    "creta": { L: 50, gal: 13.2 },
    "verna": { L: 45, gal: 11.9 },
    "alcazar": { L: 50, gal: 13.2 },
    "aura": { L: 37, gal: 9.8 },
    "santro": { L: 35, gal: 9.2 },
    "accent": { L: 43, gal: 11.4 },
    "ioniq 5": { L: 0, gal: 0, electric: true },
    "ioniq 6": { L: 0, gal: 0, electric: true },
  },
  "kia": {
    "forte": { L: 50, gal: 13.2 },
    "optima": { L: 62, gal: 16.4 },
    "k5": { L: 62, gal: 16.4 },
    "sportage": { L: 54, gal: 14.3 },
    "telluride": { L: 71, gal: 18.8 },
    "sorento": { L: 67, gal: 17.7 },
    "soul": { L: 54, gal: 14.2 },
    "seltos": { L: 50, gal: 13.2 },
    "sonet": { L: 37, gal: 9.8 },
    "carens": { L: 45, gal: 11.9 },
    "carnival": { L: 72, gal: 19.0 },
    "ev6": { L: 0, gal: 0, electric: true },
    "ev9": { L: 0, gal: 0, electric: true },
  },

  // ── German Brands ──────────────────────────────────────────
  "bmw": {
    "3 series": { L: 59, gal: 15.6 },
    "320": { L: 59, gal: 15.6 },
    "330": { L: 59, gal: 15.6 },
    "5 series": { L: 68, gal: 18.0 },
    "530": { L: 68, gal: 18.0 },
    "540": { L: 68, gal: 18.0 },
    "x1": { L: 54, gal: 14.3 },
    "x3": { L: 65, gal: 17.2 },
    "x5": { L: 83, gal: 21.9 },
    "x7": { L: 83, gal: 21.9 },
    "7 series": { L: 82, gal: 21.7 },
    "m3": { L: 59, gal: 15.6 },
    "m5": { L: 68, gal: 18.0 },
    "2 series": { L: 52, gal: 13.7 },
    "4 series": { L: 59, gal: 15.6 },
    "i4": { L: 0, gal: 0, electric: true },
    "ix": { L: 0, gal: 0, electric: true },
  },
  "mercedes": {
    "c-class": { L: 66, gal: 17.4 },
    "c class": { L: 66, gal: 17.4 },
    "c300": { L: 66, gal: 17.4 },
    "e-class": { L: 66, gal: 17.4 },
    "e class": { L: 66, gal: 17.4 },
    "e300": { L: 66, gal: 17.4 },
    "glc": { L: 66, gal: 17.4 },
    "gle": { L: 85, gal: 22.5 },
    "gla": { L: 51, gal: 13.5 },
    "glb": { L: 56, gal: 14.8 },
    "gls": { L: 91, gal: 24.0 },
    "s-class": { L: 76, gal: 20.1 },
    "s class": { L: 76, gal: 20.1 },
    "a-class": { L: 51, gal: 13.5 },
    "a class": { L: 51, gal: 13.5 },
    "eqe": { L: 0, gal: 0, electric: true },
    "eqs": { L: 0, gal: 0, electric: true },
  },
  "mercedes-benz": {
    "c-class": { L: 66, gal: 17.4 },
    "c class": { L: 66, gal: 17.4 },
    "c300": { L: 66, gal: 17.4 },
    "e-class": { L: 66, gal: 17.4 },
    "e class": { L: 66, gal: 17.4 },
    "glc": { L: 66, gal: 17.4 },
    "gle": { L: 85, gal: 22.5 },
    "gla": { L: 51, gal: 13.5 },
    "s-class": { L: 76, gal: 20.1 },
  },
  "volkswagen": {
    "jetta": { L: 55, gal: 14.5 },
    "golf": { L: 50, gal: 13.2 },
    "tiguan": { L: 62, gal: 16.4 },
    "atlas": { L: 70, gal: 18.6 },
    "passat": { L: 62, gal: 16.4 },
    "polo": { L: 45, gal: 11.9 },
    "vento": { L: 55, gal: 14.5 },
    "taigun": { L: 50, gal: 13.2 },
    "virtus": { L: 45, gal: 11.9 },
    "taos": { L: 50, gal: 13.2 },
    "id.4": { L: 0, gal: 0, electric: true },
    "id.buzz": { L: 0, gal: 0, electric: true },
  },
  "audi": {
    "a4": { L: 58, gal: 15.3 },
    "a6": { L: 73, gal: 19.3 },
    "a3": { L: 50, gal: 13.2 },
    "q5": { L: 65, gal: 17.2 },
    "q7": { L: 85, gal: 22.5 },
    "q3": { L: 56, gal: 14.8 },
    "q8": { L: 85, gal: 22.5 },
    "a5": { L: 58, gal: 15.3 },
    "a8": { L: 82, gal: 21.7 },
    "e-tron": { L: 0, gal: 0, electric: true },
    "q8 e-tron": { L: 0, gal: 0, electric: true },
  },
  "porsche": {
    "cayenne": { L: 75, gal: 19.8 },
    "macan": { L: 65, gal: 17.2 },
    "911": { L: 64, gal: 16.9 },
    "panamera": { L: 80, gal: 21.1 },
    "boxster": { L: 54, gal: 14.3 },
    "cayman": { L: 54, gal: 14.3 },
    "taycan": { L: 0, gal: 0, electric: true },
  },

  // ── Luxury / Others ────────────────────────────────────────
  "lexus": {
    "es": { L: 60, gal: 15.8 },
    "rx": { L: 65, gal: 17.2 },
    "nx": { L: 53, gal: 14.0 },
    "is": { L: 66, gal: 17.4 },
    "gx": { L: 87, gal: 23.0 },
    "lx": { L: 93, gal: 24.6 },
    "ux": { L: 43, gal: 11.4 },
  },
  "volvo": {
    "xc60": { L: 71, gal: 18.8 },
    "xc90": { L: 71, gal: 18.8 },
    "xc40": { L: 54, gal: 14.3 },
    "s60": { L: 60, gal: 15.9 },
    "s90": { L: 60, gal: 15.9 },
  },
  "land rover": {
    "defender": { L: 90, gal: 23.8 },
    "discovery": { L: 85, gal: 22.5 },
    "range rover": { L: 90, gal: 23.8 },
    "range rover sport": { L: 86, gal: 22.7 },
    "range rover evoque": { L: 57, gal: 15.1 },
    "discovery sport": { L: 65, gal: 17.2 },
  },

  // ── Electric Brands ────────────────────────────────────────
  "tesla": {
    "model 3": { L: 0, gal: 0, electric: true, battery_kwh: 75 },
    "model y": { L: 0, gal: 0, electric: true, battery_kwh: 75 },
    "model s": { L: 0, gal: 0, electric: true, battery_kwh: 100 },
    "model x": { L: 0, gal: 0, electric: true, battery_kwh: 100 },
    "cybertruck": { L: 0, gal: 0, electric: true, battery_kwh: 123 },
  },
  "rivian": {
    "r1t": { L: 0, gal: 0, electric: true, battery_kwh: 135 },
    "r1s": { L: 0, gal: 0, electric: true, battery_kwh: 135 },
  },
};

// Class-based estimation fallback (litres)
const CLASS_ESTIMATES = {
  "subcompact": { L: 40, gal: 10.6 },
  "compact": { L: 47, gal: 12.4 },
  "midsize": { L: 55, gal: 14.5 },
  "large": { L: 65, gal: 17.2 },
  "suv": { L: 60, gal: 15.9 },
  "small suv": { L: 50, gal: 13.2 },
  "midsize suv": { L: 65, gal: 17.2 },
  "large suv": { L: 90, gal: 23.8 },
  "pickup": { L: 80, gal: 21.1 },
  "minivan": { L: 72, gal: 19.0 },
  "sports": { L: 55, gal: 14.5 },
  "luxury": { L: 68, gal: 18.0 },
  "default": { L: 50, gal: 13.2 },
};

/**
 * Look up fuel tank capacity by make and model.
 * Case-insensitive, with fuzzy model matching.
 * @param {string} make - Vehicle make (e.g., "Toyota")
 * @param {string} model - Vehicle model (e.g., "Camry")
 * @returns {object|null} { L, gal, electric?, battery_kwh? } or null
 */
export function lookupTankCapacity(make, model) {
  if (!make || !model) return null;

  const normMake = make.toLowerCase().trim();
  const normModel = model.toLowerCase().trim();

  // Direct lookup
  const makeEntry = TANK_DATABASE[normMake];
  if (makeEntry) {
    // Try exact match
    if (makeEntry[normModel]) return { ...makeEntry[normModel], source: 'database' };

    // Fuzzy: check if model contains or is contained by any key
    for (const [key, val] of Object.entries(makeEntry)) {
      if (normModel.includes(key) || key.includes(normModel)) {
        return { ...val, source: 'database' };
      }
    }
  }

  // Try partial make match (e.g., "maruti suzuki" → "maruti")
  for (const [dbMake, models] of Object.entries(TANK_DATABASE)) {
    if (normMake.includes(dbMake) || dbMake.includes(normMake)) {
      if (models[normModel]) return { ...models[normModel], source: 'database' };
      for (const [key, val] of Object.entries(models)) {
        if (normModel.includes(key) || key.includes(normModel)) {
          return { ...val, source: 'database' };
        }
      }
    }
  }

  return null;
}

/**
 * Estimate tank capacity from vehicle class string.
 */
export function estimateTankFromClass(vehicleClass) {
  if (!vehicleClass) return CLASS_ESTIMATES["default"];
  const cls = vehicleClass.toLowerCase();
  for (const [key, val] of Object.entries(CLASS_ESTIMATES)) {
    if (cls.includes(key)) return { ...val, source: 'estimate' };
  }
  return { ...CLASS_ESTIMATES["default"], source: 'estimate' };
}
