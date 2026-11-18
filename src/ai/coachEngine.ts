/**
 * Sales Coach engine (showcase edition).
 *
 * Flow for every question:
 *   1. normalise Bangla / Banglish / English (banglish.ts)
 *   2. route by intent: quantity question → calculator; sales situation → playbook;
 *      anything else → product knowledge retrieval
 *   3. answer only from what was computed or retrieved, and attach the source pages
 *
 * In production, step 3 hands the retrieved passages to a language model to phrase a
 * natural Bangla answer, and the answer is checked against the passages before it is
 * shown. This demo build replaces the model with templates so it runs fully offline.
 */
import { normalizeQuery, parseEstimateRequest, toBanglaDigits } from './banglish';
import { KB_DOCUMENTS, PRODUCTS, type KbDocument, type KbPage } from './knowledgeBase';
import { estimatePaint } from './paintCalculator';
import type { CoachAnswer, Lang, PaintEstimate, ProductSpec, SourceRef } from './types';

const COACHING_TOKENS = ['angry', 'collection', 'dues', 'say', 'pitch'];
const MIN_RETRIEVAL_SCORE = 3;

interface Hit {
  doc: KbDocument;
  page: KbPage;
  score: number;
}

/** Keyword retrieval with a boost for documents named in the question. */
export function retrieve(normalized: string, docs: KbDocument[] = KB_DOCUMENTS): Hit[] {
  const tokens = new Set(normalized.split(' '));
  const hits: Hit[] = [];
  for (const doc of docs) {
    const named = doc.aliases.some((a) => normalized.includes(a));
    for (const page of doc.pages) {
      const keywordHits = page.keywords.filter((k) => tokens.has(k)).length;
      if (keywordHits === 0) continue;
      hits.push({ doc, page, score: keywordHits * 2 + (named ? 3 : 0) });
    }
  }
  return hits.sort((a, b) => b.score - a.score);
}

const fmt = (n: number, lang: Lang) => {
  const s = n.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return lang === 'BN' ? toBanglaDigits(s) : s;
};

function pickTopcoat(normalized: string): ProductSpec {
  if (normalized.includes('softsheen') || normalized.includes('interior')) return PRODUCTS.softsheen;
  return PRODUCTS.weatherguard;
}

function estimateText(est: PaintEstimate, lang: Lang): string {
  const parts = est.lines.map((l) => {
    const packs = l.split.packs
      .map((p) => (lang === 'BN' ? `${fmt(p.sizeLitre, lang)} লি × ${fmt(p.count, lang)}` : `${p.count} × ${p.sizeLitre} L`))
      .join(' + ');
    return lang === 'BN'
      ? `${l.productName}, ${fmt(l.coats, lang)} কোট: ${fmt(l.litres, lang)} লিটার লাগবে। কিনুন ${packs} (মোট ${fmt(l.split.totalLitres, lang)} লি)।`
      : `${l.productName}, ${l.coats} coat(s): ${fmt(l.litres, lang)} L needed. Buy ${packs} (${fmt(l.split.totalLitres, lang)} L in total).`;
  });
  const head =
    lang === 'BN'
      ? `${fmt(est.areaSqFt, lang)} বর্গফুট দেয়ালের হিসাব:`
      : `Estimate for ${fmt(est.areaSqFt, lang)} sq ft of wall:`;
  return [head, ...parts].join('\n');
}

const cite = (doc: KbDocument, page: KbPage): SourceRef => ({ docId: doc.id, title: doc.title, page: page.page });

export function askCoach(question: string, lang: Lang): CoachAnswer {
  const normalized = normalizeQuery(question);

  // 1. Quantity questions go to the calculator, never to free text generation.
  const parsed = parseEstimateRequest(question);
  if (parsed) {
    const estimate = estimatePaint({ ...parsed, primer: PRODUCTS.sealpro, topcoat: pickTopcoat(normalized) });
    return {
      intent: 'paint_estimate',
      text: estimateText(estimate, lang),
      sources: estimate.lines.map((l) => l.source),
      estimate,
    };
  }

  // 2. Sales situations are answered from the playbook.
  const tokens = normalized.split(' ');
  if (tokens.some((t) => COACHING_TOKENS.includes(t))) {
    const playbook = KB_DOCUMENTS.filter((d) => d.id.startsWith('pb-'));
    const [top] = retrieve(normalized, playbook);
    if (top) {
      return { intent: 'sales_coaching', text: lang === 'BN' ? top.page.bn : top.page.en, sources: [cite(top.doc, top.page)] };
    }
  }

  // 3. Product knowledge: answer only when retrieval is confident enough.
  const [best] = retrieve(normalized);
  if (best && best.score >= MIN_RETRIEVAL_SCORE) {
    return {
      intent: 'product_knowledge',
      text: lang === 'BN' ? best.page.bn : best.page.en,
      sources: [cite(best.doc, best.page)],
    };
  }

  // 4. Nothing grounded: say so, and fall back to general coaching.
  return {
    intent: 'sales_coaching',
    text:
      lang === 'BN'
        ? 'এই প্রশ্নের উত্তর কোম্পানির ডকুমেন্টে পাইনি। ডিলারের বকেয়া, অর্ডার বা পণ্যের নাম দিয়ে আবার জিজ্ঞেস করুন।'
        : "I couldn't find this in the company documents. Try asking with the dealer's dues, an order, or a product name.",
    sources: [],
  };
}
