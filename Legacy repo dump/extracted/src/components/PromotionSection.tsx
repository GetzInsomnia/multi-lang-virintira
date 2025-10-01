'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import ContactCTA from '@/components/ContactCTA'

interface PromotionSectionProps {
    imagePosition?: 'left' | 'right'
    imageSrc: string
    title: string
    features: string[]
}

export default function PromotionSection({
    imagePosition = 'right',
    imageSrc,
    title,
    features,
}: PromotionSectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const headingRef = useRef(null)
    const isInView = useInView(headingRef, { once: true })

    const isImageLeft = imagePosition === 'left'

    return (
        <section
            className="relative min-h-[calc(100dvh-var(--header-height))] snap-start bg-[#FFFEFE] px-4 py-16 lg:py-0 flex items-center justify-center"
            style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
        >
            <div className={`max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 mt-6 lg:mt-12`}>
                {/* 🖼️ Image */}
                <motion.div
                    className={`w-full lg:w-1/2 flex justify-center px-2 ${isImageLeft ? 'order-1' : 'order-1 lg:order-2'}`}
                    initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={480}
                            height={600}
                            className="rounded-lg shadow-lg object-contain max-h-[75vh]"
                        />
                    </div>
                </motion.div>

                {/* 📝 Text */}
                <motion.div
                    className={`w-full lg:w-1/2 ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'} flex justify-center lg:justify-start`}
                    initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-full max-w-lg px-2 text-left">
                        <motion.h2
                            ref={headingRef}
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#A70909] leading-snug mb-6"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                                transition={{
                                    duration: 1.0,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    repeatDelay: 1.5,
                                }}
                                className="inline-block w-full text-center lg:text-left"
                            >
                                {title}
                            </motion.span>
                        </motion.h2>

                        <ul className="space-y-4 text-base lg:text-lg text-gray-800 leading-relaxed">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-yellow-400 mt-[0px] animate-pulse">✨</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-6 text-sm text-gray-500">*เงื่อนไขเป็นไปตามที่บริษัทกำหนด</p>

                        <div className="pt-8 flex justify-center lg:justify-start">
                            <motion.div
                                className="w-full max-w-sm flex justify-center"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                            >
                                <ContactCTA />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* 🔍 Lightbox */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.img
                                src={imageSrc}
                                alt={title}
                                className="max-h-[90vh] w-auto object-contain rounded shadow-xl"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

