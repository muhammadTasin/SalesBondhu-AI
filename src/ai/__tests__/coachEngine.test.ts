import { describe, expect, it } from 'vitest';
import { askCoach } from '../coachEngine';
import { normalizeQuery, parseEstimateRequest } from '../banglish';

describe('normalizeQuery (Banglish / Bangla → canonical tokens)', () => {
  it('converts Bangla digits and unit spellings', () => {
    const q = normalizeQuery('২৯০০ স্কয়ার ফিট দেয়াল');
    expect(q).toContain('2900');
    expect(q).toContain('sqft');
  });

  it('understands Banglish spellings', () => {
    const q = normalizeQuery('2900 square feet e 1 kot primer koto litar lagbe');
    expect(q).toContain('sqft');
    expect(q).toContain('coat');
    expect(q).toContain('litre');
  });
});

describe('parseEstimateRequest', () => {
  it('reads area, primer coats and top coats from a Banglish question', () => {
    const req = parseEstimateRequest('2900 sqft deyal, 1 kot primer r 2 kot weatherguard, koto liter lagbe?');
    expect(req).toEqual({ areaSqFt: 2900, primerCoats: 1, topCoats: 2 });
  });

  it('reads a Bangla question', () => {
    const req = parseEstimateRequest('২৯০০ স্কয়ার ফিট দেয়ালে ১ কোট প্রাইমার এবং ২ কোট টপকোট দিলে কত লিটার লাগবে?');
    expect(req).toEqual({ areaSqFt: 2900, primerCoats: 1, topCoats: 2 });
  });

  it('returns null when there is no area', () => {
    expect(parseEstimateRequest('dealer ke ki bolbo?')).toBeNull();
  });
});

describe('askCoach', () => {
  it('answers a quantity question with the calculator and cites the product sheets', () => {
    const ans = askCoach('2900 sqft, 1 coat primer + 2 coat top coat, koto litre?', 'BN');
    expect(ans.intent).toBe('paint_estimate');
    expect(ans.estimate?.lines).toHaveLength(2);
    expect(ans.sources.length).toBeGreaterThan(0);
    expect(ans.sources.every((s) => s.page > 0)).toBe(true);
    expect(ans.text).toMatch(/২৬\.৩৭|26\.37/);
  });

  it('answers a product question from the knowledge base with a page citation', () => {
    const ans = askCoach('WeatherGuard kototokkhon e shukay? drying time', 'EN');
    expect(ans.intent).toBe('product_knowledge');
    expect(ans.sources[0].title).toMatch(/WeatherGuard/);
    expect(ans.sources[0].page).toBe(2);
  });

  it('falls back to coaching advice when nothing matches', () => {
    const ans = askCoach('dealer onek rag korse', 'BN');
    expect(ans.intent).toBe('sales_coaching');
    expect(ans.text.length).toBeGreaterThan(10);
  });
});
