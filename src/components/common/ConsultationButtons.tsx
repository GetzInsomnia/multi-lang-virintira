'use client';

import { useLocale } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLine, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { COMPANY } from '@/data/company';
import CTAReveal from '@/components/common/CTAReveal';

interface ConsultationButtonsProps {
    triggerLabel: string;
    chatLabel: string;
    whatsappLabel: string;
    emailLabel?: string;
    phoneAriaLabel: string;
    variant?: 'default' | 'on-red';
}

export function ConsultationButtons({
    triggerLabel,
    chatLabel,
    whatsappLabel,
    emailLabel,
    phoneAriaLabel,
    variant = 'default',
}: ConsultationButtonsProps) {
    const locale = useLocale();
    const isThai = locale === 'th';
    const phoneHref = isThai ? 'tel:0928825556' : 'tel:+66928825556';
    const phoneText = isThai ? '092 882 5556' : '+669 2882 5556';

    const needsWideCtas = locale === 'ta';

    // Base group class logic from HeroSection
    const baseGroupClass = needsWideCtas
        ? 'grid grid-cols-1 lg:grid-cols-2 w-fit mx-auto max-w-[95vw]'
        : 'grid grid-cols-1 sm:grid-cols-2 w-fit mx-auto max-w-[95vw]';

    // Hero content uses max-w-[min(94vw,48rem)]. 
    // We can default to this or allow override, but for now strict match to hero.
    const heroMaxWidth = needsWideCtas ? 'max-w-[min(94vw,64rem)]' : 'max-w-[min(94vw,48rem)]';

    const groupClassName = baseGroupClass;

    const btnLayoutClass = 'w-full sm:flex-1 sm:w-[calc(50%-0.6rem)] sm:flex-none min-w-[min(220px,calc(100vw-4rem))]';

    const commonBtnClass = `inline-flex ${btnLayoutClass} items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white gap-3`;

    // Variant Styles
    const isRed = variant === 'on-red';

    // Phone: Default = Red, Red = White
    const phoneClass = isRed
        ? 'bg-white text-[#A70909] shadow-lg shadow-black/10 hover:bg-gray-50 focus-visible:ring-white'
        : 'bg-[#A70909] text-white shadow-lg shadow-[#a70909]/30 hover:bg-[#8c0808] focus-visible:ring-[#A70909]';

    // Chat Apps: Add white border on Red bg to separate
    const chatBorder = isRed ? 'border-2 border-white/20' : '';

    // Email: Default = White/Red, Red = Transparent/White
    const emailClass = isRed
        ? 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 focus-visible:ring-white'
        : 'border border-[#A70909]/50 bg-white text-[#A70909] shadow-sm hover:bg-[#fff1f1] focus-visible:ring-[#A70909]';


    return (
        <CTAReveal
            triggerLabel={triggerLabel}
            className={
                needsWideCtas
                    ? `flex w-full justify-center ${heroMaxWidth}`
                    : 'flex justify-center'
            }
            groupClassName={groupClassName}
            variant={variant}
        >
            <a
                href={phoneHref}
                aria-label={phoneAriaLabel}
                className={`${commonBtnClass} ${phoneClass}`}
            >
                <span className="grid h-6 w-6 place-items-center">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 shrink-0 scale-[1.45]" aria-hidden />
                </span>
                <span className="whitespace-nowrap leading-none text-[clamp(0.95rem,0.88rem+0.25vw,1rem)]">{phoneText}</span>
            </a>
            <a
                href={COMPANY.socials.line}
                target="_blank"
                rel="noopener noreferrer"
                className={`${commonBtnClass} bg-[#06C755] text-white shadow-lg shadow-[#06c755]/20 hover:brightness-110 focus-visible:ring-[#06C755] ${chatBorder}`}
            >
                <span className="grid h-6 w-6 place-items-center">
                    <FontAwesomeIcon
                        icon={faLine}
                        className="h-4 w-4 shrink-0 scale-[1.85] -translate-y-[0.5px]"
                        aria-hidden
                    />
                </span>
                <span className="whitespace-nowrap leading-none text-[clamp(0.95rem,0.88rem+0.25vw,1rem)]">{chatLabel}</span>
            </a>
            <a
                href={COMPANY.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${commonBtnClass} bg-[#25D366] text-white shadow-lg shadow-[#25d366]/20 hover:brightness-110 focus-visible:ring-[#25D366] ${chatBorder}`}
            >
                <span className="grid h-6 w-6 place-items-center">
                    <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="h-4 w-4 shrink-0 scale-[1.6]"
                        aria-hidden
                    />
                </span>
                <span className="whitespace-nowrap leading-none text-[clamp(0.95rem,0.88rem+0.25vw,1rem)]">{whatsappLabel}</span>
            </a>
            {emailLabel ? (
                <a
                    href={`mailto:${COMPANY.email}`}
                    className={`${commonBtnClass} ${emailClass}`}
                >
                    <span className="grid h-6 w-6 place-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 shrink-0 scale-[1.45]" aria-hidden />
                    </span>
                    <span className="whitespace-nowrap leading-none text-[clamp(0.95rem,0.88rem+0.25vw,1rem)]">{emailLabel}</span>
                </a>
            ) : null}
        </CTAReveal>
    );
}
