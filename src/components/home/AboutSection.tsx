'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { FiZoomIn, FiZoomOut, FiX } from 'react-icons/fi';
import BorderRevealButton from '../BorderRevealButton';
import { COMPANY } from '@/data/company';
import { useTranslations, useLocale } from 'next-intl';

export function AboutSection({ heading, paragraphs, linkLabel, viewLicenseLabel, closeLabel }: { heading: string; paragraphs: string[]; linkLabel: string; viewLicenseLabel: string; closeLabel: string }) {
  const locale = useLocale();
  const tHome = useTranslations('home');
  const isCJK = ['ja', 'ko', 'zh-Hans', 'zh-Hant'].includes(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const details: string[] = Array.isArray(paragraphs) ? paragraphs : [];
  const prefersReducedMotion = useReducedMotion();

  // Scroll Lock & Esc Key Listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      setScale(1); // Reset zoom on close
    }
  }, [isOpen]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] md:min-h-[550px] xl:min-h-[calc(100dvh-var(--header-height))] snap-start items-center justify-center bg-[#FFFEFE] px-4 py-24 lg:py-12 overflow-x-clip"
    >
      <div className="mx-auto mt-6 flex w-full max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
        {/* Left (Text Content) */}
        <motion.div
          className="w-full px-2 md:w-10/12 md:px-0 lg:w-1/2 lg:px-2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {heading && (
            <blockquote
              className={['mb-6 border-l-4 border-[#A70909] pl-4 text-xl font-semibold leading-relaxed text-[#A70909] lg:text-3xl', isCJK ? 'w-fit' : ''].join(' ').trim()}
              style={{ textWrap: isCJK ? 'wrap' : 'balance' }}
            >
              {isCJK ? tHome.rich('about.heading', {
                nw: (chunks) => <span className="whitespace-nowrap inline-block">{chunks}</span>,
                br: () => <br className="sm:hidden mt-[3px]" />
              }) : heading}
            </blockquote>
          )}

          <div className="space-y-6 text-base leading-relaxed text-gray-800 lg:text-lg">
            {details.map((paragraph, index) => (
              <p key={index} className="indent-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex justify-center pt-10">
            <motion.div
              animate={prefersReducedMotion ? { y: 0 } : { y: [0, -2, 0] }}
              transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            >
              <BorderRevealButton
                href="/about"
                section="Homepage"
                item="About"
              >
                <span className="text-sm lg:text-base">{linkLabel}</span>
              </BorderRevealButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Right (Image) */}
        <motion.div
          className="flex w-full justify-center px-2 md:w-10/12 md:px-0 lg:w-1/2 lg:px-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* 
            Image Wrapper
            - Changed to <button> for keyboard accessibility (A11y)
            - Added 'z-0' to create a local stacking context. 
            - Limits max-width on desktop to balance height with text column
          */}
          <button
            type="button"
            className="group relative cursor-pointer w-full max-w-[500px] lg:max-w-[460px] xl:max-w-[500px] z-0 mx-auto block focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A70909]/50 rounded-[16px]"
            onClick={() => setIsOpen(true)}
            aria-label={viewLicenseLabel}
          >
            {/* Rainbow Glow Pseudo-element (Behind) */}
            <div className="absolute inset-0 -z-10 rounded-[16px] bg-gradient-to-r from-red-600 via-yellow-500 via-green-600 via-blue-700 to-purple-800 opacity-60 blur-lg transition-opacity duration-500 md:group-hover:opacity-100 md:opacity-40" />

            {/* Inner Frame (Clips the zoomed image) */}
            <div className="relative overflow-hidden rounded-xl ring-1 ring-black/5 transition-transform duration-500 md:group-hover:scale-[1.01] aspect-[3/4] bg-gray-50">
              <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 md:group-hover:bg-black/5 pointer-events-none" />

              <Image
                src="/about/company-license.webp"
                alt="Virintira Company License"
                width={600}
                height={800}
                className="h-full w-full object-cover object-top scale-110 relative z-0"
              />

              {/* View License Tag - Always visible on mobile & tablet, hover on desktop */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-100 xl:opacity-0 transition-opacity duration-300 xl:group-hover:opacity-100 xl:group-focus:opacity-100">
                <span className="flex items-center justify-center gap-2 rounded-full bg-white/95 px-4 sm:px-5 py-2.5 text-[0.8rem] sm:text-sm font-bold text-[#A70909] shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:shadow-2xl max-w-[90%] text-center leading-tight">
                  <FiZoomIn className="text-lg shrink-0" />
                  <span>{viewLicenseLabel}</span>
                </span>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label={viewLicenseLabel}
            >
              <div className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center">
                {/* Image Container */}
                <div className="relative flex flex-1 items-center justify-center w-full overflow-hidden">
                  <motion.img
                    src="/about/company-license.webp"
                    alt="Virintira Company License Fullscreen"
                    className="max-h-[80vh] w-auto rounded object-contain shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: scale, x: scale === 1 ? 0 : undefined, y: scale === 1 ? 0 : undefined, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    drag={scale > 1}
                    dragConstraints={{ left: -scale * 300, right: scale * 300, top: -scale * 300, bottom: scale * 300 }}
                    dragElastic={0.1}
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: scale > 1 ? 'grab' : 'default' }}
                    whileTap={{ cursor: scale > 1 ? 'grabbing' : 'default' }}
                  />
                </div>

                {/* Controls Bar (Below Image) - Hidden on Mobile/Tablet */}
                <div className="mt-6 hidden md:flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  {/* Zoom Controls - Compact */}
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-2xl backdrop-blur-sm">
                    <button
                      onClick={handleZoomOut}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                      disabled={scale <= 1}
                      aria-label="Zoom Out"
                    >
                      <FiZoomOut size={14} />
                    </button>

                    <div className="flex min-w-[2rem] justify-center text-xs font-bold text-gray-900 select-none">
                      {Math.round(scale * 100)}%
                    </div>

                    <button
                      onClick={handleZoomIn}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                      disabled={scale >= 3}
                      aria-label="Zoom In"
                    >
                      <FiZoomIn size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Close Button (Top Right) - Responsive */}
              <button
                className="absolute right-4 top-4 z-[101] group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/90 hover:text-[#A70909] hover:border-[#A70909] shadow-xl md:right-8 md:top-8 md:px-4 md:py-2"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <span className="hidden sm:inline">{closeLabel}</span>
                <FiX className="h-5 w-5 transition-transform group-hover:rotate-90" />
              </button>

              {/* Close Button (Top Right) */}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
