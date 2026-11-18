/**
 * Query normalisation for Bangla, English and Banglish (Bangla typed in Latin letters).
 *
 * Field officers type questions however is fastest on their phone: "koto litar lagbe",
 * "কত লিটার লাগবে" and "how many litres" should all mean the same thing. This module maps
 * common spellings onto one canonical token so intent detection and retrieval only have
 * to deal with a single vocabulary. The table is a small demo subset.
 */

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

export function toAsciiDigits(s: string): string {
  return s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

export function toBanglaDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Multi-word phrases first, so "square feet" is caught before "feet". */
const PHRASES: [RegExp, string][] = [
  [/স্ক(?:য়|য়)ার\s*ফিট|বর্গ\s*ফুট|square\s*f(?:ee|oo)t|sq\.?\s*f(?:ee)?t|sqft|sft/g, ' sqft '],
  [/top\s*coat|টপ\s*কোট|ফিনিশ\s*কোট/g, ' topcoat '],
  [/drying\s*time|শুকাতে\s*কত\s*সময়/g, ' dry time '],
];

/** Single-token spellings → canonical token. */
const WORDS: Record<string, string> = {
  // units & quantities
  litre: 'litre', liter: 'litre', litar: 'litre', liters: 'litre', litres: 'litre', লিটার: 'litre', l: 'litre',
  coat: 'coat', coats: 'coat', kot: 'coat', কোট: 'coat',
  primer: 'primer', praimar: 'primer', প্রাইমার: 'primer',
  topcoat: 'topcoat', টপকোট: 'topcoat',
  koto: 'how_much', kotota: 'how_much', কত: 'how_much', how: 'how_much',
  // drying
  dry: 'dry', drying: 'dry', shukay: 'dry', shukabe: 'dry', shukate: 'dry', শুকায়: 'dry', শুকাবে: 'dry',
  // sales situations
  rag: 'angry', angry: 'angry', upset: 'angry', রাগ: 'angry', বিরক্ত: 'angry',
  collection: 'collection', kaleksan: 'collection', কালেকশন: 'collection', aday: 'collection', আদায়: 'collection',
  dues: 'dues', due: 'dues', bokeya: 'dues', বকেয়া: 'dues', baki: 'dues', বাকি: 'dues',
  bolbo: 'say', বলব: 'say', say: 'say', pitch: 'pitch',
  // surfaces
  deyal: 'wall', wall: 'wall', দেয়াল: 'wall', দেয়ালে: 'wall', দেয়ালের: 'wall',
};

/** Returns a lower-case, space-separated string of canonical tokens. */
export function normalizeQuery(raw: string): string {
  let s = toAsciiDigits(raw.normalize('NFC')).toLowerCase();
  for (const [re, rep] of PHRASES) s = s.replace(re, rep);
  // split numbers glued to words: "2900sqft" → "2900 sqft", "1kot" → "1 kot"
  s = s.replace(/(\d)([a-zঀ-৿])/g, '$1 $2');
  const tokens = s
    .split(/[^a-z0-9.ঀ-৿]+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ''))
    .filter(Boolean)
    .map((t) => WORDS[t] ?? t);
  return tokens.join(' ');
}

export interface ParsedEstimate {
  areaSqFt: number;
  primerCoats: number;
  topCoats: number;
}

/**
 * Pulls "area + coats" out of a free-text quantity question.
 * Returns null when no wall area is mentioned (then it is not a quantity question).
 */
export function parseEstimateRequest(raw: string): ParsedEstimate | null {
  const q = normalizeQuery(raw);
  const area = q.match(/(\d+(?:\.\d+)?)\s+sqft/);
  if (!area) return null;

  const primer = q.match(/(\d+)\s+coat\s+primer/) ?? q.match(/primer\s+(\d+)\s+coat/);
  const top =
    q.match(/(\d+)\s+coat\s+(?:of\s+)?(?:topcoat|weatherguard|softsheen|finish|emulsion|paint)/) ??
    q.match(/(?:topcoat|weatherguard|softsheen)\s+(\d+)\s+coat/);

  return {
    areaSqFt: Number(area[1]),
    primerCoats: primer ? Number(primer[1]) : q.includes('primer') ? 1 : 0,
    topCoats: top ? Number(top[1]) : 2,
  };
}
