/**
 * Demo knowledge base for the Sales Coach.
 *
 * In production the coach retrieves from the client's own product documents (data sheets,
 * price circulars, sales playbooks) that are indexed offline. Here a handful of short,
 * invented documents stand in for that index so the retrieval and citation flow can be
 * shown end to end. All products and figures below are fictional.
 */
import type { ProductSpec, SourceRef } from './types';

export interface KbPage {
  page: number;
  /** Canonical tokens (see banglish.ts) that this page is about. */
  keywords: string[];
  en: string;
  bn: string;
}

export interface KbDocument {
  id: string;
  title: string;
  /** Lower-case names that, when present in a question, point at this document. */
  aliases: string[];
  pages: KbPage[];
}

export const KB_DOCUMENTS: KbDocument[] = [
  {
    id: 'ds-weatherguard',
    title: 'WeatherGuard Exterior Emulsion — Data Sheet',
    aliases: ['weatherguard', 'ওয়েদারগার্ড'],
    pages: [
      {
        page: 1,
        keywords: ['exterior', 'rain', 'sun', 'weather', 'warranty'],
        en: 'WeatherGuard is a water-based exterior emulsion for plastered walls, made to resist rain and strong sun.',
        bn: 'ওয়েদারগার্ড বাইরের প্লাস্টার করা দেয়ালের জন্য পানিভিত্তিক এক্সটেরিয়র ইমালশন, বৃষ্টি ও কড়া রোদ সহ্য করতে তৈরি।',
      },
      {
        page: 2,
        keywords: ['dry', 'recoat', 'dilution', 'application', 'time'],
        en: 'Touch dry in about 30 minutes; apply the next coat after 4 hours. Dilute up to 10% with clean water.',
        bn: 'প্রায় ৩০ মিনিটে হাতে শুকায়; পরের কোট ৪ ঘণ্টা পর দিন। পরিষ্কার পানি দিয়ে সর্বোচ্চ ১০% পাতলা করা যায়।',
      },
      {
        page: 3,
        keywords: ['coverage', 'litre', 'sqft', 'pack'],
        en: 'Coverage: about 120 sq ft per litre per coat on a primed surface. Packs: 20 L, 4 L, 1 L.',
        bn: 'কভারেজ: প্রাইমার দেওয়া দেয়ালে প্রতি কোটে লিটারপ্রতি প্রায় ১২০ বর্গফুট। প্যাক: ২০ লি, ৪ লি, ১ লি।',
      },
    ],
  },
  {
    id: 'ds-sealpro',
    title: 'SealPro Exterior Primer — Data Sheet',
    aliases: ['sealpro', 'সিলপ্রো'],
    pages: [
      {
        page: 1,
        keywords: ['primer', 'alkali', 'plaster', 'new'],
        en: 'SealPro is an alkali-resistant primer for new and repainted exterior plaster.',
        bn: 'সিলপ্রো নতুন ও পুরনো বাইরের প্লাস্টারের জন্য ক্ষার-প্রতিরোধী প্রাইমার।',
      },
      {
        page: 2,
        keywords: ['cure', 'plaster', 'preparation', 'surface', 'days'],
        en: 'Let new plaster cure for at least 28 days. Remove dust and loose particles before priming.',
        bn: 'নতুন প্লাস্টার কমপক্ষে ২৮ দিন শুকাতে দিন। প্রাইমার দেওয়ার আগে ধুলা ও আলগা কণা পরিষ্কার করুন।',
      },
      {
        page: 3,
        keywords: ['coverage', 'litre', 'sqft', 'pack'],
        en: 'Coverage: about 110 sq ft per litre per coat. Packs: 20 L, 4 L, 1 L.',
        bn: 'কভারেজ: প্রতি কোটে লিটারপ্রতি প্রায় ১১০ বর্গফুট। প্যাক: ২০ লি, ৪ লি, ১ লি।',
      },
    ],
  },
  {
    id: 'ds-softsheen',
    title: 'SoftSheen Interior Emulsion — Data Sheet',
    aliases: ['softsheen', 'সফটশিন'],
    pages: [
      {
        page: 1,
        keywords: ['interior', 'washable', 'sheen', 'room'],
        en: 'SoftSheen is a washable interior emulsion with a soft sheen finish for living rooms and bedrooms.',
        bn: 'সফটশিন ঘরের ভেতরের দেয়ালের জন্য ধোয়া যায় এমন ইমালশন, হালকা চকচকে ফিনিশ।',
      },
      {
        page: 2,
        keywords: ['coverage', 'litre', 'sqft', 'pack'],
        en: 'Coverage: about 130 sq ft per litre per coat. Packs: 4 L and 1 L.',
        bn: 'কভারেজ: প্রতি কোটে লিটারপ্রতি প্রায় ১৩০ বর্গফুট। প্যাক: ৪ লি ও ১ লি।',
      },
    ],
  },
  {
    id: 'pb-field-sales',
    title: 'Field Sales Playbook (demo)',
    aliases: ['playbook'],
    pages: [
      {
        page: 4,
        keywords: ['collection', 'dues', 'payment', 'promise'],
        en: 'Link collection to the next order: agree a promise-to-pay date before closing the visit, and log it.',
        bn: 'কালেকশনকে পরের অর্ডারের সাথে যুক্ত করুন: ভিজিট শেষের আগে পেমেন্টের প্রতিশ্রুত তারিখ ঠিক করে লিখে রাখুন।',
      },
      {
        page: 7,
        keywords: ['angry', 'complaint', 'calm', 'relationship'],
        en: 'If a dealer is upset, listen first and note every complaint. Offer a follow-up time; do not push for payment in the same breath.',
        bn: 'ডিলার বিরক্ত হলে আগে মন দিয়ে শুনুন, প্রতিটি অভিযোগ নোট করুন। ফলো-আপের সময় দিন; একই সাথে পেমেন্টের চাপ দেবেন না।',
      },
      {
        page: 9,
        keywords: ['pitch', 'new', 'product', 'offer', 'say'],
        en: 'Open with the dealer’s own sales trend, then show one product that fits their customers. Keep it to one clear offer.',
        bn: 'ডিলারের নিজের বিক্রির ট্রেন্ড দিয়ে শুরু করুন, তারপর তাদের ক্রেতাদের উপযোগী একটি পণ্য দেখান। একটাই পরিষ্কার অফার দিন।',
      },
    ],
  },
];

const ref = (docId: string, page: number): SourceRef => {
  const doc = KB_DOCUMENTS.find((d) => d.id === docId);
  if (!doc) throw new Error(`unknown document ${docId}`);
  return { docId, title: doc.title, page };
};

/** Demo product catalogue used by the paint calculator. */
export const PRODUCTS = {
  sealpro: {
    id: 'sealpro',
    name: 'SealPro Exterior Primer',
    kind: 'primer',
    coverageSqFtPerLitre: 110,
    packSizesLitre: [20, 4, 1],
    coverageSource: ref('ds-sealpro', 3),
  },
  weatherguard: {
    id: 'weatherguard',
    name: 'WeatherGuard Exterior Emulsion',
    kind: 'exterior',
    coverageSqFtPerLitre: 120,
    packSizesLitre: [20, 4, 1],
    coverageSource: ref('ds-weatherguard', 3),
  },
  softsheen: {
    id: 'softsheen',
    name: 'SoftSheen Interior Emulsion',
    kind: 'interior',
    coverageSqFtPerLitre: 130,
    packSizesLitre: [4, 1],
    coverageSource: ref('ds-softsheen', 2),
  },
} satisfies Record<string, ProductSpec>;
