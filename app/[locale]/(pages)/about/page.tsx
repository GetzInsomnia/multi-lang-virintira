import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { COMPANY } from '@/data/company';
import { ShieldCheck, Zap, Handshake } from 'lucide-react';
import Image from 'next/image';
import { absoluteUrl } from '@/config/site';
import { buildLocaleAlternates } from '@/lib/metadata';
import { parseCardString } from '@/lib/utils';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/seo/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FadeUp } from '@/components/ui/FadeUp';
import { SlideIn } from '@/components/ui/SlideIn';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import AboutCtaButton from './AboutCtaButton';
import CoreValues from '@/components/sections/about/CoreValues';
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
        ? `break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-fit mx-auto text-center`
        : 'text-balance break-words [overflow-wrap:anywhere]';

    const bodyTypography = isCJK
        ? `break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-fit mx-auto text-center`
        : 'text-balance break-words [overflow-wrap:anywhere]';


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
                    <SlideIn direction="left" className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl border border-gray-100 md:order-last lg:order-first bg-gray-50">
                        {/* Fallback Placeholder (Behind Image) */}
                        <div className="absolute inset-0 flex h-full w-full items-center justify-center text-gray-300 z-0">
                            <span className="text-4xl text-gray-400 font-bold opacity-20 select-none">Virintira</span>
                        </div>
                        {/* Target Image */}
                        <Image
                            src="/about/our-mission.webp"
                            alt="Virintira Mission"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover relative z-10"
                        />
                    </SlideIn>
                    <SlideIn direction="right" delay={0.2} className="flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-balance break-words">
                            {tAbout('mission.heading')}
                        </h2>
                        <div className="space-y-4 text-left text-lg leading-relaxed text-gray-600 max-w-2xl px-2 sm:px-0">
                            <p className="indent-8">{tAbout('mission.p1')}</p>
                            <p className="indent-8">{tAbout('mission.p2')}</p>
                        </div>
                        <div className="h-1 w-20 bg-[#A70909] rounded-full mt-8" />
                    </SlideIn>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="bg-white py-24 sm:py-32 border-y border-gray-100 relative overflow-hidden">
                {/* Decorative background radial blur */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#A70909]/5 blur-[100px] pointer-events-none" />

                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 relative z-10">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:items-center">
                        <SlideIn direction="left" className="lg:col-span-5 relative">
                            <div className="relative p-8 sm:p-12 text-center">
                                <span className="absolute top-0 left-0 text-9xl text-[#A70909]/10 font-serif leading-none select-none">"</span>
                                <h2 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl italic font-bold tracking-tight text-gray-900 text-balance mt-4">
                                    {tAbout('story.heading')}
                                </h2>
                                <div className="h-1.5 w-16 bg-[#A70909] rounded-full mt-6 mx-auto relative z-10" />
                            </div>
                        </SlideIn>
                        <SlideIn direction="right" delay={0.2} className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-gray-600">
                            <p className="indent-8">{tAbout('story.p1')}</p>
                            <p className="indent-8">{tAbout('story.p2')}</p>
                            <p className="indent-8">{tAbout('story.p3')}</p>
                        </SlideIn>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8 py-24 sm:py-32">
                <FadeUp className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {tAbout('coreValues.heading')}
                    </h2>
                </FadeUp>
                <CoreValues cards={['card1', 'card2', 'card3', 'card4'].map(k => parseCardString(tAbout(`coreValues.${k}`)))} />
            </section>

            {/* Service Policies Section */}
            <section className="bg-gray-50 py-24 sm:py-32 border-y border-gray-100 shadow-sm overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-8">
                    <FadeUp className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {tAbout('policies.heading')}
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600">
                            {tAbout('policies.subHeader')}
                        </p>
                    </FadeUp>
                    <StaggerContainer className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
                        {['card1', 'card2', 'card3'].map((key, i) => {
                            const parsed = parseCardString(tAbout(`policies.${key}`));
                            const cardShadows = [
                                "shadow-[0_8px_30px_rgb(59,130,246,0.30)] ring-1 hover:shadow-[0_12px_40px_rgb(59,130,246,0.40)] ring-blue-500/10 transition-shadow duration-300", // Blue
                                "shadow-[0_8px_30px_rgb(16,185,129,0.30)] ring-1 hover:shadow-[0_12px_40px_rgb(16,185,129,0.40)] ring-emerald-500/10 transition-shadow duration-300", // Green
                                "shadow-[0_8px_30px_rgb(99,102,241,0.30)] ring-1 hover:shadow-[0_12px_40px_rgb(99,102,241,0.40)] ring-indigo-500/10 transition-shadow duration-300", // Indigo
                            ];
                            return (
                                <StaggerItem key={key} className="h-full">
                                    <div className={`relative flex h-full flex-col rounded-2xl bg-white p-8 border border-gray-100/50 ${cardShadows[i]}`}>
                                        <div className="absolute top-0 right-0 -mr-4 -mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#A70909] text-white font-bold text-lg pointer-events-none select-none shadow-md">
                                            {i + 1}
                                        </div>
                                        <h3 className="mb-4 text-xl font-bold text-[#A70909] pr-4">
                                            {parsed.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed flex-grow">
                                            {parsed.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            {/* Ethics and Privacy Section */}
            <section className="relative overflow-hidden py-24 sm:py-32 bg-gray-50 border-t border-gray-100 flex items-center justify-center min-h-[500px]">
                {/* Giant watermark icon */}
                <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 pointer-events-none select-none flex items-center justify-center z-0">
                    <ShieldCheck className="h-full w-auto text-[#A70909] opacity-25 blur-md" strokeWidth={1.5} />
                </div>

                <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-8 text-center relative z-10 w-full">
                    <FadeUp>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
                            {tAbout('ethics.heading')}
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-gray-600 text-left px-4 sm:px-12 drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                            <p className="indent-8">{tAbout('ethics.p1')}</p>
                            <p className="indent-8">{tAbout('ethics.p2')}</p>
                        </div>
                    </FadeUp>
                </div>
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
