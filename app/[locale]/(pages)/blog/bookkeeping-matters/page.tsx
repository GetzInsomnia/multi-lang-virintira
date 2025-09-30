import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { JsonLd } from '@/components/common/JsonLd';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from '@/seo/jsonld';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.blog.bookkeepingMatters as {
    title: string;
    description: string;
    keywords: string[];
  };
  const path = `/${locale}/blog/bookkeeping-matters`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates('/blog/bookkeeping-matters'),
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
          url: absoluteUrl(`/${locale}/blog/bookkeeping-matters/opengraph-image`),
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
      images: [absoluteUrl(`/${locale}/blog/bookkeeping-matters/opengraph-image`)],
    },
  };
}

export default async function BookkeepingMattersPage({ params }: PageParams) {
  const { locale } = params;
  const tBlog = await getTranslations({ locale, namespace: 'blog' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
  const tLayout = await getTranslations({ locale, namespace: 'layout' });

  const article = tBlog.raw('bookkeepingMatters.article') as {
    title: string;
    author: string;
    intro: string;
    sections: Array<{ heading: string; content: string[] }>;
    conclusion: string;
    published: string;
    updated: string;
  };

  const tips = tBlog.raw('bookkeepingMatters.tips') as {
    heading: string;
    items: Array<{ title: string; description: string }>;
  };
  const callLabel = tLayout('cta.call', { phone: COMPANY.phoneDisplay });
  const chatLabel = tLayout('cta.chat');

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs('home'), path: `/${locale}` },
    { name: tBreadcrumbs('blog'), path: `/${locale}/blog/bookkeeping-matters` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: article.title,
    description: article.intro,
    path: `/${locale}/blog/bookkeeping-matters`,
  });
  const articleJsonLd = buildArticleJsonLd({
    title: article.title,
    description: article.intro,
    path: `/${locale}/blog/bookkeeping-matters`,
    image: absoluteUrl(`/${locale}/blog/bookkeeping-matters/opengraph-image`),
    locale,
    published: article.published,
    modified: article.updated,
  });

  return (
    <article className="space-y-16 pb-20">
      <JsonLd id="jsonld-blog-page" data={webPageJsonLd} />
      <JsonLd id="jsonld-blog-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="jsonld-blog-article" data={articleJsonLd} />

      <header className="bg-[#FFF5F5]">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#A70909]/70">
            {article.author}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#A70909] sm:text-5xl">{article.title}</h1>
          <p className="mt-6 text-base text-gray-700 sm:text-lg">{article.intro}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#A70909]/60">
            {article.published} • {article.updated}
          </p>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4">
        {article.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#A70909]">{section.heading}</h2>
            {section.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="rounded-3xl border border-[#A70909]/15 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#A70909]">{tips.heading}</h2>
          <div className="mt-6 space-y-4">
            {tips.items.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#FFF0F0] p-5">
                <h3 className="text-base font-semibold text-[#A70909]">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#FFF5F5] p-8 text-center">
          <p className="text-base text-gray-700">{article.conclusion}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
          </div>
        </section>
      </div>
    </article>
  );
}
