'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTags } from 'react-icons/fa';
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
            <section className="bg-gradient-to-b from-[#FFF5F5] to-[#FFFEFE] pt-12 pb-12 sm:pt-20 sm:pb-16 overflow-hidden border-b border-red-50/50">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="flex justify-start mb-6 sm:mb-8 text-left">
                        <Breadcrumbs
                            homeLabel={ui.breadcrumbHome || 'หน้าแรก'}
                            items={[{ label: ui.breadcrumbPromotion || 'โปรโมชั่น', href: '/promotion' }]}
                        />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A70909] leading-tight mb-6 text-left">
                        {hero.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl text-left">
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
                            {filteredItems.map((item) => (
                                <Link
                                    href={`/${locale}/promotion/${item.slug}`}
                                    key={item.slug}
                                    className="flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]"
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
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-4 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {/* Benefits Bullets */}
                                        <ul className="space-y-2 mb-6 flex-1">
                                            {item.benefits && item.benefits.slice(0, 3).map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="leading-relaxed line-clamp-2">{benefit}</span>
                                                </li>
                                            ))}
                                            {item.benefits && item.benefits.length > 3 && (
                                                <li className="text-gray-400 text-xs italic mt-2 ml-6">
                                                    {ui.andMore || 'และอื่นๆ อีกมากมาย...'}
                                                </li>
                                            )}
                                        </ul>

                                        {/* Pricing Block */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 mb-6">
                                            {item.originalPrice && (
                                                <div className="text-gray-400 text-sm font-medium line-through mb-1">
                                                    ฿ {item.originalPrice}
                                                </div>
                                            )}
                                            <div className="text-[#A70909] text-2xl sm:text-3xl font-bold">
                                                {item.price === 'ติดต่อสอบถามราคา' ? item.price : item.price.includes('ติดต่อ') ? item.price : item.price.includes('เริ่มต้น') ? item.price : `฿ ${item.price}`}
                                            </div>
                                        </div>

                                        <div
                                            className="w-full inline-block text-center bg-white text-[#A70909] border border-[#A70909] group-hover:bg-[#A70909] group-hover:text-white font-bold py-3.5 px-6 rounded-full transition-all duration-300"
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
