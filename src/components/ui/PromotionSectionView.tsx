'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface PromotionSectionViewProps {
    imagePosition?: 'left' | 'right';
    imageSrc: string;
    title: string;
    features: string[];
    note?: string;
    ctaLabel: string;
    chatLabel: string;
    phoneUrl: string;
    chatUrl: string;
}

export function PromotionSectionView({
    imagePosition = 'right',
    imageSrc,
    title,
    features,
    note,
    ctaLabel,
    chatLabel,
    phoneUrl,
    chatUrl,
}: PromotionSectionViewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const headingRef = useRef(null);
    const isInView = useInView(headingRef, { once: true });

    const isImageLeft = imagePosition === 'left';

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
                    <div className="cursor-pointer transition-all duration-500 hover:-translate-y-1.5" onClick={() => setIsOpen(true)}>
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={480}
                            height={600}
                            className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 object-contain max-h-[75vh]"
                            priority
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
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#A70909] leading-snug mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="inline-block w-full text-center lg:text-left">
                                {title}
                            </span>
                        </motion.h2>

                        <ul className="space-y-4 text-[clamp(0.95rem,0.95rem+0.2vw,1.1rem)] text-gray-800 leading-relaxed mb-6">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex bg-red-50 text-[#A70909] rounded-full p-1 mt-0.5 shrink-0">
                                        <Check className="w-4 h-4" strokeWidth={3} />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {note && (
                            <p className="mt-6 text-sm text-gray-500 flex items-center gap-1.5 opacity-80 before:content-['*'] inline-block leading-relaxed">
                                {note}
                            </p>
                        )}

                        <div className="pt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            <a
                                href={phoneUrl}
                                className="inline-flex min-w-[180px] w-full sm:w-auto items-center justify-center rounded-full bg-white border-2 border-[#A70909] px-6 py-2.5 text-[0.95rem] font-semibold text-[#A70909] shadow-sm transition-all hover:bg-[#A70909] hover:text-white hover:shadow-md focus:outline-none"
                            >
                                {ctaLabel}
                            </a>
                            <a
                                href={chatUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-w-[180px] w-full sm:w-auto items-center justify-center rounded-full bg-[#06C755] px-6 py-2.5 text-[0.95rem] font-semibold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-md focus:outline-none"
                            >
                                {chatLabel}
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* 🔍 Lightbox */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            aria-modal="true"
                            role="dialog"
                        >
                            <motion.div
                                className="relative rounded-xl overflow-hidden shadow-2xl bg-white"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 z-40 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                                    aria-label="Close image lightbox"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    width={1200}
                                    height={1600}
                                    className="max-h-[90vh] w-auto max-w-[95vw] object-contain"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
