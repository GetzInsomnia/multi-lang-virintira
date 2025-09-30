import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY } from "@/data/company";
import { absoluteUrl } from "@/config/site";
import { buildLocaleAlternates } from "@/lib/metadata";
import { JsonLd } from "@/components/common/JsonLd";
import { loadMessages, resolveLocale } from "@/i18n/loadMessages";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/seo/jsonld";

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.promotion as { title: string; description: string; keywords: string[] };
  const path = `/${locale}/promotion`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates("/promotion"),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      type: "article",
      locale,
      images: [
        {
          url: absoluteUrl(`/${locale}/promotion/opengraph-image`),
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl(`/${locale}/promotion/opengraph-image`)],
    },
  };
}

export default async function PromotionPage({ params }: PageParams) {
  const { locale } = params;
  const tPromotion = await getTranslations({ locale, namespace: "promotion" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "breadcrumbs" });
  const tLayout = await getTranslations({ locale, namespace: "layout" });

  const hero = tPromotion.raw("hero") as { title: string; intro: string };
  const offers = tPromotion.raw("offers") as Array<{ name: string; bullets: string[]; note: string }>;
  const cta = tPromotion("cta");
  const chatLabel = tLayout("cta.chat");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs("home"), path: `/${locale}` },
    { name: tBreadcrumbs("promotion"), path: `/${locale}/promotion` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.intro,
    path: `/${locale}/promotion`,
  });

  return (
    <div className="space-y-16 pb-20">
      <JsonLd id="jsonld-promotion" data={webPageJsonLd} />
      <JsonLd id="jsonld-promotion-breadcrumb" data={breadcrumbJsonLd} />
      <section className="bg-[#FFF5F5]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-[#A70909] sm:text-5xl">{hero.title}</h1>
          <p className="mt-6 text-lg text-gray-700 sm:text-xl">{hero.intro}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 space-y-10">
        {offers.map((offer) => (
          <article key={offer.name} className="rounded-3xl border border-[#A70909]/20 bg-white p-8 shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#A70909]">{offer.name}</h2>
                <ul className="space-y-3 text-base text-gray-700">
                  {offer.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#A70909]" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#FFF0F0] p-6 text-left text-sm text-gray-600">
                <p>{offer.note}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-[#A70909] px-6 py-3 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
              >
                {cta}
              </a>
              <a
                href={COMPANY.socials.line}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chatLabel}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
