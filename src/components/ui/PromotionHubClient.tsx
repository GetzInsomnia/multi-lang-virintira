'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTags, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PromotionItem {
    slug: string;
    category: string;
    categoryId: string;
    title: string;
    imagePlaceholder: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
    pricingTiers?: Array<{name: string, price: string}>;
    benefits: string[];
    conditions: string;
}

interface PromotionHubClientProps {
    locale: string;
    hero: {
        title: string;
        summary: string;
    };
    filters: Record<string, string>;
    items: PromotionItem[];
    ui: Record<string, string>;
}

export function PromotionHubClient({ locale, hero, filters, items, ui }: PromotionHubClientProps) {
    const [activeTab, setActiveTab] = useState<string>('all');

    // Specific logic matching AboutUsPage for perfect brand typographic harmony
    const isCJK = ['ja', 'zh-Hans', 'zh-Hant', 'ko'].includes(locale);
    const isJA = locale === 'ja';
    const jaTypography = isJA ? 'sm:break-keep' : '';

    const headerTypography = isCJK
        ? `break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-fit mx-auto text-center`
        : 'text-balance break-words [overflow-wrap:anywhere]';

    const bodyTypography = isCJK
        ? `break-words [overflow-wrap:anywhere] [line-break:strict] ${jaTypography} w-fit mx-auto text-center`
        : 'text-balance break-words [overflow-wrap:anywhere]';

    const breakClass = isCJK ? 'break-keep' : '';

    const rainbowShadows = [
        'shadow-[0_0_25px_rgba(255,0,0,0.15)] hover:shadow-[0_0_40px_rgba(255,0,0,0.35)]',       // Red
        'shadow-[0_0_25px_rgba(255,127,0,0.15)] hover:shadow-[0_0_40px_rgba(255,127,0,0.35)]',   // Orange
        'shadow-[0_0_25px_rgba(255,215,0,0.15)] hover:shadow-[0_0_40px_rgba(255,215,0,0.35)]',   // Yellow
        'shadow-[0_0_25px_rgba(0,255,0,0.15)] hover:shadow-[0_0_40px_rgba(0,255,0,0.35)]',       // Green
        'shadow-[0_0_25px_rgba(0,0,255,0.15)] hover:shadow-[0_0_40px_rgba(0,0,255,0.35)]',       // Blue
        'shadow-[0_0_25px_rgba(75,0,130,0.15)] hover:shadow-[0_0_40px_rgba(75,0,130,0.35)]',     // Indigo
        'shadow-[0_0_25px_rgba(148,0,211,0.15)] hover:shadow-[0_0_40px_rgba(148,0,211,0.35)]'    // Violet
    ];

    // Filter items based on active tab
    const filteredItems = items.filter(item => {
        if (!item.title) return false; // Skip empty translation drafts
        if (activeTab === 'all') return true;
        return item.categoryId === activeTab;
    });

    const filterKeys = ['all', 'registration', 'amendment', 'accounting', 'license', 'marketing'];

    return (
        <div className="flex flex-col min-h-screen bg-[#FFFEFE]">
            {/* 1. Hero Section */}
            <section className="relative bg-gradient-to-b from-[#FFF5F5] to-[#FFFEFE] pb-12 sm:pb-24 overflow-hidden border-b border-red-50/50">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[url('/mesh.svg')] opacity-[0.08] bg-cover bg-center mix-blend-multiply pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#A70909]/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#A70909]/5 blur-[80px] pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 lg:px-8 mb-2 sm:mb-4 text-left relative z-10">
                    <Breadcrumbs
                        homeLabel={ui.breadcrumbHome || 'หน้าแรก'}
                        items={[{ label: ui.breadcrumbPromotion || 'โปรโมชั่น', href: '/promotion' }]}
                    />
                </div>
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10 mt-12 sm:mt-16">
                    <h1 className={`text-[clamp(2.2rem,1.5rem+3vw,4rem)] tracking-[0.02em] font-extrabold text-[#A70909] !leading-tight mb-8 text-center ${headerTypography}`}>
                        {hero.title}
                    </h1>
                    <p className={`text-[clamp(1.1rem,1rem+0.5vw,1.25rem)] text-gray-700 leading-relaxed max-w-3xl mx-auto text-center ${bodyTypography}`}>
                        {hero.summary}
                    </p>
                </div>
            </section>

            {/* 2. Filter System (Sticky) */}
            <div className="sticky top-[60px] lg:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-2 sm:py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start xl:justify-center overflow-x-auto hide-scrollbar gap-3 pt-2 pb-4 px-2">
                        {filterKeys.map(key => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 border focus:outline-none ${activeTab === key
                                        ? 'bg-[#A70909] text-white border-[#A70909] shadow-md scale-105'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-red-50 hover:text-[#A70909] hover:border-red-200'
                                    }`}
                            >
                                {filters[key] || key}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Promotion Cards Grid */}
            <section className="flex-1 py-12 sm:py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {filteredItems.map((item, idx) => (
                                <Link
                                    href={`/${locale}/promotion/${item.slug}`}
                                    key={item.slug}
                                    className={`flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] ${rainbowShadows[idx % 7]}`}
                                >
                                    {/* Thumbnail Placeholder */}
                                    <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden text-gray-300">
                                        <span className="text-4xl text-gray-400 font-bold opacity-20 select-none group-hover:scale-105 transition-transform duration-500">
                                            Virintira
                                        </span>
                                        {/* Category Badge absolute positioned over image */}
                                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-gray-100/50">
                                            <FaTags className="text-[#A70909]" />
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col flex-1 p-6 sm:p-8">
                                        <h3 className={`text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#A70909] transition-colors leading-tight line-clamp-2 mb-4 ${isCJK ? 'break-words' : 'text-balance'}`}>
                                            {item.title}
                                        </h3>
                                        {/* Short Info Bullets */}
                                        <ul className="space-y-3 mb-6 flex-grow flex flex-col justify-start">
                                            {item.shortInfo && item.shortInfo.length > 0 ? (
                                                item.shortInfo.slice(0, 3).map((info, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-[15px] sm:text-base text-gray-600 leading-relaxed">
                                                        <FaCheckCircle className="text-[#06C755] w-4 h-4 sm:w-[18px] sm:h-[18px] mt-1 shrink-0 bg-white" />
                                                        <span className={`line-clamp-2 ${isCJK ? 'break-words' : 'text-balance'}`}>{info}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className={`text-[15px] sm:text-base text-gray-400 italic ${isCJK ? 'break-words' : 'text-balance'}`}>
                                                    (กำลังเพิ่มข้อมูลโปรโมชั่น)
                                                </li>
                                            )}
                                            {((item.shortInfo && item.shortInfo.length > 3) || (item.benefits && item.benefits.length > 3)) && (
                                                <li className="flex items-start gap-3 mt-1.5 text-[15px] sm:text-base text-gray-600 leading-relaxed">
                                                    <div className="bg-[#A70909] text-white rounded-full flex items-center justify-center w-4 h-4 sm:w-[18px] sm:h-[18px] mt-1 flex-shrink-0">
                                                        <FaPlus className="text-[10px]" />
                                                    </div>
                                                    <span className={`${isCJK ? 'break-words' : 'text-balance'}`}>{ui.andMore || 'และอื่นๆ อีกมากมาย...'}</span>
                                                </li>
                                            )}
                                        </ul>

                                        {/* Pricing Block */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 mb-6 flex justify-start overflow-hidden">
                                            <div className="flex flex-col text-left max-w-full items-start">
                                                {item.originalPrice && (
                                                    <div className="text-gray-400 text-sm sm:text-[15px] font-medium line-through mb-1">
                                                        ฿ {item.originalPrice}
                                                    </div>
                                                )}
                                                <div 
                                                    className="text-[#A70909] font-bold whitespace-nowrap"
                                                    style={{ fontSize: 'clamp(1.125rem, 4.5vw, 1.75rem)' }}
                                                >
                                                    {item.price === 'ติดต่อสอบถามราคา' ? item.price : item.price.includes('ติดต่อ') ? item.price : item.price.includes('เริ่มต้น') ? item.price : `฿ ${item.price}`}
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="w-full inline-block text-center bg-white text-[#A70909] border border-[#A70909] group-hover:bg-[#A70909] group-hover:text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-300 text-sm"
                                        >
                                            {ui.viewDetails || 'ดูรายละเอียดโปรโมชั่น'}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            {ui.emptyHub || 'ยังไม่มีโปรโมชั่นในหมวดหมู่นี้'}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
