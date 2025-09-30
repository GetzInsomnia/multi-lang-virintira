import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { JsonLd } from '@/components/common/JsonLd';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
} from '@/seo/jsonld';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.services.bookkeeping as {
    title: string;
    description: string;
    keywords: string[];
  };
  const path = `/${locale}/services/bookkeeping`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates('/services/bookkeeping'),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      type: 'article',
      locale,
      images: [
        {
          url: absoluteUrl(`/${locale}/services/bookkeeping/opengraph-image`),
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl(`/${locale}/services/bookkeeping/opengraph-image`)],
    },
  };
}

export default async function BookkeepingServicePage({ params }: PageParams) {
  const { locale } = params;
  const tServices = await getTranslations({ locale, namespace: 'services' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });

  const hero = tServices.raw('bookkeeping.hero') as {
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    ctaCall: string;
    ctaLine: string;
    ctaEmail: string;
  };
  const features = tServices.raw('bookkeeping.features') as {
    heading: string;
    items: Array<{ title: string; description: string }>;
  };
  const faq = tServices.raw('bookkeeping.faq') as {
    heading: string;
    items: Array<{ question: string; answer: string }>;
  };
  const deliverables = tServices.raw('bookkeeping.deliverables') as {
    heading: string;
    items: string[];
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs('home'), path: `/${locale}` },
    { name: tBreadcrumbs('services'), path: `/${locale}/services/bookkeeping` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.description,
    path: `/${locale}/services/bookkeeping`,
  });
  const faqJsonLd = buildFaqJsonLd(
    faq.items.map((item) => ({ question: item.question, answer: item.answer })),
  );
  const serviceJsonLd = buildServiceJsonLd({
    name: hero.title,
    description: hero.description,
    path: `/${locale}/services/bookkeeping`,
  });

  return (
    <div className="space-y-16 pb-20">
      <JsonLd id="jsonld-bookkeeping-page" data={webPageJsonLd} />
      <JsonLd id="jsonld-bookkeeping-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="jsonld-bookkeeping-faq" data={faqJsonLd} />
      <JsonLd id="jsonld-bookkeeping-service" data={serviceJsonLd} />

      <section className="bg-[#FFF5F5]">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A70909]/70">
              {hero.subtitle}
            </p>
            <h1 className="text-4xl font-bold text-[#A70909] sm:text-5xl">{hero.title}</h1>
            <p className="text-base text-gray-700 sm:text-lg">{hero.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {hero.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#A70909]/15 bg-white p-4 text-sm text-gray-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-[#A70909] px-6 py-3 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
              >
                {hero.ctaCall.replace('{phone}', COMPANY.phoneDisplay)}
              </a>
              <a
                href={COMPANY.socials.line}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.ctaLine}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
              >
                {hero.ctaEmail}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-bold text-[#A70909] sm:text-4xl">{features.heading}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-[#A70909]/15 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#A70909]">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl bg-[#FFF0F0] p-8">
          <h2 className="text-2xl font-semibold text-[#A70909]">{deliverables.heading}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {deliverables.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#A70909]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl border border-[#A70909]/15 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#A70909]">{faq.heading}</h2>
          <div className="mt-6 space-y-4">
            {faq.items.map((item) => (
              <div key={item.question} className="rounded-2xl bg-[#FFF5F5] p-5">
                <h3 className="text-base font-semibold text-[#A70909]">{item.question}</h3>
                <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
