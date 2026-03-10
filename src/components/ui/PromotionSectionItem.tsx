"use client";

import React, { useState } from 'react';
import { PromotionDrawer } from './PromotionDrawer';

interface PromotionSectionItemProps {
    promotion?: {
        title?: string;
        subtitle?: string;
        cta?: string;
    };
}

export function PromotionSectionItem({ promotion }: PromotionSectionItemProps) {
    const [isPromoOpen, setIsPromoOpen] = useState(false);

    if (!promotion || !promotion.title) return null;

    return (
        <>
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#A70909] to-[#800000] p-8 sm:p-12 shadow-xl border border-red-500/20">
                {/* Decorative Background for Promotion */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/30 blur-[60px] animate-pulseSlow z-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left flex-1 max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight flex items-center justify-center md:justify-start gap-3">
                            <span className="text-3xl">🔥</span>
                            {promotion.title}
                        </h2>
                        <p className="text-red-100 text-lg sm:text-xl font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: promotion.subtitle || '' }} />
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto">
                        <button
                            onClick={() => setIsPromoOpen(true)}
                            className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#A70909] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:shadow-2xl hover:shadow-black/20"
                        >
                            <span className="relative z-10">{promotion.cta}</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-100/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                        </button>
                    </div>
                </div>
            </section>

            <PromotionDrawer
                isOpen={isPromoOpen}
                onClose={() => setIsPromoOpen(false)}
                content={{
                    title: promotion.title,
                    subtitle: promotion.subtitle || '',
                    cta: promotion.cta || ''
                }}
            />
        </>
    );
}
