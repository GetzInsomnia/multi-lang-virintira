import { notFound } from 'next/navigation';
import { getTranslations, getMessages } from 'next-intl/server';
import { servicesConfig, getPromotionSlugForService } from '@/config/services';
import { getCategoryTheme } from '@/config/categoryThemes';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ServiceSidebar } from '@/components/services/ServiceSidebar';
import { ServiceLayout } from '@/components/services/ServiceLayout';
import { JsonLd } from '@/components/common/JsonLd';
import { buildBreadcrumbJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { COMPANY } from '@/data/company';
import { FaCircleCheck, FaPhone, FaLine, FaChevronDown, FaRegClock, FaFileContract, FaTrophy } from "react-icons/fa6";
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { FadeUp } from '@/components/ui/FadeUp';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { FileText, Info } from 'lucide-react';
import { PromotionSectionItem } from '@/components/ui/PromotionSectionItem';

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
    const { locale, category, slug } = params;
    const tServices = await getTranslations({ locale, namespace: 'services' });
    const tMeta = await getTranslations({ locale, namespace: 'metadata.services.item' });

    const categoryTitle = tServices(`categories.${category}.title`);
    const serviceTitle = tServices(`items.${slug}.title`);
    const summary = tServices(`items.${slug}.summary`);

    return {
        title: tMeta('titleFormat', { category: categoryTitle, item: serviceTitle }),
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

    // Get category-specific color theme
    const theme = getCategoryTheme(category);

    // 2. Load Translations & Messages Object
    const messages = await getMessages({ locale });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tLayout = await getTranslations({ locale, namespace: 'layout' });
    const tServices = await getTranslations({ locale, namespace: 'services' });
    const tPromotion = await getTranslations({ locale, namespace: 'promotion' });

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
    const benefits = serviceData?.benefits; // { title, items: [] }
    const requirements = serviceData?.requirements; // { title, subtitle, documents: { title, items: [] }, information: { title, items: [] } }
    const process = serviceData?.process;   // { title, steps: [] }
    const faq = serviceData?.faq;           // { title, items: [] }
    const promotion = serviceData?.promotion; // { title, subtitle, cta }

    // Safely parse promotion offers from the 'promotions' namespace
    const tPromotions = await getTranslations({ locale, namespace: 'promotions' });
    const itemsRaw = tPromotions.raw('items') as Record<string, any> | undefined;
    const ui = (tPromotions.raw('ui') ?? {}) as Record<string, string>;

    // Smart promotion matching:
    // 1. First try JSON-declared slug from service data
    // 2. Fall back to centralized SERVICE_PROMOTION_MAP in config
    const declaredSlug = promotion?.slug;
    const mappedSlug = getPromotionSlugForService(slug);
    const effectivePromoSlug = declaredSlug || mappedSlug;

    const promotionItem = (effectivePromoSlug && itemsRaw && itemsRaw[effectivePromoSlug])
        ? itemsRaw[effectivePromoSlug]
        : undefined;

    // Auto-generate promotion banner text if service has no promotion section
    // but has a matching promotion item via config map
    const effectivePromotion = promotion?.title
        ? promotion
        : (promotionItem ? {
            title: ui.drawerTitle || 'Promotion',
            subtitle: promotionItem.title || '',
            cta: ui.viewDetails || 'View Details',
            slug: effectivePromoSlug,
        } : undefined);

    // 4. JSON-LD & Breadcrumbs
    const breadcrumbs = [
        { label: tBreadcrumbs('services'), href: '/services', scroll: false },
        { label: categoryTitle, href: `/services/${category}`, scroll: false },
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

                {/* --- 1. Premium Hero Section --- */}
                {hero && hero.title && (
                    <section className={`relative overflow-hidden rounded-[2.5rem] bg-white p-8 sm:p-16 lg:p-24 shadow-sm border ${theme.heroBorder}`}>
                        {/* Premium SVG Background */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                            <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,20 Q20,10 40,30 T100,20 L100,0 L0,0 Z" fill={theme.svgFill} />
                                <path d="M0,80 Q20,90 50,70 T100,80 L100,100 L0,100 Z" fill="#06C755" />
                                <circle cx="85" cy="15" r="40" fill="none" stroke={theme.svgFill} strokeWidth="0.5" />
                                <circle cx="15" cy="85" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#06C755]" />
                            </svg>
                        </div>
                        {/* Decorative Premium Orbs */}
                        <div className={`absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[60px] animate-pulseSlow z-0 ${theme.iconBg}`} style={{ opacity: 0.6 }}></div>
                        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-[80px] animate-float z-0" style={{ backgroundColor: theme.orbColor }}></div>
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-0"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_100%)] pointer-events-none z-0"></div>

                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <StaggerContainer>
                                {hero.subtitle && (
                                    <StaggerItem>
                                        <div className="mb-6 inline-flex items-center sm:items-center justify-center gap-2 overflow-hidden rounded-full bg-[length:200%_auto] px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-shimmer-gradient max-w-[90vw]" style={{ backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentLight}, ${theme.accent})`, boxShadow: `0 10px 15px -3px ${theme.orbColor}` }}>
                                            <FaTrophy className="h-4 w-4 shrink-0 text-yellow-300 drop-shadow-sm" />
                                            <span className="leading-tight sm:leading-normal text-left sm:text-center shrink-1 whitespace-pre-wrap">{hero.subtitle}</span>
                                        </div>
                                    </StaggerItem>
                                )}
                                <StaggerItem>
                                    <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                                        {hero.title}
                                    </h1>
                                </StaggerItem>
                                {hero.description && (
                                    <StaggerItem>
                                        <p className="mb-12 text-base text-gray-600 sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-medium" style={{ textWrap: 'pretty' }}>
                                            {hero.description}
                                        </p>
                                    </StaggerItem>
                                )}
                                <StaggerItem>
                                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-4">
                                        <div className="relative group/btn inline-flex w-full sm:w-auto justify-center">
                                            <div className="absolute -inset-1 rounded-full opacity-30 blur-xl transition-opacity duration-500 group-hover/btn:opacity-60 hidden sm:block animate-pulse-slow" style={{ backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentLight}, ${theme.accent})` }} />
                                            <a
                                                href={`tel:${COMPANY.phone}`}
                                                className="relative overflow-hidden inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                                style={{ backgroundColor: theme.accent }}
                                            >
                                                <FaPhone className="h-5 w-5 shrink-0" />
                                                <span className="relative z-10 whitespace-nowrap">{phoneDisplay}</span>
                                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                                            </a>
                                        </div>
                                        <a
                                            href={COMPANY.socials.line}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#06C755] px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-xl hover:shadow-green-900/10"
                                        >
                                            <FaLine className="h-5 w-5 shrink-0" />
                                            <span className="whitespace-nowrap">{tLayout('cta.chat')}</span>
                                        </a>
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>
                        </div>
                    </section>
                )}

                {/* --- 1.5 Rainbow Shadow Config --- */}
                {(() => {
                    const RAINBOW_SHADOWS = [
                        "hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.5)]",   // Purple
                        "hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)]",    // Indigo
                        "hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.5)]",    // Blue
                        "hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.5)]",    // Green
                        "hover:shadow-[0_20px_40px_-15px_rgba(202,138,4,0.5)]",    // Yellow
                        "hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.5)]",    // Orange
                        "hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.5)]",    // Red
                    ];
                    return null;
                })()}

                {/* --- 2. Features Grid --- */}
                {features && features.items && features.items.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {features.title}
                            </h2>
                        </div>
                        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 auto-rows-fr">
                            {features.items.map((item: any, idx: number) => {
                                const RAINBOW_SHADOWS = [
                                    "hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(202,138,4,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.4)]",
                                ];
                                const shadowClass = RAINBOW_SHADOWS[idx % RAINBOW_SHADOWS.length];
                                return (
                                    <StaggerItem key={idx} className="h-full">
                                        <div className={`group flex flex-col h-full rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 ${shadowClass} ${theme.hoverBorder}`}>
                                            <div className="flex items-center gap-6 mb-4">
                                                <div className={`flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${theme.iconBg} ${theme.iconText} transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:[background-color:var(--hover-bg)] shadow-inner`} style={{ '--hover-bg': theme.accent } as React.CSSProperties}>
                                                    {item.icon ? (
                                                        <DynamicIcon name={item.icon} className="h-7 w-7" strokeWidth={2} />
                                                    ) : (
                                                        <FaCircleCheck className="h-6 w-6" />
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed text-base flex-1">{item.description}</p>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </section>
                )}

                {/* --- 2.5 Benefits Grid --- */}
                {benefits && benefits.items && benefits.items.some((item: any) => (typeof item === 'string' ? item.trim() !== "" : item.title?.trim() !== "")) && (
                    <section className={`space-y-8 rounded-3xl ${theme.tintBg} px-6 py-12 sm:px-10`}>
                        <div className="flex items-center gap-3">
                            <h2 className={`text-2xl font-bold ${theme.benefitsHeading} sm:text-3xl`}>
                                {benefits.title}
                            </h2>
                        </div>
                        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                            {benefits.items.filter((item: any) => (typeof item === 'string' ? item.trim() !== "" : item.title?.trim() !== "")).map((item: any, idx: number) => {
                                const title = typeof item === 'string' ? item : item.title;
                                const iconName = typeof item === 'string' ? undefined : item.icon;
                                const RAINBOW_SHADOWS = [
                                    "hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(202,138,4,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.4)]",
                                ];
                                const shadowClass = RAINBOW_SHADOWS[idx % RAINBOW_SHADOWS.length];
                                return (
                                    <StaggerItem key={idx} className="h-full">
                                        <div className={`group flex flex-col sm:flex-row h-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${shadowClass}`}>
                                            <div className={`flex-shrink-0 ${theme.iconText} p-3 ${theme.iconBg} rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-md group-hover:[background-color:var(--hover-bg)]`} style={{ '--hover-bg': theme.accent } as React.CSSProperties}>
                                                {iconName ? (
                                                    <DynamicIcon name={iconName} className="h-6 w-6" strokeWidth={2.5} />
                                                ) : (
                                                    <FaCircleCheck className="h-6 w-6" />
                                                )}
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 sm:text-base leading-snug flex-1 text-center sm:text-left">{title}</p>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </section>
                )}

                {/* --- 2.7 Requirements Section --- */}
                {requirements && requirements.title && requirements.title.trim() !== "" && (
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {requirements.title}
                            </h2>
                            {requirements.subtitle && (
                                <p className="mt-2 text-lg text-gray-600">{requirements.subtitle}</p>
                            )}
                        </div>
                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Documents Required */}
                            {requirements.documents && requirements.documents.items.some((item: string) => item.trim() !== "") && (
                                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FaFileContract className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{requirements.documents.title}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {requirements.documents.items.filter((item: string) => item.trim() !== "").map((item: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <div className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                                                <span className="leading-relaxed flex-1 whitespace-pre-line">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Information Required */}
                            {requirements.information && requirements.information.items.some((item: string) => item.trim() !== "") && (
                                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                            <FaRegClock className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{requirements.information.title}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {requirements.information.items.filter((item: string) => item.trim() !== "").map((item: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <div className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-600" />
                                                <span className="leading-relaxed flex-1 whitespace-pre-line">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                )}
                {process && process.steps && process.steps.length > 0 && (
                    <section className="space-y-8 rounded-3xl bg-gray-50 px-6 py-12 sm:px-10">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {process.title}
                        </h2>
                        <StaggerContainer className="relative grid gap-6 sm:gap-10 auto-rows-fr">
                            {process.steps.map((step: any, idx: number) => {
                                const RAINBOW_SHADOWS = [
                                    "hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(202,138,4,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(234,88,12,0.4)]",
                                    "hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.4)]",
                                ];
                                const shadowClass = RAINBOW_SHADOWS[idx % RAINBOW_SHADOWS.length];
                                return (
                                    <StaggerItem key={idx} className="relative pl-0 sm:pl-24 group h-full">
                                        <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-16 w-16 items-center justify-center rounded-2xl text-white ring-4 ring-white transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: theme.accent, boxShadow: `0 4px 20px ${theme.stepShadow}` }}>
                                            {step.icon ? (
                                                <DynamicIcon name={step.icon} className="h-8 w-8" strokeWidth={2.5} />
                                            ) : (
                                                <span className="text-2xl font-bold">{idx + 1}</span>
                                            )}
                                        </div>
                                        <div className={`space-y-3 h-full flex flex-col justify-center rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 ${shadowClass}`}>
                                            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex sm:hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ backgroundColor: theme.accent, boxShadow: `0 2px 10px ${theme.stepShadow}` }}>
                                                        {step.icon ? (
                                                            <DynamicIcon name={step.icon} className="h-5 w-5" strokeWidth={2.5} />
                                                        ) : (
                                                            <span className="text-lg font-bold">{idx + 1}</span>
                                                        )}
                                                    </div>
                                                    <span className={`text-sm font-bold ${theme.iconText} ${theme.iconBg} px-3 py-1 rounded-full uppercase tracking-wider shrink-0`}>Step {idx + 1}</span>
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{step.title}</h3>
                                            </div>
                                            <p className="leading-relaxed text-gray-600 text-base sm:text-lg">{step.description}</p>
                                        </div>
                                    </StaggerItem>
                                )
                            })}
                        </StaggerContainer>
                    </section>
                )}

                {/* --- 5. Promotion Section (Special Deal) --- */}
                {effectivePromotion && effectivePromotion.title && promotionItem && (
                    <PromotionSectionItem
                        promotion={effectivePromotion}
                        item={promotionItem}
                        ui={ui}
                    />
                )}

                {/* --- 6. FAQ Section --- */}
                {faq && faq.items && faq.items.length > 0 && (
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{faq.title}</h2>
                        <FAQAccordion items={faq.items} />
                    </section>
                )}
            </div>
        </ServiceLayout>
    );
}
