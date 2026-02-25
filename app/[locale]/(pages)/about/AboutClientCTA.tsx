'use client';

import { useUI } from '@/context/UIContext';
import { motion } from 'framer-motion';

export default function AboutClientCTA({ triggerLabel }: { triggerLabel: string }) {
    const { openContactDrawer } = useUI();

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openContactDrawer}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#A70909] px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-red-900/20 transition-all hover:bg-[#850707] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A70909]/50"
        >
            {triggerLabel}
        </motion.button>
    );
}
