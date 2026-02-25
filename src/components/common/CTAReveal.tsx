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

export default function CTAReveal(props: CTARevealProps) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!open) return;
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleSocialOpen = () => setOpen(false);
    window.addEventListener('social:open', handleSocialOpen);
    return () => window.removeEventListener('social:open', handleSocialOpen);
  }, []);

  const { onExpandChange } = props;

  useEffect(() => {
    onExpandChange?.(open);
    window.dispatchEvent(new Event(open ? 'cta:open' : 'cta:close'));
  }, [open, onExpandChange]);

  useEffect(() => {
    if (open && containerRef.current) {
      setTimeout(() => {
        const first = containerRef.current?.querySelector<HTMLElement>(
          'a,button,[tabindex]:not([tabindex="-1"])',
        );
        first?.focus?.();
      }, 50);
    }
  }, [open]);

  return (
    <div ref={containerRef} className={`w-full flex justify-center ${props.className ?? ''}`}>
      {/* MOBILE COMPONENT (< 640px): Standard layout shifting with bottom-up entering children */}
      <div className="flex w-full justify-center sm:hidden">
        <CTARevealMobile {...props} open={open} setOpen={setOpen} triggerId={triggerId} />
      </div>

      {/* TABLET / DESKTOP COMPONENT (>= 640px): Explicit dimension animation, completely free of stretching/bouncing */}
      <div className="hidden w-full justify-center sm:flex">
        <CTARevealDesktop {...props} open={open} setOpen={setOpen} triggerId={triggerId} />
      </div>
    </div>
  );
}

