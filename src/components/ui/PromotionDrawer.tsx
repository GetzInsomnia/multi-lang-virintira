import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PromotionDetailsContent } from '@/components/ui/PromotionDetailsContent';
import { COMPANY } from '@/data/company';
import { useUI } from '@/context/UIContext';

interface PromotionItem {
    slug: string;
    title: string;
    category: string;
    shortInfo: string[];
    price: string;
    originalPrice: string;
    benefits: string[];
    conditions: string;
}

interface PromotionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    item?: PromotionItem;
    ui: {
        drawerTitle?: string;
        chatViaLine?: string;
        callNow?: string;
    };
}

export function PromotionDrawer({ isOpen, onClose, item, ui }: PromotionDrawerProps) {
    const { setPromotionDrawerOpen } = useUI();
    const [mounted, setMounted] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Sync global UI state for Navbar pushing
    useEffect(() => {
        setPromotionDrawerOpen(isOpen);
    }, [isOpen, setPromotionDrawerOpen]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Prevent background scrolling when open and avoid shift/jump
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const isClipSupported = CSS.supports('overflow', 'clip');
            const overflowValue = isClipSupported ? 'clip' : 'hidden';

            document.body.style.overflow = overflowValue;
            document.documentElement.style.overflow = overflowValue;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty('--removed-body-scroll-bar-size', `${scrollbarWidth}px`);
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.removeProperty('--removed-body-scroll-bar-size');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
            document.documentElement.style.removeProperty('--removed-body-scroll-bar-size');
        };
    }, [isOpen]);

    if (!item || !mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm"
                    />

                    {/* Drawer Panel - Full Screen Overlay */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] flex flex-col bg-white shadow-2xl"
                    >
                        {/* Header (Sticky inside the full screen modal) */}
                        <div className="flex z-[60] bg-white items-center justify-between border-b border-gray-100 px-6 py-4 shadow-sm sticky top-0">
                            <h2 className="text-xl font-bold text-[#A70909]">{ui?.drawerTitle || 'โปรโมชั่นและสิทธิพิเศษ'}</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 bg-gray-50 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                                aria-label="Close promotion"
                            >
                                <FaXmark className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content Body (Scrollable, rendering actual Promotion UI) */}
                        <div className="flex-1 overflow-y-auto bg-[#FFFEFE]" ref={scrollAreaRef}>
                            <div className="pt-4 sm:pt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <PromotionDetailsContent item={item} ui={ui} />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
