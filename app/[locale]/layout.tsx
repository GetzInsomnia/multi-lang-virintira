import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { i18n, type Locale } from '@/i18n/config';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { Header, type HeaderData } from '@/components/layout/Header';
import { Footer, type FooterData } from '@/components/layout/Footer';
import { BusinessJsonLd } from '@/components/seo/BusinessJsonLd';
import { AnalyticsManager } from '@/components/common/AnalyticsManager';

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AnalyticsManager />
      <BusinessJsonLd />
      <div className="flex min-h-screen flex-col">
        <Header data={header} locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer data={footer} locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
