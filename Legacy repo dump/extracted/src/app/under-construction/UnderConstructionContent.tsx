'use client'

import { useEffect, useState } from 'react'
import ContactCTA from '@/components/ContactCTA'
import BorderRevealButton from '@/components/BorderRevealButton'
import { motion } from 'framer-motion'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

export default function UnderConstructionContent() {
  const [section, setSection] = useState('หมวดหมู่ไม่ระบุ')
  const [item, setItem] = useState('หัวข้อไม่ระบุ')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSection(params.get('section') || 'หมวดหมู่ไม่ระบุ')
    setItem(params.get('item') || 'หัวข้อไม่ระบุ')
  }, [])

  const [ctaExpanded, setCtaExpanded] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center text-center px-6 bg-white snap-start transition-all">
      <div className="max-w-xl flex flex-col items-center">
        {/* ไอคอน 🚧 */}
        <div className="text-[80px] sm:text-[100px] leading-none mb-6">🚧</div>

        {/* หัวข้อ */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#A70909] mb-4 leading-relaxed">
          ข้อมูลในหน้า <span className="underline">{section}</span> / <span className="underline">{item}</span> อยู่ระหว่างการพัฒนา
        </h1>

        {/* คำอธิบาย */}
        <p className="text-black text-lg sm:text-xl mb-10 leading-relaxed">
          กรุณากลับมาใหม่เร็ว ๆ นี้
        </p>

        {/* CTA + ปุ่มกลับ */}
        <div className="flex flex-col items-center gap-4 w-full">
          <ContactCTA onExpandChange={(expanded) => setCtaExpanded(expanded)} />

          <motion.div
            animate={{ y: isMobile && ctaExpanded ? 40 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <BorderRevealButton href="/" className="text-xs py-1 px-3">
              กลับไปหน้าแรก
            </BorderRevealButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

