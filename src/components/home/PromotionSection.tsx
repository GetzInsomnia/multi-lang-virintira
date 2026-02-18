"use client";

import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

// Helper to normalize internal hrefs by ensuring they start with '/'
function normalizeInternalHref(href: string) {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("/")) {
    return href;
  }
  return `/${href}`;
}

// Helper to get locale-specific styles (Constraint C)
function getTypographyStyles(locale: string) {
  // Fix #3 (P1): Complete locale-aware typography for ALL CJK + Indic
  const isCJK = ['ja', 'ko', 'zh-Hans', 'zh-Hant'].includes(locale);
  const isIndic = ['hi', 'ta'].includes(locale);

  return {
    heading: {
      // Constraint A: readable measure
      maxWidth: '22ch',
      // Constraint C: script-aware rules
      // Fix #5 (Regression): 'keep-all' causes overflow in JA on small screens. 
      // Revert to 'normal' (default CJK line breaking) to ensure text wraps within container.
      wordBreak: 'normal',
      lineBreak: isCJK ? 'strict' : undefined,
      lineHeight: isIndic ? '1.3' : undefined,
      // Fix #4 (Mobile Refinement): 'balance' causes bad breaks on hyphens. Use 'pretty'.
      textWrap: isCJK ? 'wrap' : 'pretty',
    } as React.CSSProperties,
    description: {
      maxWidth: '60ch',
      // Fix #4: Consistent wrapping
      textWrap: 'pretty',
    } as React.CSSProperties,
  };
}

export function PromotionSection({
  locale,
  heading,
  description,
  ctaLabel,
  ctaHref,
  badge,
  complimentary,
}: {
  locale: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  badge: string;
  complimentary: string;
}) {
  const styles = getTypographyStyles(locale);

  return (
    <section
      id="promotion"
      lang={locale}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-24"
    >
      {/* 
        Background Strategy: Unchanged visually, but sets the stage.
      */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, #fff4f4 0%, #fff4f4 40%, #A70909 100%)' }}
      >
        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: 'radial-gradient(#A70909 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {/* Glass Card with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-[42px] border border-white/60 bg-white/90 shadow-[0_30px_80px_rgba(167,9,9,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_40px_100px_rgba(167,9,9,0.12)] hover:bg-white/95"
        >

          {/* Visual Depth: Abstract 3D/Blur Elements behind Glass */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px] transition-transform duration-700 group-hover:scale-110" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-red-600/10 blur-[100px] transition-transform duration-700 group-hover:scale-110" />

          {/* Optional: Subtle Radial Highlight (Constraint D - purely for balance) */}
          <div className="pointer-events-none absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[120px]" />

          <div className="flex flex-col items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-20">
            {/* 
              Fix #1 (P0): TRUE centered content column 
            */}
            <div className="flex w-full max-w-5xl flex-col items-center gap-8 sm:gap-10 text-center relative z-10">

              {/* 
                LAYOUT SPEC A: Top meta row (Badge + Complimentary) 
                - Fix #1 (P0): Premium Desktop Meta Row Spacing
              */}
              <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-4 sm:gap-y-4 sm:gap-x-6 lg:gap-x-12 xl:gap-x-14">
                {/* Badge */}
                <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#A70909] via-[#ff4e50] to-[#A70909] bg-[length:200%_auto] px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-red-900/20 animate-shimmer-gradient shrink-0">
                  <span>
                    <FontAwesomeIcon icon={faFire} className="h-3 w-3 text-yellow-300 drop-shadow-sm" />
                  </span>
                  {badge}
                </span>

                {/* Complimentary Text */}
                {/* Fix #3 (Final Polish): CONSTAINED FLEX CENTERING.
                    - Problem: Full-width Flexbox centering looks "left heavy" for long text. Absolute positioning caused overflow.
                    - Solution: Use standard Flexbox (`justify-center`) BUT constrain the width (`max-w-[85%]`).
                    - This forces the block to remain visually compact and centered in the screen, even if text wraps.
                    - `text-balance` helps equalize line lengths within this constrained block.
                */}
                {/* Complimentary Text */}
                {/* Fix #3 (Final Research): INLINE-FLEX CENTER + TEXT BALANCE.
                    - Research Conclusion: To center a left-aligned block with an icon, the standard is `inline-flex` inside `text-center`.
                    - The "Left Heavy" look is caused by ragged wrapping lines.
                    - SOLUTION: Add explicit `style={{ textWrap: 'balance' }}` to force the browser to balance line lengths.
                    - This ensures the text block is symmetrical, eliminating the visual weight shift.
                */}
                <div className="text-center sm:text-left mx-auto sm:mx-0">
                  <div className="inline-flex items-center justify-center gap-3 text-[#A70909] font-bold text-sm tracking-wide transition-transform duration-300 origin-center group-hover:scale-105 text-left">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#A70909]/10 shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current stroke-current stroke-[1.5]" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <span className="break-words leading-tight" style={{ textWrap: 'balance' }}>{complimentary}</span>
                  </div>
                </div>
              </div>

              {/* LAYOUT SPEC B: Main text block centered */}
              <div className="space-y-6 w-full flex flex-col items-center">
                {heading ? (
                  <h2
                    // Fix #1 (Round 3): Relaxed line-height (leading-snug/tight) for better readability.
                    // Fix #2 (Round 3): Added 'mx-auto' and 'w-full' to ensure centering on tablet when text wraps or max-w kicks in.
                    className="mx-auto w-full text-3xl sm:text-4xl lg:text-[clamp(2.5rem,2rem+2.5vw,5rem)] font-extrabold leading-snug sm:leading-tight lg:leading-tight text-[#2d1f1f] drop-shadow-sm whitespace-pre-line text-center"
                    style={styles.heading}
                  >
                    {heading}
                  </h2>
                ) : null}

                {description ? (
                  <p
                    className="mx-auto text-lg sm:text-xl leading-relaxed text-[#5d3f3f]/90 font-medium text-center"
                    style={styles.description}
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              {/* LAYOUT SPEC C: Bottom action area: CTA centered */}
              <div className="pt-2 w-full flex justify-center">
                {/* Button Container with enhanced Glow */}
                <div className="relative group/btn inline-flex w-full sm:w-auto justify-center">
                  {/* Enhanced Glow Effect */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-30 blur-xl transition-opacity duration-500 group-hover/btn:opacity-60 hidden sm:block animate-pulse-slow" />

                  <Link
                    href={normalizeInternalHref(ctaHref)}
                    // Fix #4 (Round 3): Standardized button sizing.
                    // Mobile: px-6 py-3.5 (standard large touch target)
                    // Desktop: px-8 py-4 (standard large button, consistent with hero/primary actions)
                    className="relative inline-flex w-full max-w-sm sm:max-w-none items-center justify-center rounded-3xl sm:rounded-full bg-[#A70909] px-6 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#900000] hover:shadow-red-900/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A70909]/30 sm:w-auto overflow-hidden"
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />

                    <span className="relative z-10 tracking-wide whitespace-normal text-center sm:whitespace-nowrap leading-tight">{ctaLabel}</span>
                    <ChevronRight className="relative z-10 ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 stroke-[3px] transition-transform duration-300 group-hover/btn:translate-x-1 shrink-0" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
