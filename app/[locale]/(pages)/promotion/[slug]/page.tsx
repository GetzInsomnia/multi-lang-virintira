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

    return {
        title: `${item.title} | Virintira`,
        description: item.shortInfo ? item.shortInfo.join(' ') : item.title,
        alternates: {
            canonical: absoluteUrl(path),
        },
        openGraph: {
            title: `${item.title} | Virintira`,
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
        { name: tBreadcrumbs("home") || "หน้าแรก", path: `/${locale}` },
        { name: tBreadcrumbs("promotion") || "โปรโมชั่น", path: `/${locale}/promotion` },
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

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Link
                    href={`/${locale}/promotion`}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-[#A70909] transition-colors text-sm font-medium"
                >
                    <FaChevronLeft className="w-3 h-3" />
                    <span>กลับสู่หน้ารวมโปรโมชั่น</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
                <PromotionDetailsContent item={item} ui={ui} />
            </div>

            {/* Mobile Sticky Bottom CTA Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 p-4 pb-safe flex items-center gap-3">
                <div className="flex-1 shrink flex flex-col justify-center">
                    <div className="text-[10px] text-gray-500 font-bold uppercase">ราคาแพ็กเกจ</div>
                    <div className="text-[#A70909] font-extrabold text-lg leading-tight truncate">
                        {item.price === 'ติดต่อสอบถามราคา' ? item.price : item.price.includes('ติดต่อ') ? item.price : `฿ ${item.price}`}
                    </div>
                </div>
                <a
                    href={COMPANY.socials.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none flex items-center justify-center gap-2 bg-[#06C755] text-white font-bold py-2.5 px-6 rounded-xl shadow-sm"
                >
                    <FaLine className="text-lg" />
                    <span>LINE</span>
                </a>
            </div>
        </div>
    );
}
