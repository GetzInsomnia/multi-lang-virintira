"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLine, faWhatsapp, faTiktok, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { COMPANY } from "@/data/company";
import ContactForm from "./ContactForm";

interface ContactContentProps {
    isDrawer?: boolean;
}

export default function ContactContent({ isDrawer = false }: ContactContentProps) {
    const t = useTranslations('contact.channels');
    const tFormSection = useTranslations('contact.formSection');
    const locale = useLocale();
    const isThai = locale === 'th';
    const phoneDisplay = isThai ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn;

    const tHero = useTranslations('contact.hero');

    // Smoother animation config: Slide Up
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 100 }, // Start effectively invisible and lower
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.8
            } as any
        }
    };

    // Contact Channels Data - Reordered: Phone, Line, WA, TikTok, FB, Email
    const channels = [
        {
            id: 'phone',
            label: t('phone.label'),
            subLabel: t('phone.subLabel'),
            action: phoneDisplay,
            href: `tel:${COMPANY.phone}`,
            icon: faPhone,
            color: 'text-virintira-primary',
            bg: 'bg-virintira-primary',
            border: 'border-red-50',
            shadow: 'shadow-[0_8px_30px_rgb(167,9,9,0.15)]', // Custom stronger shadow
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(167,9,9,0.3)]',
            bgHover: 'group-hover:bg-[#8F0808]',
            iconSize: 'h-8 w-8',
        },
        {
            id: 'line',
            label: t('line.label'),
            subLabel: t('line.subLabel'),
            action: t('line.action'),
            href: COMPANY.socials.line,
            icon: faLine,
            color: 'text-[#06C755]',
            bg: 'bg-[#06C755]',
            border: 'border-green-100',
            shadow: 'shadow-[0_8px_30px_rgb(6,199,85,0.15)]',
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(6,199,85,0.3)]',
            bgHover: 'group-hover:bg-[#05b34c]',
            iconSize: 'h-10 w-10',
        },
        {
            id: 'whatsapp',
            label: t('whatsapp.label'),
            subLabel: t('whatsapp.subLabel'),
            action: t('whatsapp.action'),
            href: COMPANY.socials.whatsapp,
            icon: faWhatsapp,
            color: 'text-[#25D366]',
            bg: 'bg-[#25D366]',
            border: 'border-emerald-100',
            shadow: 'shadow-[0_8px_30px_rgb(37,211,102,0.15)]',
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(37,211,102,0.3)]',
            bgHover: 'group-hover:bg-[#20bd5a]',
            iconSize: 'h-10 w-10',
        },
        {
            id: 'tiktok',
            label: t('tiktok.label'),
            subLabel: t('tiktok.subLabel'),
            action: t('tiktok.action'),
            href: COMPANY.socials.tiktok,
            icon: faTiktok,
            color: 'text-black',
            bg: 'bg-black',
            border: 'border-gray-100',
            shadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.15)]',
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]',
            bgHover: 'group-hover:bg-gray-800',
            iconSize: 'h-8 w-8',
        },
        {
            id: 'facebook',
            label: t('facebook.label'),
            subLabel: t('facebook.subLabel'),
            action: t('facebook.action'),
            href: COMPANY.socials.facebook,
            icon: faFacebook,
            color: 'text-[#1877F2]',
            bg: 'bg-[#1877F2]',
            border: 'border-blue-100',
            shadow: 'shadow-[0_8px_30px_rgb(24,119,242,0.15)]',
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(24,119,242,0.3)]',
            bgHover: 'group-hover:bg-[#166fe5]',
            iconSize: 'h-10 w-10',
        },
        {
            id: 'email',
            label: t('email.label'),
            subLabel: t('email.subLabel'),
            action: t('email.action'),
            href: `mailto:${COMPANY.email}`,
            icon: faEnvelope,
            color: 'text-slate-600',
            bg: 'bg-slate-600',
            border: 'border-slate-100',
            shadow: 'shadow-[0_8px_30px_rgb(71,85,105,0.15)]',
            hoverShadow: 'hover:shadow-[0_8px_30px_rgb(71,85,105,0.3)]',
            bgHover: 'group-hover:bg-slate-700',
            iconSize: 'h-8 w-8',
        },
    ];

    return (
        <div className={`${isDrawer ? 'min-h-full' : 'min-h-screen'} bg-slate-50 ${isDrawer ? 'pt-8' : 'pt-[var(--header-height)]'}`}>
            {/* Hero Heading */}
            <section className={`relative px-4 text-center ${isDrawer ? 'py-8' : 'pt-16 pb-12 md:pb-16 md:pt-24'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="container mx-auto max-w-4xl"
                >
                    <h1 className={`font-bold tracking-tight text-slate-900 leading-[1.15] md:leading-tight text-balance ${isDrawer ? 'mb-3 text-3xl' : 'mb-6 text-4xl sm:text-5xl md:text-6xl'}`}>
                        {tHero.rich('title', {
                            highlight: (chunks) => <span className="text-virintira-primary">{chunks}</span>
                        })}
                    </h1>
                    <p className={`mx-auto max-w-2xl text-slate-600 ${isDrawer ? 'text-base' : 'text-lg md:text-xl'}`}>
                        {tHero('subtitle')}
                    </p>
                </motion.div>
            </section>

            {/* 6 Grid Channels */}
            <section className="container mx-auto px-4 pb-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                >
                    {channels.map((channel) => (
                        <motion.a
                            key={channel.id}
                            variants={item}
                            whileHover={{ y: -8 }}
                            href={channel.href}
                            target={channel.id === 'phone' || channel.id === 'email' ? undefined : "_blank"}
                            rel={channel.id === 'phone' || channel.id === 'email' ? undefined : "noopener noreferrer"}
                            className={`group relative flex flex-col items-center justify-center rounded-[32px] border bg-white p-8 text-center transition-colors duration-300 hover:shadow-2xl ${channel.border} ${channel.shadow} ${channel.hoverShadow}`}
                        >
                            <div className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-110 ${channel.color}`}>
                                <FontAwesomeIcon icon={channel.icon} className={channel.iconSize} />
                            </div>
                            <h3 className="mb-1 text-xl font-bold text-slate-900">{channel.label}</h3>
                            <p className="mb-6 text-sm text-slate-500">{channel.subLabel}</p>

                            {/* Standardized Capsule Button for ALL cards */}
                            <span className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors shadow-sm ${channel.bg} ${channel.bgHover}`}>
                                {channel.action}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </section>

            {/* Contact Form Section (Replaces Map) */}
            <section className="relative w-full bg-slate-100 pb-24 pt-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl font-bold text-[#A70909] mb-4">{tFormSection('heading')}</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            {tFormSection('subheading')}
                        </p>
                    </motion.div>

                    <ContactForm />
                </div>
            </section>
        </div>
    );
}
