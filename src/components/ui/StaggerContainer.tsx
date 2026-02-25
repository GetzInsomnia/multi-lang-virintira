'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

const container = {
    hidden: { opacity: 0 },
    show: (staggerDelay: number) => ({
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay
        }
    })
};

export function StaggerContainer({ children, className = '', staggerDelay = 0.15 }: StaggerContainerProps) {
    return (
        <motion.div
            variants={container}
            custom={staggerDelay}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const itemVariant: any = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <motion.div variants={itemVariant} className={className}>
            {children}
        </motion.div>
    );
}
