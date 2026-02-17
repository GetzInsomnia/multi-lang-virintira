import { getTranslations } from 'next-intl/server';
import { ensureString, ensureStringArray } from '@/lib/data-sanitizers';
import { COMPANY } from '@/data/company';
import { buildPopularServicesForLocale } from '@/config/services';
import type { HeroContent } from '@/components/home/HeroSection';
import type { ServiceCardItem } from '@/components/home/PopularServices';
import type { ProcessStep } from '@/components/home/HowItWorksSection';

function ensureProcessSteps(value: unknown): ProcessStep[] {
    return Array.isArray(value)
        ? (value as Array<Record<string, unknown>>).map((item) => ({
            title: ensureString(item?.title),
            description: ensureString(item?.description),
        }))
        : [];
}

export type HomeData = {
    hero: HeroContent;
    about: {
        heading: string;
        paragraphs: string[];
        link: string;
        viewLicense: string;
    };
    services: {
        heading: string;
        items: ServiceCardItem[];
    };
    highlights: {
        heading: string;
        items: string[];
    };
    process: {
        heading: string;
        steps: ProcessStep[];
    };
    cta: {
        heading: string;
        description: string;
    };
    promotion: {
        heading: string;
        description: string;
        ctaLabel: string;
        ctaHref: string;
    };
    labels: {
        call: string;
        consult: string;
        chat: string;
        whatsapp: string;
        trigger: string;
        breadcrumbs: string;
        close: string;
    };
};

export async function getHomeData(locale: string): Promise<HomeData> {
    const tHome = await getTranslations({ locale, namespace: 'home' });
    const tLayout = await getTranslations({ locale, namespace: 'layout' });
    const tBreadcrumbs = await getTranslations({ locale, namespace: 'breadcrumbs' });
    const tPromotion = await getTranslations({ locale, namespace: 'promotion' });

    const tServices = await getTranslations({ locale, namespace: 'services' });
    const tContact = await getTranslations({ locale, namespace: 'contact' });

    const phoneDisplay = locale === 'th' ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn;
    const callLabel = tLayout('cta.call', { phone: phoneDisplay });
    const consultLabel = tLayout('cta.consult', { phone: phoneDisplay });
    const chatLabel = tLayout('cta.chat');
    const whatsappLabel = tLayout('cta.whatsapp');
    const triggerLabel = tLayout('cta.trigger');

    const heroRaw = (tHome.raw('hero') ?? {}) as Record<string, unknown>;
    const hero: HeroContent = {
        title: ensureString(heroRaw.title),
        subtitle: ensureString(heroRaw.subtitle),
        description: ensureString(heroRaw.description),
        primary: ensureString(heroRaw.primary),
        typewriter: ensureStringArray(heroRaw.typewriter),
        emailHeading: ensureString(heroRaw.emailHeading),
        emailButton: ensureString(consultLabel),
    };

    const aboutRaw = (tHome.raw('about') ?? {}) as Record<string, unknown>;
    const about = {
        heading: ensureString(aboutRaw.heading),
        paragraphs: ensureStringArray(aboutRaw.paragraphs),
        link: ensureString(aboutRaw.link),
        viewLicense: ensureString(aboutRaw.viewLicense),
    };

    const servicesRaw = (tHome.raw('services') ?? {}) as Record<string, unknown>;
    const services = {
        heading: ensureString(servicesRaw.heading),
        items: buildPopularServicesForLocale(locale, tServices),
    };

    const highlightsRaw = (tHome.raw('highlights') ?? {}) as Record<string, unknown>;
    const highlights = {
        heading: ensureString(highlightsRaw.heading),
        items: ensureStringArray(highlightsRaw.items),
    };

    const processRaw = (tHome.raw('process') ?? {}) as Record<string, unknown>;
    const process = {
        heading: ensureString(processRaw.heading),
        steps: ensureProcessSteps(processRaw.steps),
    };

    const ctaRaw = (tHome.raw('cta') ?? {}) as Record<string, unknown>;
    const cta = {
        heading: ensureString(ctaRaw.heading),
        description: ensureString(ctaRaw.description),
    };

    const promotion = {
        heading: ensureString(tPromotion.raw('hero.title')),
        description: ensureString(tPromotion.raw('hero.intro')),
        ctaLabel: ensureString(tPromotion.raw('cta')),
        ctaHref: '/promotion',
    };

    return {
        hero,
        about,
        services,
        highlights,
        process,
        cta,
        promotion,
        labels: {
            call: callLabel,
            consult: consultLabel,
            chat: chatLabel,
            whatsapp: whatsappLabel,
            trigger: triggerLabel,

            breadcrumbs: tBreadcrumbs('home'),
            close: tContact('close'),
        },
    };
}
