'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

type CTARevealProps = {
  triggerLabel: string;
  className?: string;
  groupClassName?: string;
  onExpandChange?: (open: boolean) => void;
  children: ReactNode;
};

export default function CTAReveal({
  triggerLabel,
  className,
  groupClassName,
  onExpandChange,
  children,
}: CTARevealProps) {
  const [open, setOpen] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();

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

  return (
    <div ref={outerRef} className={className}>
      <div className="grid items-start justify-items-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={[
            'col-start-1 row-start-1 inline-flex min-w-[220px] items-center justify-center rounded-full',
            'bg-[#A70909] px-8 py-3 text-sm font-semibold text-white',
            'shadow-lg shadow-[#a70909]/30 transition-transform duration-300 ease-out transition-opacity',
            'hover:-translate-y-[3px] hover:bg-[#8c0808]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            open ? 'pointer-events-none scale-95 opacity-0' : 'pointer-events-auto scale-100 opacity-100',
          ].join(' ')}
          aria-expanded={open}
          aria-controls={triggerId}
        >
          {triggerLabel}
        </button>

        <div
          id={triggerId}
          className={[
            'col-start-1 row-start-1 flex items-center justify-center gap-4 transition-transform duration-300 transition-opacity ease-out',
            groupClassName ?? '',
            open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
          ].join(' ')}
          aria-hidden={!open}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
