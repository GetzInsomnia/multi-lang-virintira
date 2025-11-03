import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { StructuredData } from '@/components/common/StructuredData';
import { ScrollToHero } from '@/components/common/ScrollToHero';
import { HeroSection, type HeroContent } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { PopularServices, type ServiceItem } from '@/components/home/PopularServices';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { HowItWorksSection, type ProcessStep } from '@/components/home/HowItWorksSection';
import { PromotionSection } from '@/components/home/PromotionSection';
import { ContactCTA } from '@/components/home/ContactCTA';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';

interface PageParams {
  params: { locale: string };
}

const ensureString = (value: unknown): string =>
  typeof value === 'string' ? value : value != null ? String(value) : '';

const ensureStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? (value as unknown[])
        .map((item) => ensureString(item))
        .filter((item): item is string => item.length > 0)
    : [];

const ensureServiceItems = (value: unknown): ServiceItem[] =>
  Array.isArray(value)
    ? (value as Array<Record<string, unknown>>).map((item) => ({
        title: ensureString(item?.title),
        description: ensureString(item?.description),
      }))
    : [];

const ensureProcessSteps = (value: unknown): ProcessStep[] =>
  Array.isArray(value)
    ? (value as Array<Record<string, unknown>>).map((item) => ({
        title: ensureString(item?.title),
        description: ensureString(item?.description),
      }))
    : [];

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
      languages: buildLocaleAlternates(''),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(path),
      siteName: COMPANY.brand,
      type: 'website',
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
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl(`/${locale}/opengraph-image`)],
    },
  };
}

export default async function HomePage({ params }: PageParams) {
  const { locale } = params;
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tLayout = await getTranslations({ locale, namespace: 'layout' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
  const tPromotion = await getTranslations({ locale, namespace: 'promotion' });

  const heroRaw = (tHome.raw('hero') ?? {}) as Record<string, unknown>;
  const hero: HeroContent = {
    title: ensureString(heroRaw.title),
    subtitle: ensureString(heroRaw.subtitle),
    description: ensureString(heroRaw.description),
    primary: ensureString(heroRaw.primary),
    typewriter: ensureStringArray(heroRaw.typewriter),
    emailHeading: ensureString(heroRaw.emailHeading),
    emailButton: ensureString(heroRaw.emailButton),
  };

  const aboutRaw = (tHome.raw('about') ?? {}) as Record<string, unknown>;
  const about = {
    heading: ensureString(aboutRaw.heading),
    paragraphs: ensureStringArray(aboutRaw.paragraphs),
    link: ensureString(aboutRaw.link),
  };

  const servicesRaw = (tHome.raw('services') ?? {}) as Record<string, unknown>;
  const services = {
    heading: ensureString(servicesRaw.heading),
    items: ensureServiceItems(servicesRaw.items),
  };

  const highlightsRaw = (tHome.raw('highlights') ?? {}) as Record<string, unknown>;
  const highlights = {
    heading: ensureString(highlightsRaw.heading),
    items: ensureStringArray(highlightsRaw.items),
  };

  const processRaw = (tHome.raw('process') ?? {}) as Record<string, unknown>;
  const process = {
    heading: ensureString(processRaw.heading),
    steps: ensureProcessSteps(processRaw.steps),
  };

  const ctaRaw = (tHome.raw('cta') ?? {}) as Record<string, unknown>;
  const cta = {
    heading: ensureString(ctaRaw.heading),
    description: ensureString(ctaRaw.description),
  };

  const promotion = {
    heading: ensureString(tPromotion.raw('hero.title')),
    description: ensureString(tPromotion.raw('hero.intro')),
    ctaLabel: ensureString(tPromotion.raw('cta')),
    ctaHref: '/promotion',
  };

  const chatLabel = tLayout('cta.chat');
  const phoneDisplay =
  locale === 'th' ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn;
  const callLabel = tLayout('cta.call', { phone: phoneDisplay });
  const consultLabel = tLayout('cta.consult', { phone: phoneDisplay });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs('home'), path: `/${locale}` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.description,
    path: `/${locale}`,
  });

  return (
    <div className="space-y-0 pb-24">
      <ScrollToHero />
      <StructuredData id="jsonld-home" data={webPageJsonLd} />
      <StructuredData id="jsonld-breadcrumb" data={breadcrumbJsonLd} />
      <HeroSection content={hero} chatLabel={chatLabel} />
      <PopularServices heading={services.heading} items={services.items} />
      <WhyChooseUsSection heading={highlights.heading} points={highlights.items} />
      <HowItWorksSection heading={process.heading} steps={process.steps} />
      <PromotionSection
        heading={promotion.heading}
        description={promotion.description}
        ctaLabel={promotion.ctaLabel}
        ctaHref={promotion.ctaHref}
      />
      <AboutSection heading={about.heading} paragraphs={about.paragraphs} linkLabel={about.link} />
      <ContactCTA
        heading={cta.heading}
        description={cta.description}
        callLabel={callLabel}
        chatLabel={chatLabel}
        emailLabel={consultLabel}
      />
    </div>
  );
}
