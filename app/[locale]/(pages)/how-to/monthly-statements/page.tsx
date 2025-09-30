import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { JsonLd } from '@/components/common/JsonLd';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import {
  buildBreadcrumbJsonLd,
  buildHowToJsonLd,
  buildWebPageJsonLd,
} from '@/seo/jsonld';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.howTo.monthlyStatements as {
    title: string;
    description: string;
    keywords: string[];
  };
  const path = `/${locale}/how-to/monthly-statements`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates('/how-to/monthly-statements'),
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
          url: absoluteUrl(`/${locale}/how-to/monthly-statements/opengraph-image`),
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
      images: [absoluteUrl(`/${locale}/how-to/monthly-statements/opengraph-image`)],
    },
  };
}

export default async function MonthlyStatementsPage({ params }: PageParams) {
  const { locale } = params;
  const tHowTo = await getTranslations({ locale, namespace: 'howTo' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
  const tLayout = await getTranslations({ locale, namespace: 'layout' });

  const hero = tHowTo.raw('monthlyStatements.hero') as {
    title: string;
    description: string;
  };
  const steps = tHowTo.raw('monthlyStatements.steps') as Array<{
    title: string;
    description: string;
  }>;
  const checklist = tHowTo.raw('monthlyStatements.checklist') as {
    heading: string;
    items: string[];
  };
  const chatLabel = tLayout('cta.chat');

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs('home'), path: `/${locale}` },
    { name: tBreadcrumbs('howTo'), path: `/${locale}/how-to/monthly-statements` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.description,
    path: `/${locale}/how-to/monthly-statements`,
  });
  const howToJsonLd = buildHowToJsonLd({
    title: hero.title,
    description: hero.description,
    path: `/${locale}/how-to/monthly-statements`,
    steps: steps.map((step) => ({ name: step.title, text: step.description })),
  });

  return (
    <div className="space-y-16 pb-20">
      <JsonLd id="jsonld-howto-page" data={webPageJsonLd} />
      <JsonLd id="jsonld-howto-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="jsonld-howto-steps" data={howToJsonLd} />

      <section className="bg-[#FFF5F5]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-[#A70909] sm:text-5xl">{hero.title}</h1>
          <p className="mt-6 text-base text-gray-700 sm:text-lg">{hero.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4">
        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-[#A70909]/15 bg-white p-6 shadow-sm">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#A70909]/10 text-sm font-semibold text-[#A70909]">
                {index + 1}
              </span>
              <h2 className="text-xl font-semibold text-[#A70909]">{step.title}</h2>
              <p className="mt-3 text-sm text-gray-700">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl bg-[#FFF0F0] p-8">
          <h2 className="text-2xl font-semibold text-[#A70909]">{checklist.heading}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {checklist.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#A70909]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-[#A70909]/15 bg-white p-8 text-center shadow-sm">
          <p className="text-base text-gray-700">
            {tHowTo('monthlyStatements.cta').replace('{email}', COMPANY.email)}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
            >
              {COMPANY.email}
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
        </div>
      </section>
    </div>
  );
}
