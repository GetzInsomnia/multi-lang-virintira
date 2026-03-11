'use client';

import React from 'react';
import { FaCheckCircle, FaLine, FaPhoneAlt } from 'react-icons/fa';
import { COMPANY } from '@/data/company';

interface PromotionItem {
    slug: string;
    title: string;
    category: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
    pricingTiers?: Array<{ name: string; price: string }>;
    benefits: string[];
    conditions: string;
}

interface PromotionDetailsContentProps {
    item: PromotionItem;
    ui: {
        benefitsTitle?: string;
        conditionsTitle?: string;
        summaryTitle?: string;
        specialPrice?: string;
        serviceRates?: string;
        freeAssessment?: string;
        chatViaLine?: string;
        callNow?: string;
    };
}

export function PromotionDetailsContent({ item, ui }: PromotionDetailsContentProps) {
    if (!item) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full pb-24 lg:pb-32">
            {/* Main Content Area (Left) */}
            <div className="flex-1">
                {/* 1. Full Width Image Placeholder */}
                <div className="w-full aspect-[21/9] sm:aspect-[16/6] bg-gray-100 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center border-2 border-dashed border-gray-200 mb-8 sm:mb-12">
                    <div className="text-gray-400 font-medium text-center flex flex-col items-center gap-3">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                        <span className="text-lg">Main Promotion Banner (Full Width)</span>
                    </div>
                </div>

                {/* Title and Badge */}
                <div className="mb-10">
                    <div className="inline-block bg-red-50 text-[#A70909] font-bold px-4 py-1.5 rounded-full text-sm mb-4">
                        {item.category}
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {item.title}
                    </h1>
                </div>

                {/* 2. Benefits List */}
                {item.benefits && item.benefits.length > 0 && (
                    <div className="mb-12 bg-[#FFF5F5] rounded-3xl p-6 sm:p-10 border border-red-50">
                        <h2 className="text-2xl font-bold text-[#A70909] mb-8 border-b border-red-100 pb-4">
                            {ui?.benefitsTitle}
                        </h2>
                        <ul className="space-y-4 sm:space-y-5">
                            {item.benefits.map((benefit: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 bg-white rounded-full p-1 shadow-sm shrink-0">
                                        <FaCheckCircle className="text-green-500 text-xl" />
                                    </div>
                                    <span className="text-gray-800 text-lg leading-relaxed">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 3. Conditions */}
                {item.conditions && (
                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                            {ui?.conditionsTitle}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                            {item.conditions}
                        </p>
                    </div>
                )}
            </div>

            {/* Sticky Contact Sidebar (Right on Desktop) */}
            <div className="w-full lg:w-[400px]">
                <div className="lg:sticky lg:top-[120px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                        {ui?.summaryTitle}
                    </h3>

                    {/* Price Presentation */}
                    {(!item.pricingTiers || item.pricingTiers.length === 0) ? (
                        <div className="mb-8">
                            <div className="text-sm text-gray-500 font-medium mb-1">{ui?.specialPrice}</div>
                            <div className="flex items-end gap-3 flex-wrap">
                                <span className="text-4xl font-extrabold text-[#A70909]">
                                    {item.price === 'ติดต่อสอบถามราคา' ? item.price : item.price.includes('ติดต่อ') ? item.price : item.price.includes('เริ่มต้น') ? item.price : `฿ ${item.price}`}
                                </span>
                                {item.originalPrice && (
                                    <span className="text-xl text-gray-400 font-medium line-through mb-1">
                                        ฿ {item.originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 space-y-3">
                            <div className="text-sm text-gray-500 font-medium mb-2">{ui?.serviceRates}</div>
                            {item.pricingTiers.map((tier, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-700 font-medium text-sm pr-4">{tier.name}</span>
                                    <span className="text-[#A70909] font-bold whitespace-nowrap">
                                        {tier.price.includes('ติดต่อ') ? tier.price : `฿ ${tier.price}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-4">
                        <a
                            href={COMPANY.socials.line}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg"
                        >
                            <FaLine className="text-2xl" />
                            <span>{ui?.chatViaLine}</span>
                        </a>

                        <a
                            href={`tel:${COMPANY.phone}`}
                            className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-[#A70909] font-bold py-4 px-6 rounded-2xl transition-all border border-red-100"
                        >
                            <FaPhoneAlt className="text-xl" />
                            <span>{ui?.callNow}</span>
                        </a>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-6">
                        {ui?.freeAssessment}
                    </p>
                </div>
            </div>
        </div>
    );
}
