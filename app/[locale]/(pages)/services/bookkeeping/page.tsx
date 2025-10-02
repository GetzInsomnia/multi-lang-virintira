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

  const ensureString = (value: unknown): string =>
    typeof value === 'string' ? value : value != null ? String(value) : '';

  const heroRaw = (tServices.raw('bookkeeping.hero') ?? {}) as Record<string, any>;
  const hero = {
    title: ensureString(heroRaw.title),
    subtitle: ensureString(heroRaw.subtitle),
    description: ensureString(heroRaw.description),
    highlights: Array.isArray(heroRaw.highlights)
      ? (heroRaw.highlights as unknown[])
          .map((item) => ensureString(item))
          .filter((item) => item.length > 0)
      : [],
    ctaCall: ensureString(heroRaw.ctaCall),
    ctaLine: ensureString(heroRaw.ctaLine),
    ctaEmail: ensureString(heroRaw.ctaEmail),
  };
  const featuresRaw = (tServices.raw('bookkeeping.features') ?? {}) as Record<string, any>;
  const features = {
    heading: ensureString(featuresRaw.heading),
    items: Array.isArray(featuresRaw.items)
      ? (featuresRaw.items as Array<Record<string, unknown>>).map((item) => ({
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
      : [],
  };
  const overviewRaw = (tServices.raw('bookkeeping.overview') ?? {}) as Record<string, any>;
  const overview = {
    introTitle: ensureString(overviewRaw.introTitle),
    introDescription: ensureString(overviewRaw.introDescription),
    coverageTitle: ensureString(overviewRaw.coverageTitle),
    coverageItems: Array.isArray(overviewRaw.coverageItems)
      ? (overviewRaw.coverageItems as Array<Record<string, unknown>>).map((item) => ({
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
      : [],
    note: ensureString(overviewRaw.note),
  };
  const metricsRaw = (tServices.raw('bookkeeping.metrics') ?? {}) as Record<string, any>;
  const metrics = {
    heading: ensureString(metricsRaw.heading),
    items: Array.isArray(metricsRaw.items)
      ? (metricsRaw.items as Array<Record<string, unknown>>).map((item) => ({
          value: ensureString(item?.value),
          label: ensureString(item?.label),
        }))
      : [],
  };
  const processRaw = (tServices.raw('bookkeeping.process') ?? {}) as Record<string, any>;
  const process = {
    heading: ensureString(processRaw.heading),
    description: ensureString(processRaw.description),
    steps: Array.isArray(processRaw.steps)
      ? (processRaw.steps as Array<Record<string, unknown>>).map((item) => ({
          title: ensureString(item?.title),
          description: ensureString(item?.description),
          duration: ensureString(item?.duration),
        }))
      : [],
  };
  const faqRaw = (tServices.raw('bookkeeping.faq') ?? {}) as Record<string, any>;
  const faq = {
    heading: ensureString(faqRaw.heading),
    items: Array.isArray(faqRaw.items)
      ? (faqRaw.items as Array<Record<string, unknown>>).map((item) => ({
          question: ensureString(item?.question),
          answer: ensureString(item?.answer),
        }))
      : [],
  };
  const deliverablesRaw = (tServices.raw('bookkeeping.deliverables') ?? {}) as Record<string, any>;
  const deliverables = {
    heading: ensureString(deliverablesRaw.heading),
    items: Array.isArray(deliverablesRaw.items)
      ? (deliverablesRaw.items as unknown[])
          .map((item) => ensureString(item))
          .filter((item) => item.length > 0)
      : [],
  };
  const supportRaw = (tServices.raw('bookkeeping.support') ?? {}) as Record<string, any>;
  const support = {
    heading: ensureString(supportRaw.heading),
    items: Array.isArray(supportRaw.items)
      ? (supportRaw.items as Array<Record<string, unknown>>).map((item) => ({
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
      : [],
  };
  const ctaBannerRaw = (tServices.raw('bookkeeping.ctaBanner') ?? {}) as Record<string, any>;
  const ctaBanner = {
    heading: ensureString(ctaBannerRaw.heading),
    description: ensureString(ctaBannerRaw.description),
    primary: ensureString(ctaBannerRaw.primary),
    secondary: ensureString(ctaBannerRaw.secondary),
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
    <div className="space-y-24 pb-32">
      <JsonLd id="jsonld-bookkeeping-page" data={webPageJsonLd} />
      <JsonLd id="jsonld-bookkeeping-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="jsonld-bookkeeping-faq" data={faqJsonLd} />
      <JsonLd id="jsonld-bookkeeping-service" data={serviceJsonLd} />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7F7] via-white to-[#FFEAEA]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-[#A70909]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 translate-y-1/2 rounded-full bg-[#FBCDCD]/60 blur-2xl" />
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#FDEAEA]/80 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="space-y-8 text-center lg:text-left">
              {hero.subtitle && (
                <p className="inline-flex items-center justify-center rounded-full border border-[#A70909]/30 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#A70909]/80 shadow-sm backdrop-blur-sm lg:justify-start">
                  {hero.subtitle}
                </p>
              )}
              <div className="space-y-4">
                <h1 className="text-[clamp(2.25rem,1.2rem+2.6vw,3.5rem)] font-bold leading-tight text-[#8A0505]">
                  {hero.title}
                </h1>
                <p className="text-[clamp(1rem,0.95rem+0.25vw,1.1rem)] text-gray-700">
                  {hero.description}
                </p>
              </div>
              {hero.highlights.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {hero.highlights.map((item) => (
                    <div
                      key={item}
                      className="group flex flex-col rounded-2xl border border-[#A70909]/10 bg-white/80 p-4 text-left text-sm text-gray-700 shadow-sm transition hover:-translate-y-1 hover:border-[#A70909]/40 hover:shadow-lg hover:shadow-[#A70909]/10"
                    >
                      <span className="mb-2 h-1 w-12 rounded-full bg-[#A70909]/70 transition group-hover:w-16 group-hover:bg-[#C9341F]" />
                      {item}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-start lg:items-stretch">
                {hero.ctaCall && (
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-[#A70909] bg-white/90 px-7 py-3 text-sm font-semibold text-[#A70909] transition hover:-translate-y-0.5 hover:bg-[#A70909] hover:text-white"
                  >
                    {hero.ctaCall.replace('{phone}', COMPANY.phoneDisplay)}
                  </a>
                )}
                {hero.ctaLine && (
                  <a
                    href={COMPANY.socials.line}
                    className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#06C755] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hero.ctaLine}
                  </a>
                )}
                {hero.ctaEmail && (
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#A70909] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#C9341F]"
                  >
                    {hero.ctaEmail}
                  </a>
                )}
              </div>
            </div>
            {metrics.items.length > 0 && (
              <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/80 bg-white/70 p-8 shadow-xl shadow-[#A70909]/10 backdrop-blur">
                <h2 className="text-xl font-semibold text-[#A70909]">{metrics.heading}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {metrics.items.map((item, index) => (
                    <div key={`${item.value}-${index}`} className="rounded-2xl border border-[#A70909]/10 bg-white p-4 text-center shadow-sm">
                      <p className="text-3xl font-bold text-[#8A0505]">{item.value}</p>
                      <p className="mt-2 text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="space-y-6">
          <h2 className="text-[clamp(1.85rem,1.2rem+1.9vw,2.8rem)] font-semibold text-[#8A0505]">
            {features.heading}
          </h2>
          {features.items.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {features.items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="group h-full rounded-3xl border border-[#A70909]/15 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#A70909]/30 hover:shadow-lg hover:shadow-[#A70909]/10"
                >
                  <h3 className="text-[clamp(1.2rem,1.05rem+0.35vw,1.45rem)] font-semibold text-[#A70909]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#A70909]/70">
              {overview.introTitle}
            </p>
            <h2 className="text-[clamp(1.8rem,1.3rem+1.5vw,2.6rem)] font-bold text-[#8A0505]">
              {overview.coverageTitle}
            </h2>
            <p className="text-[clamp(1rem,0.98rem+0.2vw,1.1rem)] text-gray-700">{overview.introDescription}</p>
            {overview.note && (
              <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#A70909]/20 bg-[#FFF6F6] px-4 py-2 text-sm text-[#8A0505]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#A70909]" aria-hidden="true" />
                {overview.note}
              </div>
            )}
          </div>
          {overview.coverageItems.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {overview.coverageItems.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex h-full flex-col rounded-3xl border border-[#A70909]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#A70909]/30 hover:shadow-lg hover:shadow-[#A70909]/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBD7D7] text-[#8A0505]">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#A70909]">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#FFF5F5]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#A70909]/70">
                {process.description}
              </p>
              <h2 className="text-[clamp(1.9rem,1.3rem+1.8vw,2.75rem)] font-bold text-[#8A0505]">
                {process.heading}
              </h2>
            </div>
            {process.steps.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-4">
                {process.steps.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="group relative h-full rounded-3xl border border-[#A70909]/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#A70909]/30 hover:shadow-lg hover:shadow-[#A70909]/15"
                  >
                    <span className="inline-flex items-center rounded-full bg-[#A70909]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#A70909]/80">
                      {step.duration}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-[#A70909]">{step.title}</h3>
                    <p className="mt-3 text-sm text-gray-600">{step.description}</p>
                    <span className="absolute inset-x-6 bottom-0 h-1 rounded-full bg-gradient-to-r from-[#A70909]/20 to-transparent opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 rounded-[32px] border border-[#A70909]/15 bg-white p-8 shadow-sm lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,1.2rem+1.2vw,2.3rem)] font-semibold text-[#8A0505]">
              {deliverables.heading}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              {hero.description}
            </p>
          </div>
          {deliverables.items.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {deliverables.items.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#A70909]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {support.items.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <div className="space-y-6">
            <h2 className="text-[clamp(1.7rem,1.25rem+1.5vw,2.5rem)] font-semibold text-[#8A0505]">
              {support.heading}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {support.items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="h-full rounded-3xl border border-[#A70909]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#A70909]/30 hover:shadow-lg hover:shadow-[#A70909]/15"
                >
                  <h3 className="text-lg font-semibold text-[#A70909]">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#8A0505] to-[#C9341F]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col items-center gap-6 text-center text-white md:flex-row md:items-center md:justify-between md:text-left">
            <div className="space-y-3">
              <h2 className="text-[clamp(1.9rem,1.3rem+1.8vw,2.75rem)] font-semibold leading-snug">{ctaBanner.heading}</h2>
              <p className="max-w-xl text-sm text-white/80">{ctaBanner.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {ctaBanner.primary && (
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#A70909] transition hover:-translate-y-0.5 hover:bg-[#F7D6D6]"
                >
                  {ctaBanner.primary}
                </a>
              )}
              {ctaBanner.secondary && (
                <a
                  href="/resources"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {ctaBanner.secondary}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-[#A70909]/15 bg-white p-8 shadow-sm">
          <h2 className="text-[clamp(1.6rem,1.1rem+1.4vw,2.4rem)] font-semibold text-[#8A0505]">{faq.heading}</h2>
          {faq.items.length > 0 && (
            <div className="mt-6 space-y-4">
              {faq.items.map((item, index) => (
                <div key={`${item.question}-${index}`} className="rounded-2xl bg-[#FFF5F5] p-5">
                  <h3 className="text-[clamp(1.05rem,0.95rem+0.3vw,1.2rem)] font-semibold text-[#A70909]">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
