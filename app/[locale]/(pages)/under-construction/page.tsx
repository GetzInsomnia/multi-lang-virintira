import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { COMPANY } from "@/data/company";
import { absoluteUrl } from "@/config/site";
import { buildLocaleAlternates } from "@/lib/metadata";
import { JsonLd } from "@/components/common/JsonLd";
import { loadMessages, resolveLocale } from "@/i18n/loadMessages";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "@/seo/jsonld";

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.resources as { title: string; description: string; keywords: string[] };
  const path = `/${locale}/under-construction`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: buildLocaleAlternates("/under-construction"),
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
          url: absoluteUrl(`/${locale}/under-construction/opengraph-image`),
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
      images: [absoluteUrl(`/${locale}/under-construction/opengraph-image`)],
    },
  };
}

export default async function ResourcesPage({ params }: PageParams) {
  const { locale } = params;
  const tResources = await getTranslations({ locale, namespace: "resources" });
  const tBreadcrumbs = await getTranslations({ locale, namespace: "breadcrumbs" });

  const hero = tResources.raw("hero") as { title: string; description: string };
  const documents = tResources.raw("documents") as {
    heading: string;
    items: Array<{ title: string; description: string; actionLabel: string; actionHref: string }>;
  };
  const contact = tResources.raw("contact") as {
    heading: string;
    description: string;
    channels: { phone: string; line: string; email: string };
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: tBreadcrumbs("home"), path: `/${locale}` },
    { name: tBreadcrumbs("resources"), path: `/${locale}/under-construction` },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    locale,
    title: hero.title,
    description: hero.description,
    path: `/${locale}/under-construction`,
  });
  const faqJsonLd = buildFaqJsonLd([
    { question: contact.heading, answer: contact.description },
  ]);

  return (
    <div className="space-y-16 pb-20">
      <JsonLd id="jsonld-resources" data={webPageJsonLd} />
      <JsonLd id="jsonld-resources-breadcrumb" data={breadcrumbJsonLd} />
      <JsonLd id="jsonld-resources-faq" data={faqJsonLd} />
      <section className="bg-[#FFFEFE]">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-[#A70909] sm:text-5xl">{hero.title}</h1>
          <p className="mt-6 text-lg text-gray-700 sm:text-xl">{hero.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-semibold text-[#A70909]">{documents.heading}</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {documents.items.map((item) => (
            <div key={item.title} className="flex h-full flex-col justify-between rounded-3xl border border-[#A70909]/15 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#A70909]">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <a
                href={item.actionHref}
                className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-[#A70909] px-5 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white"
                target={item.actionHref.startsWith("http") ? "_blank" : undefined}
                rel={item.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.actionLabel}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#FFECEC]">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="space-y-6 rounded-3xl bg-white/80 p-10 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-[#A70909] sm:text-4xl">{contact.heading}</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-700 sm:text-lg">{contact.description}</p>
            <div className="flex flex-col gap-3 text-sm font-semibold text-[#A70909] sm:flex-row sm:justify-center">
              <a href={`tel:${COMPANY.phone}`} className="hover:text-[#C9341F]">
                {contact.channels.phone.replace('{phone}', COMPANY.phoneDisplay)}
              </a>
              <span className="hidden sm:inline">•</span>
              <a href={COMPANY.socials.line} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9341F]">
                {contact.channels.line}
              </a>
              <span className="hidden sm:inline">•</span>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-[#C9341F]">
                {contact.channels.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
