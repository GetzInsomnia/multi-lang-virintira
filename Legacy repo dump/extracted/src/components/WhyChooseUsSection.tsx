'use client'

import { FaUserTie, FaClock, FaComments, FaBalanceScale, FaThumbsUp, FaCheckCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <FaCheckCircle className="text-6xl text-white" />,
    title: 'บริการครบจบในที่เดียว'
  },
  {
    icon: <FaUserTie className="text-6xl text-white" />,
    title: 'ทีมผู้เชี่ยวชาญประสบการณ์ 10+ ปี'
  },
  {
    icon: <FaClock className="text-6xl text-white" />,
    title: 'ทำงานรวดเร็ว โปร่งใส ตรงเวลา'
  },
  {
    icon: <FaComments className="text-6xl text-white" />,
    title: 'ให้คำปรึกษาฟรี ไม่จำกัดรอบ'
  },
  {
    icon: <FaBalanceScale className="text-6xl text-white" />,
    title: 'ถูกต้องตามกฎหมาย 100%'
  },
  {
    icon: <FaThumbsUp className="text-6xl text-white" />,
    title: 'รับผิดชอบ ไม่ทิ้งงาน'
  },
]

export default function WhyChooseUsSection() {
  return (
    <section
      className="relative min-h-[calc(100dvh-var(--header-height))] snap-start overflow-hidden px-4 py-40 md:py-58 lg:py-50"
      style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ backgroundPosition: '100% 100%' }}
        animate={{ backgroundPosition: '0% 0%' }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(135deg, #661001, #781200, #8C1804, #A70909, #D94D3A, #FF6F61, #FF8F8F, #FF8F8F, #FF6F61, #D94D3A, #A70909, #8C1804, #781200, #661001)',
          backgroundSize: '600% 600%'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-white font-semibold text-lg lg:text-xl leading-relaxed">{feature.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

