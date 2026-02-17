'use client'

import { useTranslations } from 'next-intl'
import { FaUserTie, FaClock, FaComments, FaBalanceScale, FaThumbsUp, FaCheckCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Define the gradient as a constant to keep JSX clean
const BG_GRADIENT = 'linear-gradient(135deg, #661001, #781200, #8C1804, #A70909, #D94D3A, #FF6F61, #FF8F8F, #FF8F8F, #FF6F61, #D94D3A, #A70909, #8C1804, #781200, #661001)'

export function WhyChooseUsSection() {
  const t = useTranslations('home.highlights')

  // Map icons to the items index order
  const icons = [
    <FaCheckCircle key="0" className="text-5xl lg:text-6xl text-white drop-shadow-md" />, // Everything handled / บริการครบ
    <FaUserTie key="1" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,     // Experts / ทีมผู้เชี่ยวชาญ
    <FaClock key="2" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,       // Fast, transparent / ทำงานรวดเร็ว
    <FaComments key="3" className="text-5xl lg:text-6xl text-white drop-shadow-md" />,    // Unlimited free consults / ให้คำปรึกษาฟรี
    <FaBalanceScale key="4" className="text-5xl lg:text-6xl text-white drop-shadow-md" />, // 100% legal / ถูกต้องตามกฎหมาย
    <FaThumbsUp key="5" className="text-5xl lg:text-6xl text-white drop-shadow-md" />     // Accountable / รับผิดชอบ
  ]

  // Animation constants for sequential shimmer
  const SHIMMER_DURATION = 0.8
  const TOTAL_CARDS = icons.length
  // Total cycle time needs to be long enough for all cards to play once
  const REPEAT_DELAY = (TOTAL_CARDS - 1) * SHIMMER_DURATION

  return (
    <section
      className="relative min-h-[60vh] flex flex-col justify-center items-center overflow-hidden py-24 md:py-32"
    >
      {/* 
        Background Gradient Animation
        - Uses a double-cycle gradient pattern to ensure mathematical perfection when looping
        - Moves from 0% to 100% (shifting exactly half of the 200% width)
        - Cycle: #661001 -> ... -> #661001 (Repeated twice)
      */}
      <motion.div
        className="absolute inset-0 z-0"
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
        {/* Grid items stretch by default, h-full on child ensures equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className="group relative flex flex-col items-center text-center p-8 lg:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden h-full shadow-xl shadow-red-900/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Rainbow / Iridescent Glow Effect - Stronger Opacity (0.7) */}
              <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-yellow-500/50 mix-blend-overlay" />

              {/* Shimmer Animation - Top-Left to Bottom-Right (Sequential) */}
              {/* Rotated to move diagonally. x/y from negative to positive. */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-[200%] h-[200%]"
                style={{ rotate: -45, top: '-50%', left: '-50%' }}
                initial={{ x: '-100%', y: '-100%' }}
                animate={{ x: '100%', y: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: SHIMMER_DURATION,
                  repeatDelay: REPEAT_DELAY,
                  ease: "easeInOut",
                  delay: index * SHIMMER_DURATION // Perfectly sequential
                }}
              />

              <div className="mb-6 p-5 bg-gradient-to-br from-white/20 to-white/5 rounded-full shadow-lg border border-white/10 relative z-10">
                {icon}
              </div>
              <p className="text-white font-medium text-xl lg:text-2xl leading-relaxed drop-shadow-md relative z-10 text-balance">
                {t(`items.${index}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