// ==========================================
// MOBILE IMPLEMENTATION (Vertical Layout Flow)
// ==========================================
function CTARevealMobile({
  triggerLabel,
  groupClassName,
  children,
  variant,
  open,
  setOpen,
  triggerId,
}: CTARevealProps & { open: boolean; setOpen: (v: boolean) => void; triggerId: string }) {
  const isRed = variant === 'on-red';
  const triggerClass = isRed
    ? 'bg-white text-[#A70909] shadow-lg shadow-black/10'
    : 'bg-[#A70909] text-white shadow-lg shadow-[#a70909]/30';

  const triggerHover = isRed
    ? { scale: 1.05, backgroundColor: '#f9f9f9' }
    : { scale: 1.05, backgroundColor: '#8c0808' };

  // Super soft, luxurious transition curve
  // Kept enter slow/luxurious, but forced exit ultra-fast (0.15s) to ruthlessly eradicate the translucent "ghosting" afterimage.
  const luxTransition = { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const };
  const enterTransition = { duration: 0.8, delay: 0.1, ease: 'easeOut' as const };
  const exitTransition = { duration: 0.15, delay: 0, ease: 'easeIn' as const };

  const phantomRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  // Measure the intrinsic size of the phantom elements accurately to transition height 100% bounce-free
  useEffect(() => {
    if (!phantomRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const el = entries[0]?.target as HTMLElement;
      if (el) {
        setHeight(el.offsetHeight);
      }
    });
    observer.observe(phantomRef.current);
    return () => observer.disconnect();
  }, [open]);

  return (
    <>
      {/* 0. INVISIBLE CLOSURE BACKDROP (Makes tapping outside trivially easy on mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-[40]"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          aria-hidden="true"
        />
      )}

      {/* PARENT BOUNDS CONTROLLER: Native CSS Height Shift. Zero layout matrix projection. */}
      <motion.div
        animate={{ height }}
        transition={luxTransition}
        className="relative flex w-full flex-col items-center justify-start overflow-visible z-[50]"
      >
        {/* 1. PHANTOM MEASURER (Invisible Size Controller) */}
        <div
          className="absolute w-max pointer-events-none invisible flex justify-center items-start opacity-0"
          aria-hidden="true"
        >
          <div ref={phantomRef} className="flex flex-col items-center min-h-[50px]">
            {!open ? (
              <button
                type="button"
                className={[
                  'inline-flex min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full',
                  'px-8 py-3 text-base font-semibold whitespace-nowrap',
                  triggerClass,
                ].join(' ')}
              >
                {triggerLabel}
              </button>
            ) : (
              <div className={groupClassName || 'flex flex-col gap-3'}>
                {children}
              </div>
            )}
          </div>
        </div>

        {/* 2. VISUAL RENDERER (Absolute crossfade layering) */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none">
          {/* Default Trigger Button */}
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            className={[
              'absolute inline-flex min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full',
              'px-8 py-3 text-base font-semibold whitespace-nowrap shadow-xl',
              triggerClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            ].join(' ')}
            style={{ pointerEvents: !open ? 'auto' : 'none' }}
            whileHover={triggerHover}
            whileTap={{ scale: 0.95 }}
            aria-expanded={open}
            aria-controls={triggerId}
            initial={false}
            animate={
              !open ?
                isRed ? {
                  opacity: 1,
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(255, 255, 255, 0)',
                    '0 0 0 10px rgba(255, 255, 255, 0.1)',
                    '0 0 0 20px rgba(255, 255, 255, 0)',
                  ],
                  transition: {
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' },
                    opacity: enterTransition
                  },
                } : { opacity: 1, transition: { opacity: enterTransition } }
                : { opacity: 0, scale: 1, boxShadow: "0 0 0 0 rgba(255,255,255,0)", transition: exitTransition } // Fast exit
            }
          >
            <span className="whitespace-nowrap">{triggerLabel}</span>
          </motion.button>

          {/* 4 Icon Expanded Group */}
          <motion.div
            id={triggerId}
            initial={false}
            animate={{
              opacity: open ? 1 : 0
            }}
            transition={open ? enterTransition : exitTransition}
            style={{ pointerEvents: open ? 'auto' : 'none' }}
            // Removed w-full to allow grid to perfectly shrink-wrap the max-line width
            className={['absolute', groupClassName || 'flex flex-col gap-3'].join(' ')}
            aria-hidden={!open}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

// ==========================================
// DESKTOP IMPLEMENTATION (Explicit Dimension Animation)
// ==========================================
/*
  Why explicit dimensions instead of `layout`?
  Framer Motion's `layout` engine uses CSS `transform: scale()`. When parents stretch, absolute children stretch and warp heavily.
  By measuring the required size and manually animating CSS `width` and `height`, we completely bypass the projection matrix.
  The children can be simply `absolute` centered, smoothly transitioning via opacity with 0% warp/bounce.
*/
function CTARevealDesktop({
  triggerLabel,
  groupClassName,
  children,
  variant,
  open,
  setOpen,
  triggerId,
}: CTARevealProps & { open: boolean; setOpen: (v: boolean) => void; triggerId: string }) {
  const isRed = variant === 'on-red';
  const triggerClass = isRed
    ? 'bg-white text-[#A70909] shadow-lg shadow-black/10'
    : 'bg-[#A70909] text-white shadow-lg shadow-[#a70909]/30';

  const triggerHover = isRed
    ? { scale: 1.05, backgroundColor: '#f9f9f9' }
    : { scale: 1.05, backgroundColor: '#8c0808' };

  const phantomRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<{ width: number | 'auto'; height: number | 'auto' }>({ width: 'auto', height: 'auto' });

  // Measure the intrinsic size of the phantom elements accurately
  useEffect(() => {
    if (!phantomRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const el = entries[0]?.target as HTMLElement;
      if (el) {
        setBounds({ width: el.offsetWidth, height: el.offsetHeight });
      }
    });
    observer.observe(phantomRef.current);
    return () => observer.disconnect();
  }, [open]);

  const luxTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

  // Robust absolute crossfade logic with explicit width/height
  return (
    <motion.div
      animate={{ width: bounds.width, height: bounds.height }}
      transition={luxTransition}
      className="relative flex items-center justify-center overflow-visible"
    >
      {/* 1. PHANTOM MEASURER (Invisible Size Controller) */}
      <div
        className="absolute w-max pointer-events-none invisible flex justify-center items-center opacity-0"
        aria-hidden="true"
      >
        <div ref={phantomRef} className="flex flex-col items-center">
          {!open ? (
            <button
              type="button"
              className={[
                'inline-flex min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full',
                'px-8 py-3 text-base font-semibold whitespace-nowrap',
                triggerClass,
              ].join(' ')}
            >
              {triggerLabel}
            </button>
          ) : (
            <div className={groupClassName || 'flex flex-col gap-3'}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* 2. VISUAL RENDERER (Absolute pure crossfade layering) */}
      {/* We ALWAYS render both states and toggle opacity to guarantee zero mounting/layout tracking glitches */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        {/* Default Single Trigger Button */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className={[
            'absolute inline-flex min-w-[min(220px,calc(100vw-4rem))] items-center justify-center rounded-full',
            'px-8 py-3 text-base font-semibold whitespace-nowrap shadow-xl',
            triggerClass,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          ].join(' ')}
          style={{ pointerEvents: !open ? 'auto' : 'none' }}
          whileHover={triggerHover}
          whileTap={{ scale: 0.95 }}
          aria-expanded={open}
          aria-controls={triggerId}
          initial={false}
          animate={
            !open ?
              isRed ? {
                opacity: 1,
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255, 255, 255, 0)',
                  '0 0 0 10px rgba(255, 255, 255, 0.1)',
                  '0 0 0 20px rgba(255, 255, 255, 0)',
                ],
                transition: {
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' },
                  opacity: { duration: 0.45, delay: 0.25, ease: 'easeOut' } // Entering strictly wait 0.25
                },
              } : { opacity: 1, transition: { duration: 0.45, delay: 0.25, ease: 'easeOut' } } // Entering strictly wait 0.25
              : { opacity: 0, boxShadow: "0 0 0 0 rgba(255,255,255,0)", transition: { duration: 0.2, delay: 0, ease: 'easeIn' } } // Exiting
          }
        >
          <span className="whitespace-nowrap">{triggerLabel}</span>
        </motion.button>

        {/* 4 Icon Expanded Group */}
        <motion.div
          id={triggerId}
          initial={false}
          animate={{
            opacity: open ? 1 : 0
          }}
          transition={
            open ? { duration: 0.5, delay: 0.2, ease: 'easeOut' } // Entering waits for button to fade, then slides up
              : { duration: 0.2, delay: 0, ease: 'easeIn' } // Exiting instantly
          }
          style={{
            pointerEvents: open ? 'auto' : 'none',
          }}
          // min-w-max completely forbids the DOM from crunching the flex/grid children horizontally when the parent width collapses
          className={['absolute min-w-max', groupClassName || 'flex flex-col gap-3'].join(' ')}
          aria-hidden={!open}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
