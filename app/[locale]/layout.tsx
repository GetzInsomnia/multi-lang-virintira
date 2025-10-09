import { notFound } from 'next/navigation';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AnalyticsManager } from '@/components/common/AnalyticsManager';
import { BusinessJsonLd } from '@/components/common/JsonLd';

// ใช้ Header/Spacer จาก src/components ไม่ใช่ app/[locale]/(components)
import Header from '@/components/layout/Header';
import HeaderSpacer from '@/components/layout/HeaderSpacer';

// ใช้ types ชุดเดียวกับ navbar จริง ๆ
import type {
  MegaMenuColumn,
  NavItem,
  NavbarData,
  SubMenuSection,
} from '@/components/navbar/types';

import Footer, { type FooterData, type FooterLink } from '@/components/layout/Footer';

import { i18n, type Locale } from '@/i18n/config';
import { loadMessages, resolveLocale, type Messages } from '@/i18n/loadMessages';

function ensureString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return fallback;
}

function sanitizeNavbarData(messages: Messages): NavbarData {
  const layout = ((messages ?? {}) as Record<string, unknown>).layout as Record<string, unknown> | undefined;
  const raw = (layout?.header ?? {}) as Record<string, unknown>;
  const nav = Array.isArray(raw.nav) ? raw.nav : [];
  const megaMenu = (raw.megaMenu ?? {}) as Record<string, unknown>;
  const columns = Array.isArray(megaMenu.columns) ? megaMenu.columns : [];

  const normalizeSubMenu = (sections: unknown): SubMenuSection[] | undefined => {
    if (!Array.isArray(sections)) return undefined;
    const normalizedSections: SubMenuSection[] = [];
    for (const section of sections) {
      const block = section as Record<string, unknown>;
      const items = Array.isArray(block.items) ? block.items : [];
      const normalizedItems = items
        .map((entry) => {
          const row = entry as Record<string, unknown>;
          const href = ensureString(row.href);
          if (!href) return undefined;
          return {
            label: ensureString(row.label),
            description: ensureString(row.description),
            href,
            icon: ensureString(row.icon),
          };
        })
        .filter((link): link is NonNullable<typeof link> => Boolean(link));
      if (!normalizedItems.length) continue;
      normalizedSections.push({ title: ensureString(block.title), items: normalizedItems });
    }
    return normalizedSections.length ? normalizedSections : undefined;
  };

  return {
    announcement: raw.announcement
      ? {
          message: ensureString((raw.announcement as Record<string, unknown>).message),
          actionLabel: ensureString((raw.announcement as Record<string, unknown>).actionLabel),
          actionHref: ensureString((raw.announcement as Record<string, unknown>).actionHref) || '/',
        }
      : undefined,
    nav: (nav as NavItem[]).map((item) => {
      const entry = item as Record<string, unknown>;
      const href = ensureString(entry.href);
      const subMenu = normalizeSubMenu(entry.subMenu);
      return {
        label: ensureString(entry.label),
        href: href || undefined,
        description: ensureString(entry.description),
        highlight: Boolean(entry.highlight),
        icon: ensureString(entry.icon),
        subMenu,
      };
    }),
    megaMenu: {
      triggerLabel: ensureString(megaMenu.triggerLabel),
      columns: (() => {
        const normalizedColumns: MegaMenuColumn[] = [];
        for (const column of columns as MegaMenuColumn[]) {
          const col = column as Record<string, unknown>;
          const items = Array.isArray(col.items) ? col.items : [];
          const normalizedItems = items
            .map((item) => {
              const row = item as Record<string, unknown>;
              const href = ensureString(row.href);
              if (!href) return undefined;
              return {
                label: ensureString(row.label),
                description: ensureString(row.description),
                href,
                icon: ensureString(row.icon),
              };
            })
            .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
          if (!normalizedItems.length) continue;
          normalizedColumns.push({
            title: ensureString(col.title),
            subtitle: ensureString(col.subtitle),
            items: normalizedItems,
          });
        }
        return normalizedColumns;
      })(),
    },
    ctaPrimary: ensureString(raw.ctaPrimary),
    ctaSecondary: ensureString(raw.ctaSecondary),
  };
}

function sanitizeFooterData(messages: Messages): FooterData {
  const layout = ((messages ?? {}) as Record<string, unknown>).layout as Record<string, unknown> | undefined;
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

type LayoutProps = { children: ReactNode; params: { locale: string } };

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const requested = params.locale;
  const matchedLocale = i18n.locales.find((supported) => supported.toLowerCase() === requested.toLowerCase()) as Locale | undefined;
  if (!matchedLocale) { notFound(); }

  const locale = resolveLocale(requested);
  unstable_setRequestLocale(locale);

  const messages = await loadMessages(locale);
  const navbar = sanitizeNavbarData(messages);
  const footer = sanitizeFooterData(messages);

  return (
    <NextIntlClientProvider locale={locale} messages={messages as unknown as AbstractIntlMessages}>
      <AnalyticsManager />
      <BusinessJsonLd locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Header data={navbar} />
        <HeaderSpacer />
        <main className="flex-1">{children}</main>
        <Footer data={footer} />
      </div>
    </NextIntlClientProvider>
  );
}
