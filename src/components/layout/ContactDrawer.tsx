'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';
import ContactContent from '@/components/contact/ContactContent';
import {
    MOBILE_MENU_CLOSE_DELAY_MS,
    MOBILE_MENU_TRANSITION_DURATION_CLASS,
    MOBILE_MENU_TRANSITION_EASING_CLASS,
} from '@/components/navbar/mobileMenuTransition';

interface ContactDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
    const t = useTranslations('contact'); // Get translations
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);

    const backdropRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const raf1Ref = useRef<number | null>(null);
    const raf2Ref = useRef<number | null>(null);

    // Mount/Unmount logic with Scrollbar Compensation
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty('--removed-body-scroll-bar-size', `${scrollbarWidth}px`);
        } else {
            setShow(false);
            const id = setTimeout(() => {
                setMounted(false);
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                document.body.style.paddingRight = '';
                document.documentElement.style.removeProperty('--removed-body-scroll-bar-size');
            }, MOBILE_MENU_CLOSE_DELAY_MS);
            return () => {
                clearTimeout(id);
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                document.body.style.paddingRight = '';
                document.documentElement.style.removeProperty('--removed-body-scroll-bar-size');
            };
        }
    }, [isOpen]);

    // Animation logic
    useEffect(() => {
        const cancelQueuedFrames = () => {
            if (raf1Ref.current !== null) {
                cancelAnimationFrame(raf1Ref.current);
                raf1Ref.current = null;
            }
            if (raf2Ref.current !== null) {
                cancelAnimationFrame(raf2Ref.current);
                raf2Ref.current = null;
            }
        };

        if (!mounted || !isOpen) {
            cancelQueuedFrames();
            return;
        }

        raf1Ref.current = requestAnimationFrame(() => {
            raf2Ref.current = requestAnimationFrame(() => {
                setShow(true);
            });
        });

        return () => cancelQueuedFrames();
    }, [mounted, isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                aria-hidden="true"
                className={[
                    'fixed inset-0 bg-black/40 transition-opacity duration-300 ease-out',
                    show ? 'opacity-100' : 'opacity-0 pointer-events-none',
                ].join(' ')}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                className={[
                    'relative h-full w-full bg-slate-50 shadow-xl',
                    'transform transition-transform',
                    MOBILE_MENU_TRANSITION_DURATION_CLASS,
                    MOBILE_MENU_TRANSITION_EASING_CLASS,
                    show ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
            >
                <div className="flex h-full flex-col overflow-y-auto bg-slate-50">
                    {/* Header */}
                    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 bg-slate-50/80 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-[#A70909]">
                                {t('title')}
                            </span>
                        </div>

                        <button
                            onClick={onClose}
                            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-md transition-colors hover:border-[#A70909] hover:text-[#A70909] shadow-sm"
                            aria-label="Close contact form"
                        >
                            <span className="hidden sm:inline">{t('close')}</span>
                            <IoClose className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <ContactContent isDrawer={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
