import type { Metadata } from 'next';
import './globals.css';
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { absoluteUrl } from '@/config/site';

// Fonts (per-language) via next/font/google
import {
  Inter,
  Prompt,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Cairo,
  Heebo,
  Hind,
  Noto_Sans_Tamil,
  Vazirmatn,
} from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-latin' });
const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-th',
});
const notoJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-ja' });
const notoKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-ko' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-zh-hans' });
const notoTC = Noto_Sans_TC({ subsets: ['latin'], variable: '--font-zh-hant' });
const cairo = Cairo({ subsets: ['latin'], variable: '--font-ar' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-he' });
const hind = Hind({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hi',
});
const notoTA = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-ta' });
const vazir = Vazirmatn({ subsets: ['latin'], variable: '--font-fa' });

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale().catch(() => 'en');
  const dir = ['ar', 'fa', 'he'].includes(locale) ? 'rtl' : 'ltr';
  const fontVars = [
    inter.variable,
    prompt.variable,
    notoJP.variable,
    notoKR.variable,
    notoSC.variable,
    notoTC.variable,
    cairo.variable,
    heebo.variable,
    hind.variable,
    notoTA.variable,
    vazir.variable,
  ].join(' ');

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={fontVars}>{children}</body>
    </html>
  );
}
