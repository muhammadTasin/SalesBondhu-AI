export type Lang = 'BN' | 'EN';

export type CoachIntent = 'paint_estimate' | 'product_knowledge' | 'sales_coaching';

/** A citation shown under every grounded answer ("Source: <title>, page N"). */
export interface SourceRef {
  docId: string;
  title: string;
  page: number;
}

export interface ProductSpec {
  id: string;
  name: string;
  kind: 'primer' | 'exterior' | 'interior';
  /** Square feet covered by one litre for one coat (demo values). */
  coverageSqFtPerLitre: number;
  packSizesLitre: number[];
  /** Product data sheet that documents the coverage figure. */
  coverageSource: SourceRef;
}

export interface PackSplit {
  packs: { sizeLitre: number; count: number }[];
  totalLitres: number;
  spareLitres: number;
}

export interface EstimateLine {
  productId: string;
  productName: string;
  coats: number;
  litres: number;
  split: PackSplit;
  source: SourceRef;
}

export interface PaintEstimate {
  areaSqFt: number;
  lines: EstimateLine[];
}

export interface CoachAnswer {
  intent: CoachIntent;
  text: string;
  sources: SourceRef[];
  estimate?: PaintEstimate;
}
