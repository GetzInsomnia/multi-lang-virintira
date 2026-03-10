import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { useEffect } from 'react';

interface PromotionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    content?: {
        title: string;
        subtitle: string;
        cta: string;
    };
}

export function PromotionDrawer({ isOpen, onClose, content }: PromotionDrawerProps) {
    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Optional: prevent iOS Safari overscroll bounce
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    if (!content) return null;

    return (
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

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-md flex-col bg-white shadow-2xl sm:w-[400px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h2 className="text-xl font-bold text-gray-900">{content.title}</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                aria-label="Close promotion"
                            >
                                <FaXmark className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content Body (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <p className="text-base text-gray-600 mb-6">
                                {content.subtitle}
                            </p>

                            {/* Placeholder for future detailed content */}
                            <div className="rounded-2xl bg-red-50 p-6 border border-red-100 flex items-center justify-center flex-col text-center space-y-3">
                                <div className="text-4xl">🔥</div>
                                <h3 className="font-bold text-[#A70909] text-lg">Special Discount!</h3>
                                <p className="text-sm text-red-800">Please check back soon for the full details of this promotion.</p>
                            </div>
                        </div>

                        {/* Footer / CTA Action */}
                        <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                            <button
                                onClick={onClose}
                                className="w-full rounded-full bg-[#A70909] py-3.5 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-900/30"
                            >
                                เข้าใจแล้ว
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
