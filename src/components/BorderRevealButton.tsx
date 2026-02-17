'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BorderRevealButtonProps {
    href: string;
    section?: string;
    item?: string;
    children: ReactNode;
    className?: string;
}

export default function BorderRevealButton({ href, children, className = '' }: BorderRevealButtonProps) {
    return (
        <Link
            href={href}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#A70909] bg-white px-8 py-3 font-bold text-[#A70909] transition-all duration-300 hover:border-[#A70909] hover:shadow-lg ${className}`}
        >
            {/* Fill Animation (Left to Right) - Negative inset to prevent sub-pixel white line */}
            <span className="absolute -inset-[1px] w-[calc(100%+2px)] translate-x-[-101%] bg-[#A70909] transition-transform duration-[400ms] ease-out group-hover:translate-x-0"></span>

            {/* Text and Icon */}
            <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                {children}
                {/* Chevron Right Icon */}
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </Link>
    );
}
