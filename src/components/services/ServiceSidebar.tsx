'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { FaChevronDown } from 'react-icons/fa6';

export type SidebarItem = {
    slug: string;
    categorySlug: string; // Needed for link
    label: string;
    isActive: boolean;
};

interface ServiceSidebarProps {
    title: string;
    items: SidebarItem[];
}

export function ServiceSidebar({
    title,
    items,
}: ServiceSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex flex-col gap-4">
            {/* Mobile/Tablet Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 font-semibold text-gray-900 shadow-sm lg:hidden"
            >
                <span className="flex items-center gap-2">
                    {/* Hamburger removed */}
                    {title}
                </span>
                <FaChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Menu List (Desktop: Always visible, Mobile/Tablet: Conditional) */}
            <div
                className={`
            rounded-2xl border border-gray-100 bg-white p-2 shadow-sm
            lg:sticky lg:top-[calc(var(--header-height)+2rem)]
            ${isOpen ? 'block' : 'hidden'} lg:block
        `}
            >
                <div className="mb-2 hidden px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 lg:block">
                    {title}
                </div>
                <ul className="flex flex-col gap-1">
                    {items.map((item) => (
                        <li key={item.slug}>
                            <Link
                                href={`/services/${item.categorySlug}/${item.slug}`}
                                className={`
                  flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors
                  ${item.isActive ? 'bg-[#A70909]/5 text-[#A70909]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
