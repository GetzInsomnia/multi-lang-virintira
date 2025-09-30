import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';

export function buildWebPageJsonLd({
  locale,
  title,
  description,
  path,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    inLanguage: locale,
    url: absoluteUrl(path),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceJsonLd({
  name,
  description,
  path,
  areaServed = COMPANY.areaServed[0],
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: COMPANY.legalNameTh,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      url: absoluteUrl(path),
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: areaServed,
    },
    serviceType: name,
    url: absoluteUrl(path),
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  image,
  locale,
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  locale: string;
  published: string;
  modified: string;
}) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: published,
    dateModified: modified,
    inLanguage: locale,
    mainEntityOfPage: url,
    image: [image],
    author: {
      '@type': 'Organization',
      name: COMPANY.legalNameTh,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalNameTh,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.ico'),
      },
    },
  };
}

export function buildHowToJsonLd({
  title,
  description,
  path,
  steps,
}: {
  title: string;
  description: string;
  path: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
    })),
    totalTime: 'P1D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'THB',
      value: '0',
    },
    supply: [],
    tool: [],
    url: absoluteUrl(path),
  };
}
