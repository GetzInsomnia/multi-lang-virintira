import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaCheckCircle, FaLine, FaPhoneAlt, FaChevronLeft } from 'react-icons/fa';

import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { resolveLocale } from '@/i18n/loadMessages';
import { loadMessages } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import { PromotionDetailsContent } from '@/components/ui/PromotionDetailsContent';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PageParams {
    params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const locale = resolveLocale(params.locale);
    const messages = (await loadMessages(locale)) as any;
    const promotionsRaw = messages?.promotions?.items || {};
    const item = promotionsRaw[params.slug];

    if (!item) {
        return { title: 'Not Found' };
    }

    const path = `/${locale}/promotion/${params.slug}`;

    const hubTitle = messages?.metadata?.promotion?.title || 'Virintira | Promotions';

    return {
        title: `${hubTitle} ${item.title}`,
        description: item.shortInfo ? item.shortInfo.join(' ') : item.title,
        alternates: {
            canonical: absoluteUrl(path),
        },
        openGraph: {
            title: `${hubTitle} ${item.title}`,
            description: item.shortInfo ? item.shortInfo.join(' ') : item.title,
            url: absoluteUrl(path),
            siteName: COMPANY.brand,
            type: "article",
            locale,
            images: [
                {
                    url: absoluteUrl(`/${locale}/promotion/opengraph-image`), // Fallback to hub og-image
                    width: 1200,
                    height: 630,
                    alt: item.title,
                },
            ],
        },
    };
}

export default async function SinglePromotionPage({ params }: PageParams) {
    const { locale, slug } = params;
    const tPromotions = await getTranslations({ locale, namespace: 'promotions' });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });

    const itemsRaw = tPromotions.raw('items') as Record<string, any> | undefined;
    const ui = tPromotions.raw('ui') as Record<string, string>;

    // Find the specific promotion
    const item = itemsRaw ? itemsRaw[slug] : null;

    if (!item || !item.title) {
        notFound();
    }

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: tBreadcrumbs("home"), path: `/${locale}` },
        { name: tBreadcrumbs("promotion"), path: `/${locale}/promotion` },
        { name: item.title, path: `/${locale}/promotion/${slug}` },
    ]);

    const webPageJsonLd = buildWebPageJsonLd({
        locale,
        title: item.title,
        description: item.shortInfo ? item.shortInfo.join(' ') : item.title,
        path: `/${locale}/promotion/${slug}`,
    });

    return (
        <div className="bg-[#FFFEFE] min-h-screen">
            <JsonLd id="jsonld-single-promo" data={webPageJsonLd} />
            <JsonLd id="jsonld-single-promo-breadcrumb" data={breadcrumbJsonLd} />

            <div className="max-w-7xl mx-auto px-4 pt-8 pb-6 sm:px-6 lg:px-8">
                <Breadcrumbs
                    homeLabel={tBreadcrumbs("home")}
                    items={[
                        { label: tBreadcrumbs("promotion"), href: `/promotion`, scroll: false },
                        { label: item.title, href: `/promotion/${slug}` },
                    ]}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
                <PromotionDetailsContent item={item} ui={ui} />
            </div>
        </div>
    );
}
