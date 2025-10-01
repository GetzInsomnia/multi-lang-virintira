import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import {
  Cairo,
  Heebo,
  Hind,
  Inter,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Tamil,
  Prompt,
  Vazirmatn,
} from 'next/font/google';
import { i18n, type Locale } from '@/i18n/config';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { Header, type HeaderData } from '@/components/layout/Header';
import { Footer, type FooterData } from '@/components/layout/Footer';
import { BusinessJsonLd } from '@/components/seo/BusinessJsonLd';
import { AnalyticsManager } from '@/components/common/AnalyticsManager';

const inter = Inter({ subsets: ['latin'], variable: '--font-latin' });
const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-th',
});
const notoJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-ja' });
const notoKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-ko' });
const notoSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-zhhans' });
const notoTC = Noto_Sans_TC({ subsets: ['latin'], variable: '--font-zhhant' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-ar' });
const vazir = Vazirmatn({ subsets: ['arabic'], variable: '--font-fa' });
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-he' });
const hind = Hind({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hi',
});
const notoTA = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-ta' });

const fontClassNames = [
  inter.variable,
  prompt.variable,
  notoJP.variable,
  notoKR.variable,
  notoSC.variable,
  notoTC.variable,
  cairo.variable,
  vazir.variable,
  heebo.variable,
  hind.variable,
  notoTA.variable,
].join(' ');

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const requested = params.locale;
  const matchedLocale = i18n.locales.find(
    (supported) => supported.toLowerCase() === requested.toLowerCase(),
  ) as Locale | undefined;
  if (!matchedLocale) {
    notFound();
  }

  const locale = resolveLocale(requested);

  unstable_setRequestLocale(locale);

  const messages = await loadMessages(locale);
  const header = (messages.layout?.header ?? {
    announcement: { message: '', actionLabel: '', actionHref: '/' },
    nav: [],
    megaMenu: { triggerLabel: '', columns: [] },
    ctaPrimary: '',
    ctaSecondary: '',
  }) as HeaderData;
  const footer = (messages.layout?.footer ?? {
    tagline: '',
    description: '',
    contact: { phone: '', email: '', line: '' },
    quickLinks: [],
    legal: '',
  }) as FooterData;

  return (
    <html lang={locale} className={fontClassNames} suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFEFE] text-gray-900 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AnalyticsManager />
          <BusinessJsonLd />
          <div className="flex min-h-screen flex-col">
            <Header data={header} locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer data={footer} locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
