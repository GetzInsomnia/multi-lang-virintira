'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export type ServiceCardItem = {
  serviceSlug: string;
  categorySlug: string;
  imagePath: string;
  title: string;
  description: string;
};

export function PopularServices({
  heading,
  items,
}: {
  heading: string;
  items: ServiceCardItem[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const services: ServiceCardItem[] = Array.isArray(items) ? items : [];
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const shadowClasses = [
    'shadow-[0_8px_30px_rgba(59,130,246,0.30)] group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.50)]', // Blue
    'shadow-[0_8px_30px_rgba(168,85,247,0.30)] group-hover:shadow-[0_12px_40px_rgba(168,85,247,0.50)]', // Purple
    'shadow-[0_8px_30px_rgba(34,197,94,0.30)] group-hover:shadow-[0_12px_40px_rgba(34,197,94,0.50)]', // Green
    'shadow-[0_8px_30px_rgba(239,68,68,0.30)] group-hover:shadow-[0_12px_40px_rgba(239,68,68,0.50)]', // Red
    'shadow-[0_8px_30px_rgba(249,115,22,0.30)] group-hover:shadow-[0_12px_40px_rgba(249,115,22,0.50)]', // Orange
  ];

  const itemAnim = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    show: (i: number) => {
      let tabletDelay = 0;
      if (typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024) {
        // Hero card (0) takes full width. Cards 1,2 are paired. 3,4 are paired.
        // Left side cards: 1, 3. Right side cards: 2, 4.
        tabletDelay = i === 0 ? 0 : (i % 2 === 1 ? 0 : 0.2);
      }
      return {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: prefersReducedMotion ? 0 : 1.0,
          delay: prefersReducedMotion ? 0 : (isDesktop ? i * 0.2 : tabletDelay),
        } as any,
      };
    },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fffefe] px-4 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,#ffe8e8_0%,#fffefe_55%,#fffefe_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {heading ? (
          <h2 className="text-center text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold text-[#A70909] drop-shadow-sm">
            {heading}
          </h2>
        ) : null}
        <motion.div
          key={isDesktop ? "desktop" : "mobile"}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial={isDesktop ? "hidden" : undefined}
          whileInView={isDesktop ? "show" : undefined}
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((item, index) => {
            const isHeroCard = index === 0;
            const imageSizes = isHeroCard
              ? '(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw'
              : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';

            return (
              <motion.div
                key={`${item.serviceSlug}-${index}`}
                custom={index}
                variants={itemAnim}
                initial={!isDesktop ? "hidden" : undefined}
                whileInView={!isDesktop ? "show" : undefined}
                viewport={{ once: true, margin: "-50px" }}
                className={`group flex flex-col z-0 ${isHeroCard ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <Link
                  href={`/services/${item.categorySlug}/${item.serviceSlug}`}
                  className={`relative isolate flex flex-col h-full overflow-hidden rounded-2xl border border-[#f3dede] bg-white transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A70909]/50 ${shadowClasses[index] || shadowClasses[0]}`}
                >
                  <div
                    className={`relative w-full overflow-hidden shrink-0 ${isHeroCard ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] lg:sm:grow' : 'aspect-[16/9]'}`}
                  >
                    <Image
                      src={item.imagePath}
                      alt={item.title}
                      fill
                      sizes={imageSizes}
                      className="transform-gpu object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-70" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
                      style={{ background: 'radial-gradient(circle at 20% 20%, rgba(167,9,9,0.18), transparent 55%)' }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={`flex flex-col justify-center gap-2 bg-white px-5 py-4 sm:px-6 sm:py-5 ${isHeroCard ? 'grow' : 'grow'}`}>
                    <h3 className="line-clamp-1 text-lg font-semibold text-[#A70909] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm text-[#5d3f3f] ${isHeroCard ? 'line-clamp-2' : 'line-clamp-1'
                        }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
