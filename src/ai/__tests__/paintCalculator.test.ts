import { describe, expect, it } from 'vitest';
import { estimatePaint, litresNeeded, splitIntoPacks } from '../paintCalculator';
import { PRODUCTS } from '../knowledgeBase';

describe('litresNeeded', () => {
  it('divides area × coats by coverage and rounds up to 2 decimals', () => {
    expect(litresNeeded(2900, 1, 110)).toBe(26.37);
    expect(litresNeeded(2900, 2, 120)).toBe(48.34);
  });

  it('returns 0 for empty input', () => {
    expect(litresNeeded(0, 2, 120)).toBe(0);
    expect(litresNeeded(1000, 0, 120)).toBe(0);
  });

  it('rejects impossible coverage', () => {
    expect(() => litresNeeded(1000, 1, 0)).toThrow();
  });
});

describe('splitIntoPacks', () => {
  it('picks the combination with the least total paint, then the fewest packs', () => {
    const split = splitIntoPacks(26.37, [20, 4, 1]);
    expect(split.totalLitres).toBe(27);
    expect(split.packs).toEqual([
      { sizeLitre: 20, count: 1 },
      { sizeLitre: 4, count: 1 },
      { sizeLitre: 1, count: 3 },
    ]);
    expect(split.spareLitres).toBe(0.63);
  });

  it('prefers one big pack over many small ones when the total is equal', () => {
    const split = splitIntoPacks(20, [20, 4, 1]);
    expect(split.packs).toEqual([{ sizeLitre: 20, count: 1 }]);
  });
});

describe('estimatePaint', () => {
  it('builds a primer + top-coat estimate for a wall', () => {
    const est = estimatePaint({
      areaSqFt: 2900,
      primerCoats: 1,
      topCoats: 2,
      primer: PRODUCTS.sealpro,
      topcoat: PRODUCTS.weatherguard,
    });
    expect(est.lines).toHaveLength(2);
    expect(est.lines[0].productId).toBe('sealpro');
    expect(est.lines[0].litres).toBe(26.37);
    expect(est.lines[1].productId).toBe('weatherguard');
    expect(est.lines[1].litres).toBe(48.34);
    expect(est.lines[1].split.totalLitres).toBeGreaterThanOrEqual(48.34);
  });

  it('skips the primer line when no primer coat is asked for', () => {
    const est = estimatePaint({
      areaSqFt: 500,
      primerCoats: 0,
      topCoats: 2,
      primer: PRODUCTS.sealpro,
      topcoat: PRODUCTS.weatherguard,
    });
    expect(est.lines.map((l) => l.productId)).toEqual(['weatherguard']);
  });
});
