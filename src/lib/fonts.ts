import {
  Inter,
  Prompt,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Devanagari,
  Noto_Sans_Tamil,
  Noto_Sans_Hebrew,
  Noto_Naskh_Arabic,
  Vazirmatn,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const fonts = {
  th: prompt,
  en: inter,
  fr: inter,
  de: inter,
  nl: inter,
  it: inter,
  ms: inter,
  'zh-Hans': notoSansSC,
  'zh-Hant': notoSansTC,
  ja: notoSansJP,
  ko: notoSansKR,
  hi: notoSansDevanagari,
  ta: notoSansTamil,
  ar: notoNaskhArabic,
  fa: vazirmatn,
  he: notoSansHebrew,
} as const;

export type SupportedLocale = keyof typeof fonts;
