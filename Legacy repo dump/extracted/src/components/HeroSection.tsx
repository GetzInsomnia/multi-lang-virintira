'use client'

import ContactCTA from '@/components/ContactCTA'
import { motion } from 'framer-motion'
import TypewriterText from '@/components/TypewriterText'

export default function HeroSection() {
  return (
    <section
      id="herosection"
      style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
      className="relative min-h-[calc(100dvh-var(--header-height))] lg:pt-25 flex items-center justify-center text-center px-6 bg-[#FFFEFE] snap-start"
    >
      {/* Background image */}
      <div className="absolute -top-[10px] inset-x-0 bottom-0 z-0 bg-[url('/bg-hero.png')] bg-cover bg-center opacity-15"></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <motion.h1
          className="text-4xl lg:text-6xl font-bold leading-snug tracking-tight text-[#A70909]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          สำนักงานบัญชีและบริหารธุรกิจครบวงจร
        </motion.h1>

        <motion.div
          className="text-lg lg:text-2xl text-[#A70909] leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TypewriterText text="บริการไว ใช้งานง่าย ครบจบทุกเรื่องธุรกิจ" />
        </motion.div>

        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
        >
          <ContactCTA />
        </motion.div>
      </div>
    </section>
  )
}

