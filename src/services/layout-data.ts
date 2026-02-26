import { type AbstractIntlMessages } from 'next-intl';
import { loadMessages, type Messages } from '@/i18n/loadMessages';
import { servicesConfig } from '@/config/services';
import { MAIN_NAV, FOOTER_QUICK_LINKS } from '@/config/navigation';
import { ensureString } from '@/lib/data-sanitizers';
import type {
    MegaMenuColumn,
    NavItem,
    NavbarData,
    SubMenuSection,
} from '@/components/navbar/types';
import type { FooterData, FooterLink } from '@/components/layout/Footer';

function normalizeSubMenu(sections: unknown): SubMenuSection[] | undefined {
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
}

function sanitizeNavbarData(messages: Messages): NavbarData {
    const layout = ((messages ?? {}) as Record<string, unknown>).layout as Record<string, unknown> | undefined;
    const raw = (layout?.header ?? {}) as Record<string, unknown>;
    const navData = (raw.nav ?? {}) as Record<string, { label?: string }>;
    const megaMenu = (raw.megaMenu ?? {}) as Record<string, unknown>;

    return {
        announcement: raw.announcement
            ? {
                message: ensureString((raw.announcement as Record<string, unknown>).message),
                actionLabel: ensureString((raw.announcement as Record<string, unknown>).actionLabel),
                actionHref: ensureString((raw.announcement as Record<string, unknown>).actionHref) || '/',
            }
            : undefined,
        nav: MAIN_NAV.map((item) => ({
            label: ensureString(navData[item.id]?.label) || item.id,
            href: item.href,
            highlight: Boolean((item as any).highlight),
            icon: ensureString((item as any).icon),
        })),
        megaMenu: {
            triggerLabel: ensureString(megaMenu.triggerLabel),
            columns: (() => {
                const servicesData = (messages.services ?? {}) as Record<string, unknown>;
                const catDict = (servicesData.categories ?? {}) as Record<string, { title?: string }>;
                const itemDict = (servicesData.items ?? {}) as Record<string, { title?: string }>;

                return servicesConfig.categories.slice(0, 5).map(cat => {
                    return {
                        title: ensureString(catDict[cat.categorySlug]?.title) || cat.categorySlug,
                        items: cat.items.map(itm => ({
                            label: ensureString(itemDict[itm.serviceSlug]?.title) || itm.serviceSlug,
                            href: `/services/${cat.categorySlug}/${itm.serviceSlug}`
                        }))
                    };
                });
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
    const quickLinks = (raw.quickLinks ?? {}) as Record<string, { label?: string }>;

    return {
        tagline: ensureString(raw.tagline),
        description: ensureString(raw.description),
        contact: {
            phone: ensureString(contact.phone),
            email: ensureString(contact.email),
            line: ensureString(contact.line),
        },
        quickLinks: FOOTER_QUICK_LINKS.map((link) => ({
            label: ensureString(quickLinks[link.id]?.label) || link.id,
            href: link.href,
        })),
        legal: ensureString(raw.legal),
    };
}

export type LayoutData = {
    messages: AbstractIntlMessages;
    navbar: NavbarData;
    footer: FooterData;
};

export async function getLayoutData(locale: string): Promise<LayoutData> {
    const messages = await loadMessages(locale);
    const navbar = sanitizeNavbarData(messages);
    const footer = sanitizeFooterData(messages);

    return {
        messages: messages as unknown as AbstractIntlMessages,
        navbar,
        footer,
    };
}
