'use client';

import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaLine, FaPhoneAlt, FaComments, FaInfoCircle } from 'react-icons/fa';
import { COMPANY } from '@/data/company';
import { useUI } from '@/context/UIContext';
import { useLocale } from 'next-intl';

interface PromotionItem {
    slug: string;
    title: string;
    category: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
    pricingTiers?: Array<{ name: string; price: string; originalPrice?: string }>;
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
        otherContacts?: string;
    };
}

const rainbowShadows = [
    'shadow-[0_0_35px_rgba(255,0,0,0.15)]',
    'shadow-[0_0_35px_rgba(255,127,0,0.15)]',
    'shadow-[0_0_35px_rgba(255,215,0,0.15)]',
    'shadow-[0_0_35px_rgba(0,255,0,0.15)]',
    'shadow-[0_0_35px_rgba(0,0,255,0.15)]',
    'shadow-[0_0_35px_rgba(75,0,130,0.15)]',
    'shadow-[0_0_35px_rgba(148,0,211,0.15)]'
];

export function PromotionDetailsContent({ item, ui }: PromotionDetailsContentProps) {
    const { openContactDrawer } = useUI();
    const locale = useLocale();

    const isCJK = ['ja', 'ko', 'zh-Hans', 'zh-Hant'].includes(locale);
    const breakClass = isCJK ? 'break-keep' : 'break-words';

    const [randomShadow, setRandomShadow] = useState('shadow-[0_8px_30px_rgb(0,0,0,0.08)]');

    useEffect(() => {
        setRandomShadow(rainbowShadows[Math.floor(Math.random() * rainbowShadows.length)]);
    }, []);

    if (!item) return null;

    // Helper to parse \n as <br /> and **text** or <b>text</b> as bold
    const parseFormattedText = (text?: string) => {
        if (!text) return null;
        return text.split('\n').map((line, idx, arr) => {
            const parts = line.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g).map((part, pIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('<b>') && part.endsWith('</b>')) {
                    return <strong key={pIdx} className="font-bold text-gray-900">{part.slice(3, -4)}</strong>;
                }
                const italicParts = part.split(/(\*.*?\*|<i>.*?<\/i>)/g).map((iPart, iIdx) => {
                    if (iPart.startsWith('*') && iPart.endsWith('*') && !iPart.startsWith('**')) {
                        return <em key={iIdx} className="italic text-gray-700">{iPart.slice(1, -1)}</em>;
                    }
                    if (iPart.startsWith('<i>') && iPart.endsWith('</i>')) {
                        return <em key={iIdx} className="italic text-gray-700">{iPart.slice(3, -4)}</em>;
                    }
                    return iPart;
                });
                return <React.Fragment key={pIdx}>{italicParts}</React.Fragment>;
            });
            return (
                <React.Fragment key={idx}>
                    {parts}
                    {idx < arr.length - 1 && <br />}
                </React.Fragment>
            );
        });
    };

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
                    <div className="inline-block bg-red-50 text-[#A70909] font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-red-100/50">
                        {item.category}
                    </div>
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight ${breakClass}`}>
                        {item.title}
                    </h1>
                </div>

                {/* 2. Benefits List */}
                {item.benefits && item.benefits.length > 0 && (
                    <div className="mb-12 relative bg-[#FFF5F5] rounded-3xl p-6 sm:p-10 border border-red-50 overflow-hidden shadow-sm">
                        {/* Decorative Background SVG */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-12">
                            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="50"/>
                            </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.03] pointer-events-none transform -translate-x-10 translate-y-10">
                            <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="20" transform="rotate(45 50 50)"/>
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-[#A70909] mb-8 border-b-2 border-red-200 pb-4 relative z-10">
                            {ui?.benefitsTitle}
                        </h2>
                        <ul className="space-y-4 sm:space-y-6 relative z-10">
                            {item.benefits.map((benefit: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-red-50 shrink-0">
                                        <FaCheckCircle className="text-[#06C755] text-xl" />
                                    </div>
                                    <span className={`text-gray-800 text-lg leading-relaxed ${breakClass}`}>
                                        {parseFormattedText(benefit)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* 3. Conditions */}
                {item.conditions && (
                    <div className="bg-gray-50/80 border border-gray-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <FaInfoCircle className="text-[#A70909] text-xl" />
                            <h3 className="text-[15px] font-bold text-[#A70909] uppercase tracking-wider">
                                {ui?.conditionsTitle}
                            </h3>
                        </div>
                        <div className={`text-[15px] sm:text-base text-gray-700 leading-relaxed ${breakClass} space-y-2`}>
                            {(() => {
                                // Extract the starting <b>...</b> tag and discard it
                                const match = item.conditions.match(/^(<b>.*?<\/b>)\s*(.*)/is);
                                if (match) {
                                    return parseFormattedText(match[2]);
                                }
                                return parseFormattedText(item.conditions);
                            })()}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Contact Sidebar (Right on Desktop) */}
            <div className="w-full lg:w-[400px]">
                <div className={`lg:sticky lg:top-[120px] bg-white rounded-3xl border border-gray-100 p-8 flex flex-col transition-shadow duration-500 ${randomShadow}`}>
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
                            <div className="text-sm text-gray-500 font-medium mb-3 px-2">{ui?.serviceRates}</div>
                            {item.pricingTiers.map((tier, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-red-50 transition-colors px-3 rounded-xl">
                                    <span className={`text-gray-800 font-medium pr-4 leading-snug ${breakClass}`}>
                                        {parseFormattedText(tier.name)}
                                    </span>
                                    <div className="flex flex-col items-end shrink-0">
                                        <span className="text-[#A70909] font-bold whitespace-nowrap text-[17px]">
                                            {tier.price.includes('ติดต่อ') ? tier.price : `฿ ${tier.price}`}
                                        </span>
                                        {tier.originalPrice && (
                                            <span className="text-xs text-gray-400 font-medium line-through">
                                                ฿ {tier.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 w-full sm:w-fit sm:mx-auto lg:w-full">
                        <a
                            href={COMPANY.socials.line}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold py-2.5 px-6 rounded-full transition-all shadow-sm hover:shadow-md"
                        >
                            <FaLine className="text-xl" />
                            <span>{ui?.chatViaLine}</span>
                        </a>

                        <a
                            href={`tel:${COMPANY.phone}`}
                            className="w-full flex items-center justify-center gap-2.5 bg-[#A70909] hover:bg-[#8c0808] text-white font-semibold py-2.5 px-6 rounded-full transition-all shadow-md hover:shadow-lg ring-1 ring-[#A70909]/50"
                        >
                            <FaPhoneAlt className="text-base" />
                            <span>{ui?.callNow}</span>
                        </a>

                        <button
                            onClick={openContactDrawer}
                            className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 px-6 rounded-full transition-all border border-gray-200 shadow-sm hover:shadow-md"
                        >
                            <FaComments className="text-base" />
                            <span>{ui?.otherContacts || 'ช่องทางติดต่ออื่นๆ'}</span>
                        </button>
                    </div>

                    <div className="w-full flex justify-center mt-6">
                        <p className={`text-sm font-semibold text-[#A70909] bg-red-50 py-3 px-5 rounded-2xl text-left shadow-sm border border-red-100/50 max-w-fit leading-relaxed ${breakClass}`}>
                            {parseFormattedText(ui?.freeAssessment)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
