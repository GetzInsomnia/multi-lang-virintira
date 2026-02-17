'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import ContactDrawer from '@/components/layout/ContactDrawer';

export type ServiceGridItem = {
    href: string;
    imagePath?: string;
    title: string;
    summary: string;
    ctaText: string;
    variant?: 'default' | 'dashed';
    onClick?: () => void;
};

// Animation Variants (Staggered)
const itemAnim = {
    hidden: { opacity: 0, y: 40 },
    show: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.8,
            delay: index * 0.1 // Stagger delay based on index
        } as any
    })
};

import { useUI } from '@/context/UIContext';

export function ServiceGrid({ items }: { items: ServiceGridItem[] }) {
    const { openContactDrawer } = useUI();

    if (!items || items.length === 0) return null;

    const processedItems = items.map(item => {
        if (item.href === '#contact-drawer') {
            return {
                ...item,
                onClick: () => openContactDrawer()
            };
        }
        return item;
    });

    return (
        <div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
            {processedItems.map((item, index) => (
                <motion.div
                    key={`${item.href}-${index}`}
                    custom={index}
                    variants={itemAnim}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex h-full flex-col"
                >
                    <ServiceCard
                        href={item.href}
                        imagePath={item.imagePath}
                        title={item.title}
                        summary={item.summary}
                        ctaText={item.ctaText}
                        variant={item.variant}
                        onClick={item.onClick}
                    />
                </motion.div>
            ))}
        </div>
    );
}
