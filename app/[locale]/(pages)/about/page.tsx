import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { ShieldCheck, Zap, Handshake } from 'lucide-react';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FadeUp } from '@/components/ui/FadeUp';
import { SlideIn } from '@/components/ui/SlideIn';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import AboutCtaButton from './AboutCtaButton';
import React from 'react';

interface PageParams {
    params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const locale = resolveLocale(params.locale);
    const messages = (await loadMessages(locale)) as any;
    const meta = messages.metadata.aboutUs as { title: string; description: string; keywords: string[] } | undefined;

    // Fallback if metadata is missing in some languages temporarily
    const fallbackTitle = "About Virintira";
    const fallbackDesc = "Your trusted business partner in Thailand.";

    const title = meta?.title ?? fallbackTitle;
    const description = meta?.description ?? fallbackDesc;
    const keywords = meta?.keywords ?? [];
    const path = `/${locale}/about`;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: absoluteUrl(path),
            languages: buildLocaleAlternates("/about"),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(path),
            siteName: COMPANY.brand,
            type: "website",
            locale,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function AboutUsPage({ params }: PageParams) {
    const { locale } = params;

    // CJK languages have a known bug with text-balance in Chromium causing left-alignment
    const isCJK = ['ja', 'zh-Hans', 'zh-Hant', 'ko'].includes(locale);
    const isJA = locale === 'ja';

    // Strip HTML tags for SEO Metadata (e.g. removing <nw> and <br> from JSON-LD strings)
    const stripTags = (str: string) => typeof str === 'string' ? str.replace(/<[^>]*>?/gm, '') : '';

    const tAbout = await getTranslations({ locale, namespace: 'aboutUs' });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tLayout = await getTranslations({ locale, namespace: 'layout' });

    // Japanese-specific typography tweaks: keep phrases together on larger screens
    const jaTypography = locale === 'ja' ? 'sm:break-keep' : '';

    const headerTypography = isCJK
        ? `text-balance break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-full mx-auto`
        : 'text-balance break-words [overflow-wrap:anywhere]';

    const bodyTypography = isCJK
        ? `text-balance break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-full mx-auto`
        : 'text-balance break-words [overflow-wrap:anywhere]';

    // Fallbacks in case the nested structure is complex
    const storyParagraphsSource = tAbout.raw('story.paragraphs');
    const storyParagraphs = Array.isArray(storyParagraphsSource)
        ? (storyParagraphsSource as string[])
        : [];

    const valuesItems = ['transparency', 'speed', 'reliability'] as const;

    const valueIcons = {
        transparency: <ShieldCheck className="h-8 w-8 text-[#A70909]" />,
        speed: <Zap className="h-8 w-8 text-[#A70909]" />,
        reliability: <Handshake className="h-8 w-8 text-[#A70909]" />,
    };

    const getEnsureString = (val: unknown) => (typeof val === 'string' ? val : '');

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: tBreadcrumbs("home", { fallback: "Home" }), path: `/${locale}` },
        { name: stripTags(String(tAbout.raw("hero.title") || "About Us")), path: `/${locale}/about` },
    ]);
    const webPageJsonLd = buildWebPageJsonLd({
        locale,
        title: stripTags(String(tAbout.raw('hero.title') || "About Us")),
        description: stripTags(String(tAbout.raw('hero.subtitle') || "")),
        path: `/${locale}/about`,
    });

    return (
        <div className="w-full bg-[#fcfcfc]">
            <JsonLd id="jsonld-about" data={webPageJsonLd} />
            <JsonLd id="jsonld-about-breadcrumb" data={breadcrumbJsonLd} />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#A70909] to-[#800000] px-4 pb-24 pt-32 sm:pb-32 lg:px-8">
                <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[url('/mesh.svg')] opacity-20 bg-cover bg-center mix-blend-overlay" />

                {/* Breadcrumb Navigation - Absolute top left */}
                <div className="absolute top-0 left-0 w-full z-10 mx-auto max-w-7xl px-4 py-6 lg:px-8">
                    <Breadcrumbs
                        homeLabel={tBreadcrumbs("home", { fallback: "Home" })}
                        items={[
                            { label: tAbout('breadcrumb', { fallback: "About Us" }), href: `/${locale}/about` }
                        ]}
                        className="[&_ol]:!text-white/80 [&_.text-gray-900]:!text-white [&_.text-gray-500]:!text-white/80 [&_.text-gray-400]:!text-white/60 [&_a:hover]:!text-white transition-colors"
                    />
                </div>

                <FadeUp delay={0.1} className="relative mx-auto max-w-4xl text-center mt-8 px-2">
                    <h1 className={`${locale === 'ta' ? 'text-[clamp(1.7rem,1rem+3vw,3rem)] tracking-tight' : 'text-[clamp(2.2rem,1.5rem+3vw,4rem)] tracking-[0.02em]'} font-extrabold text-white !leading-tight ${isJA ? 'break-keep' : ''} ${headerTypography}`}>
                        {tAbout.rich('hero.title', {
                            nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                            br: () => <br className="sm:hidden mt-[3px]" />
                        })}
                    </h1>
                    <p className={`mx-auto mt-6 text-[clamp(1.1rem,1rem+0.5vw,1.25rem)] text-white/90 max-w-2xl ${isJA ? 'break-keep [line-break:strict]' : ''} ${bodyTypography}`}>
                        {tAbout.rich('hero.subtitle', {
                            nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                            br: () => <br className="sm:hidden mt-[3px]" />
                        })}
                    </p>
                </FadeUp>
            </section>

            {/* Mission & Vision Section */}
            <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 py-20 lg:py-28 overflow-hidden">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <SlideIn direction="left" className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl border border-gray-100 bg-white">
                        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-300">
                            <span className="text-4xl text-gray-400 font-bold opacity-20 select-none">Virintira</span>
                        </div>
                    </SlideIn>
                    <SlideIn direction="right" delay={0.2} className="flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-balance break-words">
                            {tAbout('mission.heading')}
                        </h2>
                        <p className="text-left text-lg leading-relaxed text-gray-600 max-w-2xl indent-8 px-2 sm:px-0">
                            {tAbout('mission.description')}
                        </p>
                        <div className="h-1 w-20 bg-[#A70909] rounded-full mt-8" />
                    </SlideIn>
                </div>
            </section>

            {/* Our Story / Timeline Section */}
            <section className="bg-white py-20 border-y border-gray-100 shadow-sm">
                <FadeUp className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-8 text-center space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {tAbout('story.heading')}
                    </h2>
                    <div className="space-y-6 text-lg leading-relaxed text-gray-600 text-left max-w-3xl mx-auto p-8 lg:p-10 bg-gray-50 rounded-3xl border border-gray-100 px-6 sm:px-10">
                        {storyParagraphs.map((paragraph, index) => (
                            <p key={index} className="indent-8">{paragraph}</p>
                        ))}
                    </div>
                </FadeUp>
            </section>

            {/* Core Values Section */}
            <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 py-20 lg:py-28">
                <FadeUp className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {tAbout('values.heading')}
                    </h2>
                </FadeUp>
                <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {valuesItems.map((key) => {
                        const block = tAbout.raw(`values.items.${key}`) as Record<string, unknown>;
                        if (!block) return null;
                        return (
                            <StaggerItem key={key} className="h-full">
                                <div
                                    className="group relative flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-[#A70909]/10 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F5] transition-colors group-hover:bg-[#FFF0F0]">
                                        {valueIcons[key]}
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                                        {getEnsureString(block.title)}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">
                                        {getEnsureString(block.description)}
                                    </p>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </section>

            {/* Final CTA */}
            <section className="bg-[#FFF5F5] py-20 text-center border-t border-[#A70909]/10">
                <FadeUp className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-8">
                    <h2 className={`text-3xl font-bold tracking-tight text-[#A70909] sm:text-4xl ${isJA ? 'break-keep' : ''} ${headerTypography}`}>
                        {tAbout.rich('cta.heading', {
                            nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                            br: () => <br className="sm:hidden mt-[3px]" />
                        })}
                    </h2>
                    <p className={`mx-auto mt-4 mb-10 text-lg text-gray-700 max-w-2xl ${isJA ? 'break-keep [line-break:strict]' : ''} ${bodyTypography}`}>
                        {tAbout.rich('cta.description', {
                            nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                            br: () => <br className="sm:hidden mt-[3px]" />
                        })}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <AboutCtaButton triggerLabel={tLayout('cta.trigger')} />
                    </div>
                </FadeUp>
            </section>
        </div>
    );
}
