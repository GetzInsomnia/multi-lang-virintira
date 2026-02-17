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
}

export function ServiceCard({
    href,
    imagePath,
    title,
    summary,
    ctaText,
    variant = 'default',
    onClick
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

    return (
        <Link
            href={href}
            className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[#f3dede] bg-white shadow-[0_8px_30px_rgb(167,9,9,0.15)] transition-all duration-300 ease-out hover:shadow-[0_8px_30px_rgb(167,9,9,0.30)]"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                {imagePath && !imageError ? (
                    <Image
                        src={imagePath}
                        alt={title}
                        fill
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
                    <h2 className="text-xl font-bold text-white drop-shadow-md">
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
