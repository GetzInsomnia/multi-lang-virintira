import type { Metadata } from 'next';

import { StructuredData } from '@/components/common/StructuredData';
import { ScrollToHero } from '@/components/common/ScrollToHero';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { PopularServices } from '@/components/home/PopularServices';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PromotionSection } from '@/components/home/PromotionSection';
import { ContactCTA } from '@/components/home/ContactCTA';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { getHomeData } from '@/services/home-data';

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
  const data = await getHomeData(locale);
  const {
    hero,
    about,
    services,
    process,
    cta,
    promotion,
    labels,
  } = data;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: labels.breadcrumbs, path: `/${locale}` },
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
      <HeroSection
        content={hero}
        chatLabel={labels.chat}
        whatsappLabel={labels.whatsapp}
        triggerLabel={labels.trigger}
      />
      <PopularServices heading={services.heading} items={services.items} />
      <AboutSection
        heading={about.heading}
        paragraphs={about.paragraphs}
        linkLabel={about.link}
        viewLicenseLabel={about.viewLicense}
        closeLabel={labels.close}
      />
      <WhyChooseUsSection />

      <HowItWorksSection heading={process.heading} steps={process.steps} />
      <PromotionSection
        heading={promotion.heading}
        description={promotion.description}
        ctaLabel={promotion.ctaLabel}
        ctaHref={promotion.ctaHref}
      />
      <ContactCTA
        heading={cta.heading}
        description={cta.description}
        callLabel={labels.call}
        chatLabel={labels.chat}
        whatsappLabel={labels.whatsapp}
        emailLabel={labels.consult}
        triggerLabel={labels.trigger}
      />
    </div>
  );
}
