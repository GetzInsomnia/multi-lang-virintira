import { notFound } from 'next/navigation';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AnalyticsManager } from '@/components/common/AnalyticsManager';
import { BusinessJsonLd } from '@/components/common/JsonLd';
import Footer, { type FooterData, type FooterLink } from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';
import type { MegaMenuColumn, NavItem, NavbarData } from '@/components/navbar/types';
import { i18n, type Locale } from '@/i18n/config';
import { loadMessages, resolveLocale, type Messages } from '@/i18n/loadMessages';

function ensureString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return fallback;
}

function sanitizeNavbarData(messages: Messages): NavbarData {
  const layout = ((messages ?? {}) as Record<string, unknown>).layout as
    | Record<string, unknown>
    | undefined;
  const raw = (layout?.header ?? {}) as Record<string, unknown>;
  const nav = Array.isArray(raw.nav) ? raw.nav : [];
  const megaMenu = (raw.megaMenu ?? {}) as Record<string, unknown>;
  const columns = Array.isArray(megaMenu.columns) ? megaMenu.columns : [];

  return {
    announcement: raw.announcement
      ? {
          message: ensureString((raw.announcement as Record<string, unknown>).message),
          actionLabel: ensureString((raw.announcement as Record<string, unknown>).actionLabel),
          actionHref: ensureString((raw.announcement as Record<string, unknown>).actionHref) || '/',
        }
      : undefined,
    nav: (nav as NavItem[]).map((item) => ({
      label: ensureString(item?.label),
      href: ensureString(item?.href, '#') || '#',
    })),
    megaMenu: {
      triggerLabel: ensureString(megaMenu.triggerLabel),
      columns: (columns as MegaMenuColumn[]).map((column) => ({
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
  const layout = ((messages ?? {}) as Record<string, unknown>).layout as
    | Record<string, unknown>
    | undefined;
  const raw = (layout?.footer ?? {}) as Record<string, unknown>;
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
  const navbar = sanitizeNavbarData(messages);
  const footer = sanitizeFooterData(messages);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages as unknown as AbstractIntlMessages}
    >
      <AnalyticsManager />
      <BusinessJsonLd locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Navbar data={navbar} />
        <main className="flex-1">{children}</main>
        <Footer data={footer} />
      </div>
    </NextIntlClientProvider>
  );
}
