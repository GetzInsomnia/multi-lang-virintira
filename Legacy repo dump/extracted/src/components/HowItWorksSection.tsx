'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRegEdit, FaComments, FaFileAlt, FaSmile } from 'react-icons/fa'
import ContactCTA from '@/components/ContactCTA'

const steps = [
  {
    icon: <FaRegEdit className="text-4xl text-[#A70909]" />, 
    title: 'เลือกบริการ',
    description: 'เลือกบริการที่คุณสนใจหรือต้องการขอคำปรึกษา'
  },
  {
    icon: <FaComments className="text-4xl text-[#A70909]" />,
    title: 'พูดคุยและวางแผน',
    description: 'ติดต่อเราเพื่อปรึกษารายละเอียดหรือใช้บริการ'
  },
  {
    icon: <FaFileAlt className="text-4xl text-[#A70909]" />,
    title: 'ดำเนินการและเตรียมเอกสาร',
    description: 'เราดูแลทุกขั้นตอน พร้อมอัปเดตให้คุณทราบทุกระยะ'
  },
  {
    icon: <FaSmile className="text-4xl text-[#A70909]" />,
    title: 'เสร็จสิ้นอย่างราบรื่น',
    description: 'ส่งงานตรงเวลา ถูกต้อง พร้อมให้คำแนะนำเพิ่มเติม'
  },
]

export default function HowItWorksSection() {
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasStartedHighlight, setHasStartedHighlight] = useState(false)

  useEffect(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
    const delayBeforeStart = screenWidth < 640 ? 1400 : 3600

    const startTimer = setTimeout(() => {
      setHasStartedHighlight(true)
    }, delayBeforeStart)

    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    if (!hasStartedHighlight) return

    const timer = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setHighlightIndex((prev) => (prev + 1) % steps.length)
        setIsVisible(true)
      }, 500)
    }, 2000)

    return () => clearInterval(timer)
  }, [hasStartedHighlight])

  return (
    <section
      className="relative min-h-[calc(100dvh-var(--header-height))] snap-start bg-[#fff4f4] flex flex-col justify-center px-4 py-30 md:py-50 lg:py-42"
      style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
        <h2 className="text-center text-2xl lg:text-4xl font-bold text-[#A70909] mb-16">ขั้นตอนการใช้บริการ</h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-md text-center z-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {hasStartedHighlight && highlightIndex === index && isVisible && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 rounded-xl border-4 border-[#A70909] opacity-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                )}
              </AnimatePresence>
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-[#A70909] mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}

          {/* Timeline line */}
          {/* Mobile: Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-[#A70909]/20 z-0 sm:hidden"></div>
          {/* Tablet: hide for now to avoid overlap */}
          <div className="hidden sm:block lg:hidden"></div>
          {/* PC: Horizontal connector (optional later) */}
        </div>

        <div className="pt-20 flex justify-center">
          <ContactCTA />
        </div>
      </div>
    </section>
  )
}

