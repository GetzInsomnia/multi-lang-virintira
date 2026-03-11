"use client";

import React, { useState } from 'react';
import { PromotionDrawer } from './PromotionDrawer';
import { TicketPercent } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromotionItem {
    slug: string;
    title: string;
    category: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
    benefits: string[];
    conditions: string;
}

interface PromotionSectionItemProps {
    promotion?: {
        title?: string;
        subtitle?: string;
        cta?: string;
    };
    item?: PromotionItem;
    ui: {
        chatViaLine?: string;
        callNow?: string;
    };
}

export function PromotionSectionItem({ promotion, item, ui }: PromotionSectionItemProps) {
    const [isPromoOpen, setIsPromoOpen] = useState(false);

    if (!promotion || !promotion.title) return null;

    return (
        <div className="relative group/promo w-full mt-4 mb-16">
            {/* Static Rainbow Glow/Shadow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#FF0000] via-[#FF7F00] via-[#FFFF00] via-[#00FF00] via-[#0000FF] via-[#4B0082] to-[#9400D3] opacity-20 blur-xl transition-opacity duration-500 group-hover/promo:opacity-40"></div>

            <section className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-[#FFFDFD] to-[#FFF5F5] p-8 sm:p-10 shadow-sm transition-all sm:mx-0 bg-white">
                {/* Subtle Decorative Glow */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-red-50 rounded-full blur-3xl z-0 opacity-80 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute left-0 bottom-0 w-48 h-48 bg-red-50 rounded-full blur-3xl z-0 opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Text & Icon Content */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1 w-full text-center sm:text-left flex-col sm:flex-row">
                        <div className="mx-auto sm:mx-0 flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-[#A70909]/10 text-[#A70909] shadow-inner">
                            <motion.div
                                animate={{
                                    y: [-2, 2, -2],
                                    rotate: [-5, 5, -5]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            >
                                <TicketPercent className="h-7 w-7" strokeWidth={2} />
                            </motion.div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#A70909] tracking-tight">
                                {promotion.title}
                            </h2>
                            <div className="text-gray-700 text-[0.95rem] leading-relaxed max-w-xl mx-auto sm:mx-0 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: promotion.subtitle || '' }} />
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                        <button
                            onClick={() => setIsPromoOpen(true)}
                            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#A70909] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20"
                        >
                            <span className="relative z-10">{promotion.cta}</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                        </button>
                    </div>
                </div>
            </section>

            <PromotionDrawer
                isOpen={isPromoOpen}
                onClose={() => setIsPromoOpen(false)}
                item={item}
                ui={ui}
            />
        </div>
    );
}
