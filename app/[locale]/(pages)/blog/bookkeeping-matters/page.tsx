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

type ArticleSection = { heading: string; content: string[] };
type TipItem = { title: string; description: string };

const ensureString = (value: unknown): string =>
  typeof value === 'string' ? value : value != null ? String(value) : '';

export default async function BookkeepingMattersPage({ params }: PageParams) {
  const { locale } = params;
  const tBlog = await getTranslations({ locale, namespace: 'blog' });
  const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
  const tLayout = await getTranslations({ locale, namespace: 'layout' });

  const articleRaw = (tBlog.raw('bookkeepingMatters.article') ?? {}) as Record<string, any>;
  const sections = Array.isArray(articleRaw.sections)
    ? (articleRaw.sections as Array<Record<string, unknown>>)
    : [];
  const normalizedSections: ArticleSection[] = sections
    .map((section) => ({
      heading: typeof section?.heading === 'string' ? section.heading : '',
      content: Array.isArray(section?.content)
        ? (section.content as unknown[])
            .map((paragraph) =>
              typeof paragraph === 'string' ? paragraph : paragraph != null ? String(paragraph) : '',
            )
            .filter((paragraph): paragraph is string => paragraph.length > 0)
        : [],
    }))
    .filter((section) => section.heading.length > 0 || section.content.length > 0);
  const article = {
    title: ensureString(articleRaw.title),
    author: ensureString(articleRaw.author),
    intro: ensureString(articleRaw.intro),
    sections: normalizedSections,
    conclusion: ensureString(articleRaw.conclusion),
    published: ensureString(articleRaw.published),
    updated: ensureString(articleRaw.updated),
  };

  const tipsRaw = (tBlog.raw('bookkeepingMatters.tips') ?? {}) as Record<string, any>;
  const tipItems: TipItem[] = Array.isArray(tipsRaw.items)
    ? (tipsRaw.items as Array<Record<string, unknown>>)
        .map((item) => ({
          title: ensureString(item?.title),
          description: ensureString(item?.description),
        }))
        .filter((item) => item.title.length > 0 || item.description.length > 0)
    : [];
  const tips = {
    heading: ensureString(tipsRaw.heading),
    items: tipItems,
  };
  const hasTips = tips.heading.length > 0 || tips.items.length > 0;
  const phoneDisplay =
    locale === 'th' ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn;
  const callLabel = tLayout('cta.call', { phone: phoneDisplay });
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
          <h1 className="mt-4 text-[clamp(2.25rem,1.4rem+2.1vw,3.25rem)] font-bold text-[#A70909]">{article.title}</h1>
          <p className="mt-6 text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] text-gray-700">{article.intro}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#A70909]/60">
            {article.published} • {article.updated}
          </p>
        </div>
      </header>

      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4">
        {article.sections.map((section, index) => {
          const sectionKey = section.heading.length > 0 ? section.heading : `section-${index}`;
          return (
            <section key={sectionKey} className="space-y-4">
              {section.heading.length > 0 ? (
                <h2 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] font-semibold text-[#A70909]">
                  {section.heading}
                </h2>
              ) : null}
              {section.content.map((paragraph, paragraphIndex) => (
                <p
                  key={`${sectionKey}-paragraph-${paragraphIndex}`}
                  className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-gray-700"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          );
        })}

        {hasTips ? (
          <section className="rounded-3xl border border-[#A70909]/15 bg-white p-8 shadow-sm">
            {tips.heading.length > 0 ? (
              <h2 className="text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] font-semibold text-[#A70909]">{tips.heading}</h2>
            ) : null}
            <div className="mt-6 space-y-4">
              {tips.items.map((item, index) => {
                const itemKey = item.title.length > 0 ? item.title : `tip-${index}`;
                return (
                  <div key={itemKey} className="rounded-2xl bg-[#FFF0F0] p-5">
                    {item.title.length > 0 ? (
                      <h3 className="text-[clamp(1.05rem,0.95rem+0.3vw,1.2rem)] font-semibold text-[#A70909]">
                        {item.title}
                      </h3>
                    ) : null}
                    {item.description.length > 0 ? (
                      <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl bg-[#FFF5F5] p-8 text-center">
          <p className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] text-gray-700">{article.conclusion}</p>
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
