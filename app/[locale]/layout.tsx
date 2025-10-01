import { notFound } from 'next/navigation';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { ReactNode } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import {
  Inter,
  Noto_Naskh_Arabic,
  Noto_Sans_Devanagari,
  Noto_Sans_Hebrew,
  Noto_Sans_JP,
  Noto_Sans_KR,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Tamil,
  Prompt,
  Vazirmatn,
} from 'next/font/google';
import { i18n, type Locale } from '@/i18n/config';
import { loadMessages, resolveLocale, type Messages } from '@/i18n/loadMessages';
import {
  Header,
  type HeaderData,
  type HeaderMegaMenuColumn,
  type HeaderNavItem,
} from '@/components/layout/Header';
import { Footer, type FooterData, type FooterLink } from '@/components/layout/Footer';
import { BusinessJsonLd } from '@/components/seo/BusinessJsonLd';
import { AnalyticsManager } from '@/components/common/AnalyticsManager';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const prompt = Prompt({
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
});
const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
});
const notoKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-kr',
});
const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sc',
});
const notoTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-tc',
});
const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-noto-naskh',
});
const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazirmatn',
});
const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew', 'latin'],
  variable: '--font-noto-he',
});
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  variable: '--font-noto-devanagari',
});
const notoTA = Noto_Sans_Tamil({
  subsets: ['tamil', 'latin'],
  variable: '--font-noto-tamil',
});

const fontClassNames = [
  inter.variable,
  prompt.variable,
  notoJP.variable,
  notoKR.variable,
  notoSC.variable,
  notoTC.variable,
  notoArabic.variable,
  vazir.variable,
  notoHebrew.variable,
  notoDevanagari.variable,
  notoTA.variable,
].join(' ');

const RTL_LOCALES = new Set<Locale>(['ar', 'fa', 'he']);

function ensureString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return fallback;
}

function sanitizeHeaderData(messages: Messages): HeaderData {
  const raw = (messages.layout?.header ?? {}) as Record<string, unknown>;
  const nav = Array.isArray(raw.nav) ? raw.nav : [];
  const megaMenu = (raw.megaMenu ?? {}) as Record<string, unknown>;
  const columns = Array.isArray(megaMenu.columns) ? megaMenu.columns : [];

  return {
    announcement: {
      message: ensureString(
        (raw.announcement as Record<string, unknown> | undefined)?.message,
      ),
      actionLabel: ensureString(
        (raw.announcement as Record<string, unknown> | undefined)?.actionLabel,
      ),
      actionHref:
        ensureString(
          (raw.announcement as Record<string, unknown> | undefined)?.actionHref,
        ) || '/',
    },
    nav: (nav as HeaderNavItem[]).map((item) => ({
      label: ensureString(item?.label),
      href: ensureString(item?.href, '#') || '#',
    })),
    megaMenu: {
      triggerLabel: ensureString(megaMenu.triggerLabel),
      columns: (columns as HeaderMegaMenuColumn[]).map((column) => ({
        title: ensureString(column?.title),
        items: Array.isArray(column?.items)
          ? column.items.map((item) => ({
              label: ensureString(item?.label),
              description: ensureString(item?.description),
              href: ensureString(item?.href, '#') || '#',
            }))
          : [],
      })),
    },
    ctaPrimary: ensureString(raw.ctaPrimary),
    ctaSecondary: ensureString(raw.ctaSecondary),
  };
}

function sanitizeFooterData(messages: Messages): FooterData {
  const raw = (messages.layout?.footer ?? {}) as Record<string, unknown>;
  const contact = (raw.contact ?? {}) as Record<string, unknown>;
  const quickLinks = Array.isArray(raw.quickLinks) ? raw.quickLinks : [];

  return {
    tagline: ensureString(raw.tagline),
    description: ensureString(raw.description),
    contact: {
      phone: ensureString(contact.phone),
      email: ensureString(contact.email),
      line: ensureString(contact.line),
    },
    quickLinks: (quickLinks as FooterLink[]).map((link) => ({
      label: ensureString(link?.label),
      href: ensureString(link?.href, '#') || '#',
    })),
    legal: ensureString(raw.legal),
  };
}

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
  const header = sanitizeHeaderData(messages);
  const footer = sanitizeFooterData(messages);
  const direction = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      className={fontClassNames}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#FFFEFE] text-gray-900 antialiased">
        <NextIntlClientProvider
          locale={locale}
          messages={messages as unknown as AbstractIntlMessages}
        >
          <AnalyticsManager />
          <BusinessJsonLd locale={locale} />
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
