'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInProps {
    children: ReactNode;
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    duration?: number;
    className?: string;
}

export function SlideIn({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    className = ''
}: SlideInProps) {

    const getInitialPosition = () => {
        switch (direction) {
            case 'left': return { opacity: 0, x: -50 };
            case 'right': return { opacity: 0, x: 50 };
            case 'down': return { opacity: 0, y: -40 };
            case 'up':
            default: return { opacity: 0, y: 40 };
        }
    };

    return (
        <motion.div
            initial={getInitialPosition()}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
