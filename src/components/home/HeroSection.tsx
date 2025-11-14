'use client';

import { COMPANY } from '@/data/company';
import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/common/TypewriterText'; // ← ใช้เวอร์ชันที่คุณเพิ่งปรับให้เหมือน legacy (พิมพ์เดินหน้า, font-normal)
import CTAReveal from '@/components/common/CTAReveal';
import { useLocale } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLine } from '@fortawesome/free-brands-svg-icons';

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  primary: string;
  typewriter: string[]; // จะใช้เฉพาะตัวแรกให้เป็นข้อความเดี่ยวเหมือน legacy
  emailHeading: string;
  emailButton: string;
};

export function HeroSection({
  content,
  chatLabel,
  triggerLabel,
}: {
  content: HeroContent;
  chatLabel: string;
  triggerLabel: string;
}) {
  // ให้ behavior แบบ legacy: ใช้ข้อความตัวแรกเท่านั้น
  const typewriterText = Array.isArray(content.typewriter) && content.typewriter.length > 0
    ? content.typewriter[0]
    : '';
  const locale = useLocale();
  const isLongLatin = ['de', 'nl'].includes(locale);
  const needsFullWidth = ['ta', 'ar', 'fa', 'he', 'de'].includes(locale);

  return (
    <section
      id="herosection"
      // minHeight ตาม legacy: 100dvh - header
      style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      className="relative min-h-[calc(100dvh-var(--header-height))] flex items-center justify-center text-center px-safe bg-[#FFFEFE] snap-start overflow-hidden"
    >
      {/* Background image (เหมือน legacy) */}
      <div
        className="absolute -top-[10px] inset-x-0 bottom-0 z-0 bg-[url('/bg-hero.webp')] bg-cover bg-center opacity-15"
        aria-hidden="true"
      />

      {/* Foreground content (โครง + motion เหมือน legacy) */}
      <div className="relative z-10 mx-auto max-w-[min(94vw,48rem)] space-y-6">
        {/* H1: ใช้ clamp ให้ได้สเกลใกล้เคียง text-4xl→lg:text-6xl */}
        <motion.h1
          className={[
            'font-bold leading-snug tracking-tight text-[#A70909]',
            'text-[clamp(1.9rem,1.5rem+2.2vw,3.4rem)]',
            'supports-[text-wrap:balance]:text-balance',
            'max-[414px]:text-balance',
            needsFullWidth ? 'sm:text-balance' : '',
          ].join(' ')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {(content.title ?? '').split('\n').map((line, i) => {
            const base = 'leading-tight';
            const desktopNoWrap = needsFullWidth
              ? 'sm:block'
              : 'sm:inline-block sm:whitespace-nowrap';
            const smallWrap = 'max-[480px]:whitespace-normal max-[480px]:text-center';
            const longLatinExtras = isLongLatin
              ? [
                  'max-[640px]:hyphens-auto',
                  'max-[414px]:break-words',
                  locale === 'de'
                    ? 'max-[480px]:break-all max-[480px]:[overflow-wrap:anywhere]'
                    : '',
                ]
                  .join(' ')
                  .trim()
              : '';
            return (
              <span
                key={i}
                className={['block', base, desktopNoWrap, smallWrap, longLatinExtras].join(' ').trim()}
              >
                {line}
              </span>
            );
          })}
        </motion.h1>

        {/* Typewriter: พฤติกรรม/หน้าตาเหมือน legacy (ตัวคอมโพเนนต์กำหนดสี/น้ำหนัก/เคอร์เซอร์แล้ว)
            ใช้ motion เหมือนเดิม */}
        {typewriterText ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* ตัว TypewriterText (เวอร์ชันที่ปรับแล้ว) จะเรนเดอร์เป็น <h2 class="text-lg lg:text-2xl font-normal text-[#A70909] ..."> */}
            <TypewriterText text={typewriterText} />
          </motion.div>
        ) : null}

        {/* รองรับ subtitle/description เดิมของ repo ใหม่ แต่ไม่บังคับ (legacy ไม่มี) */}
        {content.subtitle ? (
          <motion.p
            className="text-[clamp(1.05rem,0.98rem+0.4vw,1.35rem)] font-semibold text-[#8a1b1b]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
          >
            {content.subtitle}
          </motion.p>
        ) : null}

        {content.description ? (
          <motion.p
            className="text-[clamp(0.95rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-[#5d3f3f]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
          >
            {content.description}
          </motion.p>
        ) : null}

        {/* CTA block: จัดวางคล้าย legacy (ปุ่มอยู่บล็อกท้าย, มี motion เข้ามา) */}
        <motion.div
          className="pt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        >
          <HeroCTAButtons
            triggerLabel={triggerLabel}
            chatLabel={chatLabel}
            emailLabel={content.emailButton}
            phoneAriaLabel={content.primary}
          />
        </motion.div>

        {/* Email heading (ถ้ามี) */}
        {content.emailHeading ? (
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.35em] text-[#a70909]/70"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.7, ease: 'easeOut' }}
          >
            {content.emailHeading}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}

function HeroCTAButtons({
  triggerLabel,
  chatLabel,
  emailLabel,
  phoneAriaLabel,
}: {
  triggerLabel: string;
  chatLabel: string;
  emailLabel?: string;
  phoneAriaLabel: string;
}) {
  const locale = useLocale();
  const isThai = locale === 'th';
  const phoneHref = isThai ? 'tel:0928825556' : 'tel:+66928825556';
  const phoneText = isThai ? '092 882 5556' : '+669 2882 5556';

  return (
    <CTAReveal
      triggerLabel={triggerLabel}
      className="flex justify-center"
      groupClassName="flex-col sm:flex-row sm:items-stretch w-full max-w-[min(26rem,100%)]"
    >
      <a
        href={phoneHref}
        aria-label={phoneAriaLabel}
        className="inline-flex w-full sm:flex-1 min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full bg-[#A70909] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#a70909]/30 transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none will-change-transform hover:bg-[#8c0808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white gap-3"
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
        className="inline-flex w-full sm:flex-1 min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full bg-[#06C755] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#06c755]/20 transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none will-change-transform hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 focus-visible:ring-offset-white gap-3"
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
      {emailLabel ? (
        <a
          href={`mailto:${COMPANY.email}`}
          className="inline-flex w-full sm:flex-1 min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full border border-[#A70909]/50 bg-white px-8 py-3 text-base font-semibold text-[#A70909] shadow-sm transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transform-none will-change-transform hover:bg-[#fff1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white gap-3"
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
