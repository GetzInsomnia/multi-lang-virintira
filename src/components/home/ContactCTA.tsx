'use client';

import { COMPANY } from '@/data/company';
import { ConsultationButtons } from '@/components/common/ConsultationButtons';
import { useLocale } from 'next-intl';
import { motion, LayoutGroup } from 'framer-motion';

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
  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#A70909] px-safe py-24"
    >
      {/* Premium Dark Gradient & Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,#A70909,#5d0505)]" />

      {/* 
        Connector Cap (Round 9 Fix): 
        Forces the top edge to be SOLID Flat #A70909 to match the Promotion section above.
        The base gradient (to_bottom_right) causes the right side to be darker, creating a seam.
        This transition fixes it.
      */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#A70909] via-[#A70909] to-transparent z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
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
                <motion.h2 layout="position" className="text-[clamp(2.5rem,2rem+2.5vw,4rem)] font-bold text-white leading-tight drop-shadow-md">
                  {heading}
                </motion.h2>
              ) : null}
              {description ? (
                <motion.p layout="position" className="max-w-2xl mx-auto text-[clamp(1.1rem,1rem+0.5vw,1.3rem)] leading-relaxed text-white/80 font-medium">
                  {description}
                </motion.p>
              ) : null}
            </motion.div>

            <motion.div layout className="w-full">
              <ConsultationButtons
                triggerLabel={triggerLabel}
                chatLabel={chatLabel}
                whatsappLabel={whatsappLabel}
                emailLabel={emailLabel}
                phoneAriaLabel={callLabel}
                variant="on-red"
              />
            </motion.div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
