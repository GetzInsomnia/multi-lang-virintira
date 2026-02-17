'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type CTARevealProps = {
  triggerLabel: string;
  className?: string;
  groupClassName?: string;
  onExpandChange?: (open: boolean) => void;
  children: ReactNode;
  variant?: 'default' | 'on-red';
};

export default function CTAReveal({
  triggerLabel,
  className,
  groupClassName,
  onExpandChange,
  children,
  variant = 'default',
}: CTARevealProps) {
  const [open, setOpen] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const triggerId = useId();

  const isRed = variant === 'on-red';
  const triggerClass = isRed
    ? 'bg-white text-[#A70909] shadow-lg shadow-black/10'
    : 'bg-[#A70909] text-white shadow-lg shadow-[#a70909]/30';

  const triggerHover = isRed
    ? { scale: 1.05, backgroundColor: '#f9f9f9' }
    : { scale: 1.05, backgroundColor: '#8c0808' };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!open) return;
      if (outerRef.current && !outerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleSocialOpen = () => setOpen(false);

    window.addEventListener('social:open', handleSocialOpen);
    return () => window.removeEventListener('social:open', handleSocialOpen);
  }, []);

  useEffect(() => {
    onExpandChange?.(open);
    window.dispatchEvent(new Event(open ? 'cta:open' : 'cta:close'));
  }, [open, onExpandChange]);

  useEffect(() => {
    if (open && groupRef.current) {
      const first = groupRef.current.querySelector<HTMLElement>(
        'a,button,[tabindex]:not([tabindex="-1"])',
      );
      first?.focus?.();
    }
  }, [open]);

  return (
    <motion.div
      layout
      transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
      ref={outerRef}
      className={className}
    >
      <div className="relative grid w-fit mx-auto grid-cols-1 grid-rows-1 items-center justify-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              layout="position"
              style={{ originX: 0.5, originY: 0.5 }}
              key="trigger"
              type="button"
              onClick={() => setOpen(true)}
              className={[
                'col-start-1 row-start-1',
                'z-10 inline-flex min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full',
                'px-8 py-3 text-base font-semibold',
                triggerClass,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
              ].join(' ')}
              initial={{ opacity: 0, scale: 1, y: 0, x: 0 }}
              animate={
                isRed
                  ? {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0)",
                      "0 0 0 10px rgba(255, 255, 255, 0.1)", // Ring pulse
                      "0 0 0 20px rgba(255, 255, 255, 0)"
                    ]
                  }
                  : { opacity: 1, scale: 1, y: 0, x: 0 }
              }
              exit={{ opacity: 0, scale: 1, y: 10, x: 0, transition: { duration: 0.2 } }}
              whileHover={triggerHover}
              whileTap={{ scale: 0.95 }}
              transition={
                isRed
                  ? {
                    opacity: { duration: 0.3 },
                    y: { duration: 0.3 },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeOut" }
                  }
                  : { duration: 0.3, ease: 'easeOut' }
              }
              aria-expanded={open}
              aria-controls={triggerId}
            >
              <span className="whitespace-nowrap">{triggerLabel}</span>
            </motion.button>
          ) : (
            <motion.div
              layout="position"
              style={{ originX: 0.5, originY: 0.5 }}
              key="content"
              id={triggerId}
              ref={groupRef}
              className={[
                'col-start-1 row-start-1',
                'z-20 flex w-full items-center justify-center gap-3',
                groupClassName ?? '',
              ].join(' ')}
              initial={{ opacity: 0, y: 10, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              aria-hidden={!open}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
