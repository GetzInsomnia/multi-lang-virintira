import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/components/common/JsonLd';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.home as { title: string; description: string; keywords: string[] };
  const path = `/${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates(""),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      type: "website",
      locale,
      images: [
        {
          url: absoluteUrl(`/${locale}/opengraph-image`),
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
      images: [absoluteUrl(`/${locale}/opengraph-image`)],
    },
  };
}

const ensureString = (value: unknown): string =>
  typeof value === 'string' ? value : value != null ? String(value) : '';

const ensureStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? (value as unknown[])
        .map((item) => ensureString(item))
        .filter((item): item is string => item.length > 0)
    : [];

export default async function HomePage({ params }: PageParams) {
  const { locale } = params;
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tLayout = await getTranslations({ locale, namespace: 'layout' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });

  const heroRaw = (tHome.raw('hero') ?? {}) as Record<string, unknown>;
  const hero = {
    title: ensureString(heroRaw.title),
    subtitle: ensureString(heroRaw.subtitle),
    description: ensureString(heroRaw.description),
    primary: ensureString(heroRaw.primary),
    typewriter: ensureStringArray(heroRaw.typewriter),
    emailHeading: ensureString(heroRaw.emailHeading),
    emailButton: ensureString(heroRaw.emailButton),
  };

  const aboutRaw = (tHome.raw('about') ?? {}) as Record<string, unknown>;
  const aboutParagraphs = ensureStringArray(aboutRaw.paragraphs);
  const about = {
    heading: ensureString(aboutRaw.heading),
    paragraphs: aboutParagraphs,
    link: ensureString(aboutRaw.link),
  };

  const servicesRaw = (tHome.raw('services') ?? {}) as Record<string, unknown>;
  const serviceItems = Array.isArray(servicesRaw.items) ? servicesRaw.items : [];
  const services = {
    heading: ensureString(servicesRaw.heading),
    items: (serviceItems as Array<Record<string, unknown>>).map((item) => ({
      title: ensureString(item?.title),
      description: ensureString(item?.description),
    })),
  };

  const highlightsRaw = (tHome.raw('highlights') ?? {}) as Record<string, unknown>;
  const highlights = {
    heading: ensureString(highlightsRaw.heading),
    items: ensureStringArray(highlightsRaw.items),
  };

  const processRaw = (tHome.raw('process') ?? {}) as Record<string, unknown>;
  const processSteps = Array.isArray(processRaw.steps) ? processRaw.steps : [];
  const process = {
    heading: ensureString(processRaw.heading),
    steps: (processSteps as Array<Record<string, unknown>>).map((step) => ({
      title: ensureString(step?.title),
      description: ensureString(step?.description),
    })),
  };

  const ctaRaw = (tHome.raw('cta') ?? {}) as Record<string, unknown>;
  const cta = {
    heading: ensureString(ctaRaw.heading),
    description: ensureString(ctaRaw.description),
  };

  const callLabel = tLayout("cta.call", { phone: COMPANY.phoneDisplay });
  const chatLabel = tLayout("cta.chat");
  const consultLabel = tLayout("cta.consult", { phone: COMPANY.phoneDisplay });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs("home"), path: `/${locale}` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.description,
    path: `/${locale}`,
  });

  return (
    <div className="space-y-24 pb-24">
      <JsonLd id="jsonld-home" data={webPageJsonLd} />
      <JsonLd id="jsonld-breadcrumb" data={breadcrumbJsonLd} />
      <section className="relative overflow-hidden bg-[#FFFEFE]" id="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFEFE] via-[#FFEDED] to-[#FAD1D1]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="max-w-xl space-y-6">
            <h1 className="text-[clamp(2.5rem,1.5rem+2.5vw,3.75rem)] font-extrabold leading-tight text-[#A70909]">{hero.title}</h1>
            <div className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-semibold text-[#A70909]">
              <TypewriterText phrases={hero.typewriter} />
            </div>
            <p className="text-[clamp(1.25rem,1.1rem+0.5vw,1.6rem)] font-semibold text-[#A70909]">{hero.subtitle}</p>
            <p className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-gray-700">{hero.description}</p>
            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-start">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#A70909] px-6 py-3 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
              >
                {hero.primary}
              </a>
              <a
                href={COMPANY.socials.line}
                className="inline-flex items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chatLabel}
              </a>
            </div>
          </div>
          <div className="flex max-w-md flex-col items-center gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur">
            <p className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-semibold text-[#A70909]">{hero.emailHeading}</p>
            <p className="text-sm text-gray-600">{COMPANY.legalNameTh}</p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
            >
              {hero.emailButton}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4" id="about">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-[#A70909]">{about.heading}</h2>
            <div className="space-y-4 text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-gray-700">
              {about.paragraphs.map((paragraph: string, index: number) => (
                <p key={index} className="indent-6">
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex w-fit items-center justify-center rounded-full border-2 border-[#A70909] px-5 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
            >
              {about.link}
            </a>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-[#A70909]/20 bg-white p-6 shadow-lg">
              <h3 className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-semibold text-[#A70909]">{COMPANY.legalNameTh}</h3>
              <p className="mt-4 space-y-1 text-sm leading-relaxed text-gray-600">
                <span className="block">Tax ID: {COMPANY.taxId}</span>
                <span className="block">{COMPANY.address.streetAddress}</span>
                <span className="block">
                  {COMPANY.address.subDistrict} {COMPANY.address.district} {COMPANY.address.province} {COMPANY.address.postalCode}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff5f5]" id="services">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-[#A70909]">{services.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((item, index) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl border border-white/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#A70909]/10 text-[#A70909]">
                  {index + 1}
                </span>
                <h3 className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-semibold text-[#A70909]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4" id="why-us">
        <div className="rounded-3xl bg-gradient-to-br from-[#A70909] to-[#6B0606] p-10 text-white">
          <h2 className="text-center text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold">{highlights.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.items.map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-6 text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] font-medium leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4" id="process">
        <div className="space-y-8">
          <h2 className="text-center text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-[#A70909]">{process.heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-[#A70909]/20 bg-white p-6 shadow-sm">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#A70909]/10 text-sm font-semibold text-[#A70909]">
                  {index + 1}
                </span>
                <h3 className="text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-semibold text-[#A70909]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFECEC]" id="contact">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/80 p-10 text-center shadow-lg">
            <h2 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-[#A70909]">{cta.heading}</h2>
            <p className="max-w-2xl text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-gray-700">{cta.description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full border-2 border-[#A70909] px-6 py-3 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
              >
                {callLabel}
              </a>
              <a
                href={COMPANY.socials.line}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                {chatLabel}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
              >
                {consultLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
