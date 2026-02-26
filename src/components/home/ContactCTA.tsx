'use client';

import { COMPANY } from '@/data/company';
// Removed Link import as we use window events now
import { useLocale, useTranslations } from 'next-intl';
import { motion, LayoutGroup } from 'framer-motion';
import { useUI } from '@/context/UIContext';

export function ContactCTA({
  heading,
  description,
  callLabel,
  chatLabel,
  whatsappLabel,
  emailLabel,
  triggerLabel
}: {
  heading: string;
  description: string;
  callLabel: string;
  chatLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  triggerLabel: string
}) {
  const { openContactDrawer } = useUI();
  const locale = useLocale();
  const tHome = useTranslations('home');
  const isCJK = ['ja', 'ko', 'zh-Hans', 'zh-Hant'].includes(locale);

  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] md:min-h-[550px] xl:min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#A70909] px-safe py-24 md:py-32 lg:py-36 xl:py-24"
    >
      {/* Premium Dark Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#A70909_0%,#A70909_15%,#5d0505_100%)] z-0" />

      {/* Decorative Dots Pattern (Masked at top to transition smoothly) */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 10%, black 25%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* LayoutGroup ensures shared layout animations between components */}
        <LayoutGroup>
          <motion.div
            layout
            className="flex flex-col items-center gap-10 px-4"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div layout className="space-y-6">
              {heading ? (
                <motion.h2 layout="position" className={[
                  "font-bold text-white leading-tight drop-shadow-md",
                  isCJK
                    ? 'w-fit mx-auto text-center text-[clamp(2rem,1.5rem+3vw,4rem)]'
                    : 'text-[clamp(2.5rem,2rem+2.5vw,4rem)]'
                ].join(' ').trim()}>
                  {isCJK ? tHome.rich('cta.heading', {
                    nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                    br: () => <br className="sm:hidden mt-[3px]" />
                  }) : heading}
                </motion.h2>
              ) : null}
              {description ? (
                <motion.p layout="position" className="max-w-2xl mx-auto text-[clamp(1.1rem,1rem+0.5vw,1.3rem)] leading-relaxed text-white/80 font-medium">
                  {description}
                </motion.p>
              ) : null}
            </motion.div>

            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={openContactDrawer}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#A70909] shadow-xl shadow-black/10 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#f9f9f9] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                {triggerLabel}
              </button>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
