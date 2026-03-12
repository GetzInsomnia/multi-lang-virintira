'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { FaArrowRight, FaCommentDots } from 'react-icons/fa6';

export interface ServiceCardProps {
    href: string;
    imagePath?: string;
    title: string;
    summary: string;
    ctaText: string;
    variant?: 'default' | 'dashed';
    onClick?: () => void;
    index?: number;
}

export function ServiceCard({
    href,
    imagePath,
    title,
    summary,
    ctaText,
    variant = 'default',
    onClick,
    index = 0
}: ServiceCardProps) {
    const [imageError, setImageError] = useState(false);
    const isDashed = variant === 'dashed';

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    if (isDashed) {
        return (
            <Link
                href={href}
                target="_blank"
                onClick={handleClick}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 shadow-sm transition-all hover:border-[#A70909] hover:bg-[#A70909]/5 hover:shadow-md"
            >
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                    <div className="mb-6 rounded-full bg-white p-4 shadow-sm group-hover:text-[#A70909] transition-colors">
                        <FaCommentDots className="h-10 w-10 text-gray-400 group-hover:text-[#A70909]" />
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-[#A70909]">
                        {title}
                    </h2>
                    <p className="mb-6 text-sm text-gray-600">
                        {summary}
                    </p>
                    <button className="mt-auto flex items-center gap-2 rounded-full bg-[#A70909] px-8 py-3 text-sm font-medium text-white transition-transform group-hover:scale-105">
                        {ctaText}
                    </button>
                </div>
            </Link>
        );
    }

    const shadowColors = [
        'hover:shadow-[0_8px_30px_rgba(147,51,234,0.4)]',   // Purple
        'hover:shadow-[0_8px_30px_rgba(79,70,229,0.4)]',    // Indigo
        'hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)]',    // Blue
        'hover:shadow-[0_8px_30px_rgba(22,163,74,0.4)]',    // Green
        'hover:shadow-[0_8px_30px_rgba(202,138,4,0.4)]',    // Yellow
        'hover:shadow-[0_8px_30px_rgba(234,88,12,0.4)]',    // Orange
        'hover:shadow-[0_8px_30px_rgba(220,38,38,0.4)]',    // Red
    ];
    const hoverShadowClass = shadowColors[index % shadowColors.length];

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[#f3dede] bg-white shadow-[0_8px_30px_rgba(167,9,9,0.1)] transition-all duration-300 ease-out ${hoverShadowClass}`}
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                {imagePath && !imageError ? (
                    <Image
                        src={imagePath}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="transform-gpu object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gray-50 text-gray-300">
                        <span className="text-4xl text-gray-400 font-bold opacity-20">Virintira</span>
                    </div>
                )}
                {/* Overlays */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-70 transition-opacity group-hover:opacity-70" aria-hidden="true" />
                <div
                    className="pointer-events-none absolute inset-0 z-[2] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: 'radial-gradient(circle at 20% 20%, rgba(167,9,9,0.18), transparent 55%)' }}
                    aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 right-4 z-[3]">
                    <h2 className="text-xl font-bold text-white drop-shadow-lg [text-shadow:0_2px_6px_rgba(0,0,0,0.8)]">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">
                    {summary}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-[#A70909]">
                    {ctaText}
                    <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
