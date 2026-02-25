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
  const htmlClassName = [font.className, fontVariableClassName].filter(Boolean).join(' ');

  return (
    <html lang={locale} dir="ltr" className={htmlClassName} suppressHydrationWarning>
      <body className="overflow-x-clip">{children}</body>
    </html>
  );
}
