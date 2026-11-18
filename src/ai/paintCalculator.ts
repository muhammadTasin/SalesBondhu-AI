/**
 * Rule-based paint quantity calculator.
 *
 * Quantities are never left to the language model: the coach computes them here, from the
 * product's documented coverage, and the model only phrases the result. That keeps numbers
 * exact and traceable to a data-sheet page.
 */
import type { EstimateLine, PackSplit, PaintEstimate, ProductSpec } from './types';

const round2 = (x: number) => Math.round(x * 100) / 100;
/** Round up to 2 decimals, tolerant of floating-point noise (e.g. 20.000000001). */
const ceil2 = (x: number) => Math.ceil(x * 100 - 1e-6) / 100;

/** Litres needed to paint `areaSqFt` with `coats` coats at the given coverage. */
export function litresNeeded(areaSqFt: number, coats: number, coverageSqFtPerLitre: number): number {
  if (coverageSqFtPerLitre <= 0) throw new Error('coverage must be positive');
  if (areaSqFt <= 0 || coats <= 0) return 0;
  return ceil2((areaSqFt * coats) / coverageSqFtPerLitre);
}

/**
 * Cover `litres` with whole packs. Picks the combination with the least total paint,
 * and among those the fewest packs. Pack lists are short (2–4 sizes), so a bounded
 * enumeration is simpler and clearer than a general knapsack.
 */
export function splitIntoPacks(litres: number, packSizesLitre: number[]): PackSplit {
  const sizes = [...packSizesLitre].sort((a, b) => b - a);
  if (sizes.length === 0) throw new Error('no pack sizes');
  if (litres <= 0) return { packs: [], totalLitres: 0, spareLitres: 0 };

  let best: { counts: number[]; total: number; packs: number } | null = null;

  const search = (i: number, remaining: number, counts: number[]) => {
    const size = sizes[i];
    if (i === sizes.length - 1) {
      const n = Math.max(0, Math.ceil(remaining / size - 1e-9));
      const all = [...counts, n];
      const total = all.reduce((s, c, k) => s + c * sizes[k], 0);
      const packs = all.reduce((s, c) => s + c, 0);
      if (!best || total < best.total - 1e-9 || (Math.abs(total - best.total) < 1e-9 && packs < best.packs)) {
        best = { counts: all, total, packs };
      }
      return;
    }
    const max = Math.ceil(remaining / size - 1e-9);
    for (let n = max; n >= 0; n--) {
      search(i + 1, Math.max(0, remaining - n * size), [...counts, n]);
    }
  };
  search(0, litres, []);

  const chosen = best as unknown as { counts: number[]; total: number };
  return {
    packs: chosen.counts
      .map((count, k) => ({ sizeLitre: sizes[k], count }))
      .filter((p) => p.count > 0),
    totalLitres: round2(chosen.total),
    spareLitres: round2(chosen.total - litres),
  };
}

export interface EstimateRequest {
  areaSqFt: number;
  primerCoats: number;
  topCoats: number;
  primer: ProductSpec;
  topcoat: ProductSpec;
}

function line(product: ProductSpec, areaSqFt: number, coats: number): EstimateLine {
  const litres = litresNeeded(areaSqFt, coats, product.coverageSqFtPerLitre);
  return {
    productId: product.id,
    productName: product.name,
    coats,
    litres,
    split: splitIntoPacks(litres, product.packSizesLitre),
    source: product.coverageSource,
  };
}

export function estimatePaint(req: EstimateRequest): PaintEstimate {
  const lines: EstimateLine[] = [];
  if (req.primerCoats > 0) lines.push(line(req.primer, req.areaSqFt, req.primerCoats));
  if (req.topCoats > 0) lines.push(line(req.topcoat, req.areaSqFt, req.topCoats));
  return { areaSqFt: req.areaSqFt, lines };
}
