import type { Metadata } from 'next';
import './globals.css';
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { absoluteUrl } from '@/config/site';
import { fonts, fontVariableClassName, type SupportedLocale } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const requestedLocale = await getLocale().catch(() => 'en');
  const locale = (requestedLocale in fonts ? requestedLocale : 'en') as SupportedLocale;
  const font = fonts[locale] ?? fonts.en;
  const dir = ['ar', 'fa', 'he'].includes(locale) ? 'rtl' : 'ltr';

  const htmlClassName = [font.className, fontVariableClassName].filter(Boolean).join(' ');

  return (
    <html lang={locale} dir={dir} className={htmlClassName} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
