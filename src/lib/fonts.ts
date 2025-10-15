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
  variable: '--font-en',
});

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-th',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-zh-hans',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-zh-hant',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ja',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ko',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-hi',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['latin', 'tamil'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ta',
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-he',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ar',
});

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-fa',
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

export const fontVariableClassName = Object.values(fonts)
  .map((font) => font.variable)
  .filter(Boolean)
  .join(' ');
