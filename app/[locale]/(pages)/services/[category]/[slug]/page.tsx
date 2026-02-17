import { notFound } from 'next/navigation';
import { getTranslations, getMessages } from 'next-intl/server';
import { servicesConfig } from '@/config/services';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceSidebar } from '@/components/services/ServiceSidebar';
import { ServiceLayout } from '@/components/services/ServiceLayout';
import { JsonLd } from '@/components/common/JsonLd';
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { COMPANY } from '@/data/company';
import { FaCircleCheck, FaPhone, FaLine, FaChevronDown, FaRegClock, FaFileContract } from "react-icons/fa6";

interface PageProps {
    params: {
        locale: string;
        category: string;
        slug: string;
    };
}

export async function generateStaticParams() {
    return servicesConfig.categories.flatMap((cat) =>
        cat.items.map((item) => ({
            category: cat.categorySlug,
            slug: item.serviceSlug,
        }))
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { locale, slug } = params;
    const tServices = await getTranslations({ locale, namespace: 'services' });
    const title = tServices(`items.${slug}.title`);
    const summary = tServices(`items.${slug}.summary`);

    return {
        title: `${title} | Virintira`,
        description: summary,
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { locale, category, slug } = params;

    // 1. Validate Service & Category
    const categoryConfig = servicesConfig.categories.find(
        (c) => c.categorySlug === category
    );
    const serviceConfigItem = categoryConfig?.items.find((i) => i.serviceSlug === slug);

    if (!categoryConfig || !serviceConfigItem) return notFound();

    // 2. Load Translations & Messages Object
    const messages = await getMessages({ locale });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tLayout = await getTranslations({ locale, namespace: 'layout' });
    const tServices = await getTranslations({ locale, namespace: 'services' });

    // Safe Data Access
    const serviceData = (messages.services as any)?.items?.[slug];
    const categoryTitle = tServices(`categories.${category}.title`);
    const serviceTitle = serviceData?.title || tServices(`items.${slug}.title`);

    // 3. Extract Detailed Content (with Fallbacks)
    const hero = serviceData?.hero || {
        title: serviceTitle,
        subtitle: "Professional Services",
        description: serviceData?.summary || "",
        cta: "Get a Quote"
    };
    const features = serviceData?.features; // { title, items: [] }
    const process = serviceData?.process;   // { title, steps: [] }
    const faq = serviceData?.faq;           // { title, items: [] }

    // 4. JSON-LD & Breadcrumbs
    const breadcrumbs = [
        { label: tBreadcrumbs('services'), href: '/services' },
        { label: categoryTitle, href: `/services/${category}` },
        { label: serviceTitle, href: `/services/${category}/${slug}` },
    ];

    const breadcrumbJsonLd = buildBreadcrumbJsonLd(
        breadcrumbs.map((b) => ({ name: b.label, path: b.href }))
    );
    const webPageJsonLd = buildWebPageJsonLd({
        locale,
        title: serviceTitle,
        description: hero.description,
        path: `/services/${category}/${slug}`,
    });
    const serviceJsonLd = buildServiceJsonLd({
        name: serviceTitle,
        description: hero.description,
        path: `/services/${category}/${slug}`,
    });

    const homeBreadcrumb = tBreadcrumbs('home');

    // Transform sidebar items
    const sidebarItems = categoryConfig.items.map((item) => ({
        slug: item.serviceSlug,
        categorySlug: item.categorySlug,
        label: tServices(`items.${item.serviceSlug}.title`),
        isActive: item.serviceSlug === slug,
    }));

    const phoneDisplay = locale === 'th' ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn;

    return (
        <ServiceLayout
            breadcrumbs={<Breadcrumbs items={breadcrumbs} homeLabel={homeBreadcrumb} />}
            sidebar={
                <ServiceSidebar
                    title={categoryTitle}
                    items={sidebarItems}
                />
            }
        >
            <div className="space-y-16 pb-20 md:pb-0">
                <JsonLd id={`jsonld-${slug}-webpage`} data={webPageJsonLd} />
                <JsonLd id={`jsonld-${slug}-breadcrumb`} data={breadcrumbJsonLd} />
                <JsonLd id={`jsonld-${slug}-service`} data={serviceJsonLd} />

                {/* --- 1. Hero Section --- */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF5F5] to-white px-6 py-12 shadow-sm sm:px-10 sm:py-16">
                    <div className="relative z-10 max-w-2xl">
                        {hero.subtitle && (
                            <span className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-[#A70909]">
                                {hero.subtitle}
                            </span>
                        )}
                        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {hero.title}
                        </h1>
                        <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
                            {hero.description}
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a
                                href={`tel:${COMPANY.phone}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A70909] px-8 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#8B0808] hover:shadow-lg"
                            >
                                <FaPhone className="h-4 w-4" />
                                {tLayout('cta.call', { phone: phoneDisplay })}
                            </a>
                            <a
                                href={COMPANY.socials.line}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-8 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg"
                            >
                                <FaLine className="h-5 w-5" />
                                {tLayout('cta.chat')}
                            </a>
                        </div>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 opacity-[0.03]">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#A70909" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-4.9C93.4,9.4,81.8,23.1,70.8,35.3C59.8,47.5,49.4,58.2,37.2,65.8C25,73.4,11,77.9,-3.8,84.5C-18.6,91.1,-34.2,99.8,-47.5,96.3C-60.8,92.8,-71.8,77.1,-79.8,60.6C-87.8,44.1,-92.8,26.8,-91.6,10C-90.4,-6.8,-83,-23.1,-72.6,-36.8C-62.2,-50.5,-48.8,-61.6,-34.6,-68.8C-20.4,-76,-5.4,-79.3,7.6,-92.4L44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                </section>

                {/* --- 2. Benefits Grid --- */}
                {features && features.items && features.items.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {features.title}
                            </h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {features.items.map((item: any, idx: number) => (
                                <div key={idx} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#A70909]">
                                        <FaCircleCheck className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 3. Process Timeline --- */}
                {process && process.steps && process.steps.length > 0 && (
                    <section className="space-y-8 rounded-3xl bg-gray-50 px-6 py-12 sm:px-10">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {process.title}
                        </h2>
                        <div className="relative space-y-8 border-l-2 border-red-200 pl-8 sm:space-y-12">
                            {process.steps.map((step: any, idx: number) => (
                                <div key={idx} className="relative">
                                    <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#A70909] text-xs font-bold text-white ring-4 ring-white">
                                        {idx + 1}
                                    </span>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- 4. FAQ Section --- */}
                {faq && faq.items && faq.items.length > 0 && (
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{faq.title}</h2>
                        <div className="space-y-4">
                            {faq.items.map((item: any, idx: number) => (
                                <details key={idx} className="group rounded-2xl border border-gray-100 bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900">
                                        <div className="flex items-center gap-3 font-semibold">
                                            <span className="text-[#A70909]">Q.</span>
                                            {item.question}
                                        </div>
                                        <FaChevronDown className="h-4 w-4 text-gray-400 transition group-open:rotate-180" />
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}



            </div>
        </ServiceLayout>
    );
}
