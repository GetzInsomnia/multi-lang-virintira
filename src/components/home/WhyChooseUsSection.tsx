'use client'

import { useTranslations } from 'next-intl'
import { FaUserTie, FaClock, FaComments, FaBalanceScale, FaThumbsUp, FaCheckCircle } from 'react-icons/fa'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Define the gradient as a constant to keep JSX clean
const BG_GRADIENT = 'linear-gradient(135deg, #661001, #781200, #8C1804, #A70909, #D94D3A, #FF6F61, #FF8F8F, #FF8F8F, #FF6F61, #D94D3A, #A70909, #8C1804, #781200, #661001)'

export function WhyChooseUsSection() {
  const t = useTranslations('home.highlights')
  const prefersReducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Map icons to the items index order
  const icons = [
    <FaCheckCircle key="0" className="text-5xl lg:text-6xl text-white drop-shadow-md" />, // Everything handled / บริการครบ
    <FaUserTie key="1" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,     // Experts / ทีมผู้เชี่ยวชาญ
    <FaClock key="2" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,       // Fast, transparent / ทำงานรวดเร็ว
    <FaComments key="3" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,    // Unlimited free consults / ให้คำปรึกษาฟรี
    <FaBalanceScale key="4" className="text-5xl lg:text-6xl text-white drop-shadow-md" />, // 100% legal / ถูกต้องตามกฎหมาย
    <FaThumbsUp key="5" className="text-5xl lg:text-6xl text-white drop-shadow-md" />     // Accountable / รับผิดชอบ
  ]

  // Individual card fade-up ensuring identical behavior in grid layout
  const itemAnim = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    show: (i: number) => {
      let tabletDelay = 0;
      if (typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024) {
        // All cards are equal width. Left side: 0, 2, 4. Right side: 1, 3, 5.
        tabletDelay = (i % 2) * 0.2;
      }
      return {
        opacity: 1,
        y: 0,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: prefersReducedMotion ? 0 : 1.0,
          // On tablet/desktop, stagger them sequentially. On mobile, trigger immediately upon scrolling into view.
          delay: prefersReducedMotion ? 0 : (isDesktop ? i * 0.2 : tabletDelay),
        } as any
      };
    }
  }

  return (
    <section
      className="relative min-h-[500px] md:min-h-[450px] xl:min-h-[60vh] flex flex-col justify-center items-center overflow-hidden py-24 md:py-32"
    >
      {/* 
        Background Gradient Animation
      */}
      <motion.div
        className="absolute inset-0 z-0 opacity-90"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{
          // A -> B -> C -> B -> A -> B -> C -> B -> A (Two full palindromic cycles)
          backgroundImage: 'linear-gradient(135deg, #661001, #8C1804, #D94D3A, #FF6F61, #D94D3A, #8C1804, #661001, #8C1804, #D94D3A, #FF6F61, #D94D3A, #8C1804, #661001)',
          backgroundSize: '200% 200%'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12">
        {/* Grid layout with auto-rows-fr to ensure all 6 cards are equal height regardless of row grouping */}
        <motion.div
          key={isDesktop ? "desktop" : "mobile"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-fr"
          initial={isDesktop ? "hidden" : undefined}
          whileInView={isDesktop ? "show" : undefined}
          viewport={{ once: true, margin: "-50px" }}
        >
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemAnim}
              initial={!isDesktop ? "hidden" : undefined}
              whileInView={!isDesktop ? "show" : undefined}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full z-0 flex flex-col"
            >
              <div
                className={`
                  group relative flex flex-col justify-center items-center text-center p-8 lg:p-10 rounded-2xl
                  bg-white/20 backdrop-blur-[80px] border border-white/30 
                  overflow-hidden h-full shadow-xl shadow-black/10 hover:shadow-2xl hover:bg-white/30 hover:border-white/50
                  transition-all duration-300
                `}
              >
                {/* Subtle inner top-light highlight to make it look like very thick glass */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 pointer-events-none" />

                <div className="mb-6 p-5 bg-gradient-to-br from-white/30 to-white/10 rounded-full shadow-lg border border-white/30 relative z-10 group-hover:scale-105 transition-transform duration-300">
                  {icon}
                </div>
                <p className="text-white font-medium text-xl lg:text-2xl leading-relaxed drop-shadow-lg relative z-10 text-balance group-hover:text-white transition-colors duration-300">
                  {t(`items.${index}`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
