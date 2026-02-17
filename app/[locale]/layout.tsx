import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AnalyticsManager } from '@/components/common/AnalyticsManager';
import { BusinessJsonLd } from '@/components/common/JsonLd';
import { ScrollRestorer } from '@/components/common/ScrollRestorer';

import Header from '@/components/layout/Header';
import HeaderSpacer from '@/components/layout/HeaderSpacer';
import Footer from '@/components/layout/Footer';
import GlobalContactDrawer from '@/components/layout/GlobalContactDrawer';
import { UIProvider } from '@/context/UIContext';

import { i18n, type Locale } from '@/i18n/config';
import { resolveLocale } from '@/i18n/loadMessages';
import { getLayoutData } from '@/services/layout-data';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type LayoutProps = { children: ReactNode; params: { locale: string } };

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const requested = params.locale;
  const matchedLocale = i18n.locales.find((supported) => supported.toLowerCase() === requested.toLowerCase()) as Locale | undefined;
  if (!matchedLocale) { notFound(); }

  const locale = resolveLocale(requested);
  unstable_setRequestLocale(locale);

  const { messages, navbar, footer } = await getLayoutData(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AnalyticsManager />
      <BusinessJsonLd locale={locale} />
      <UIProvider>
        <div className="flex min-h-screen flex-col">
          <ScrollRestorer />
          <Header data={navbar} />
          <HeaderSpacer />
          <main className="flex-1">{children}</main>
          <Footer data={footer} />
          <GlobalContactDrawer />
        </div>
      </UIProvider>
    </NextIntlClientProvider>
  );
}
