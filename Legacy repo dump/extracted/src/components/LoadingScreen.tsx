'use client'

import { motion } from 'framer-motion'

const BRAND = 'ViRINTIRA'.split('')

export default function LoadingScreen() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, pointerEvents: 'auto' }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#FFFEFE] flex flex-col items-center justify-center z-[9999]"
    >
      <motion.img
        src="/logo.png"
        alt="Logo"
        className="h-24 w-auto mb-4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />

      <div className="flex gap-1 text-2xl font-semibold mb-6">
        {BRAND.map((char, i) => (
          <motion.span
            key={i}
            className="text-[#A70909]"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              repeatType: 'loop',
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="w-2/3 h-4 bg-[#F5DADA] border border-[#8C1804] rounded-full overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-[#A70909] via-[#8C1804] to-[#661001]"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}

