import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/components/common/JsonLd';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { PromotionHubClient } from '@/components/ui/PromotionHubClient';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.promotion as { title: string; description: string; keywords: string[] };
  const path = `/${locale}/promotion`;

  return {
    title: meta?.title || "Virintira | Promotions",
    description: meta?.description || "",
    keywords: meta?.keywords || [],
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates("/promotion"),
    },
    openGraph: {
      title: meta?.title || "Virintira | Promotions",
      description: meta?.description || "",
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      type: "article",
      locale,
      images: [
        {
          url: absoluteUrl(`/${locale}/promotion/opengraph-image`),
          width: 1200,
          height: 630,
          alt: meta?.title || "Promotions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title || "Virintira | Promotions",
      description: meta?.description || "",
      images: [absoluteUrl(`/${locale}/promotion/opengraph-image`)],
    },
  };
}

export default async function PromotionPage({ params }: PageParams) {
  const { locale } = params;
  const tPromotions = await getTranslations({ locale, namespace: 'promotions' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });

  const hubRaw = (tPromotions.raw('hub') ?? {}) as Record<string, any>;
  const itemsRaw = tPromotions.raw('items') as Record<string, any> | undefined;
  const uiRaw = {
    ...((tPromotions.raw('ui') ?? {}) as Record<string, string>),
    breadcrumbHome: tBreadcrumbs("home"),
    breadcrumbPromotion: tBreadcrumbs("promotion"),
  };

  const hero = {
    title: String(hubRaw?.hero?.title || ''),
    summary: String(hubRaw?.hero?.summary || ''),
  };

  const filters = (hubRaw?.filters || {}) as Record<string, string>;

  // Convert dictionary into array
  const items = itemsRaw ? Object.values(itemsRaw) : [];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs("home"), path: `/${locale}` },
    { name: tBreadcrumbs("promotion"), path: `/${locale}/promotion` },
  ]);

  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.summary,
    path: `/${locale}/promotion`,
  });

  return (
    <>
      <JsonLd id="jsonld-promotion" data={webPageJsonLd} />
      <JsonLd id="jsonld-promotion-breadcrumb" data={breadcrumbJsonLd} />

      <PromotionHubClient
        locale={locale}
        hero={hero}
        filters={filters}
        items={items as any}
        ui={uiRaw}
      />
    </>
  );
}
