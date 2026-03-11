'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTags } from 'react-icons/fa';
import Link from 'next/link';

interface PromotionItem {
    slug: string;
    category: string;
    categoryId: string;
    title: string;
    imagePlaceholder: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
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

    // Filter items based on active tab
    const filteredItems = items.filter(item => {
        if (!item.title) return false; // Skip empty translation drafts
        if (activeTab === 'all') return true;
        return item.categoryId === activeTab;
    });

    const filterKeys = ['all', 'registration', 'accounting'];

    return (
        <div className="flex flex-col min-h-screen bg-[#FFFEFE]">
            {/* 1. Hero Section */}
            <section className="bg-[#FFF5F5] pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div className="space-y-6 text-center lg:text-left z-10">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A70909] leading-tight">
                                {hero.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {hero.summary}
                            </p>
                        </div>
                        {/* Right: Image Placeholder */}
                        <div className="relative w-full aspect-video rounded-3xl bg-gray-200 shadow-inner flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                            <div className="text-gray-400 font-medium flex flex-col items-center gap-2">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                                <span>Image Placeholder (16:9)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Filter System (Sticky) */}
            <div className="sticky top-[60px] lg:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-start sm:justify-center overflow-x-auto hide-scrollbar gap-3 pb-1">
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
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        >
                            {filteredItems.map((item) => (
                                <motion.div
                                    key={item.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                                >
                                    {/* Thumbnail Placeholder */}
                                    <div className="relative w-full aspect-[4/3] bg-gray-100 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                                        <div className="text-gray-400 font-medium text-sm flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-500">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                                            <span>Image (4:3)</span>
                                        </div>
                                        {/* Category Badge absolute positioned over image */}
                                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-gray-100/50">
                                            <FaTags className="text-[#A70909]" />
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-col flex-1 p-6 sm:p-8">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-4 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {/* Short Info Bullets */}
                                        <ul className="space-y-2 mb-6 flex-1">
                                            {item.shortInfo && item.shortInfo.map((info, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="leading-relaxed">{info}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Pricing Block */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 mb-6">
                                            {item.originalPrice && (
                                                <div className="text-gray-400 text-sm font-medium line-through mb-1">
                                                    ฿ {item.originalPrice}
                                                </div>
                                            )}
                                            <div className="text-[#A70909] text-2xl sm:text-3xl font-bold">
                                                {item.price === 'ติดต่อสอบถามราคา' ? item.price : item.price.includes('ติดต่อ') ? item.price : `฿ ${item.price}`}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={`/${locale}/promotion/${item.slug}`}
                                            className="w-full inline-block text-center bg-[#A70909] hover:bg-red-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                        >
                                            {ui.ctaPrimary || 'ดูรายละเอียดสิทธิพิเศษ'}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            ยังไม่มีโปรโมชั่นในหมวดหมู่นี้
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
