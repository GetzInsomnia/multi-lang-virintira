'use client';

import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Link } from '@/i18n/routing';
import { Fragment } from 'react';

export type BreadcrumbItem = {
    label: string;
    href: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
    homeLabel: string;
}

export function Breadcrumbs({ items, className, homeLabel }: BreadcrumbsProps) {
    // Always prepend Home
    const allItems = [{ label: homeLabel, href: '/' }, ...items];

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 sm:gap-2.5">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    const isHome = index === 0;

                    return (
                        <Fragment key={item.href}>
                            {!isHome && (
                                <FaChevronRight className="h-3 w-3 text-gray-400" aria-hidden="true" />
                            )}
                            <li className={`flex items-center ${isLast ? 'font-medium text-gray-900' : ''}`}>
                                {isLast ? (
                                    <span aria-current="page" className="line-clamp-1 max-w-[150px] sm:max-w-xs">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="flex items-center hover:text-gray-900 hover:underline"
                                    >
                                        {isHome ? (
                                            <>
                                                <FaHome className="h-4 w-4" />
                                                <span className="sr-only">Home</span>
                                            </>
                                        ) : (
                                            <span className="line-clamp-1 max-w-[100px] sm:max-w-none">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
