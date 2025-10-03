'use client';

import type { ButtonHTMLAttributes } from 'react';

type HamburgerButtonProps = {
  isOpen: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function HamburgerButton({ isOpen, className = '', ...props }: HamburgerButtonProps) {
  const baseClasses =
    'relative flex h-10 w-10 items-center justify-center rounded-full border border-[#A70909]/25 bg-white text-[#A70909] shadow-[0_4px_8px_rgba(167,9,9,0.12)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40 hover:bg-[#A70909] hover:text-white';
  const activeClasses = isOpen
    ? 'bg-[#A70909] text-white shadow-[0_12px_30px_rgba(167,9,9,0.25)]'
    : '';
  const lineBase =
    'absolute h-0.5 w-6 rounded-full bg-current transition-all duration-200 ease-out-soft';

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={`${baseClasses} ${activeClasses} ${className}`.trim()}
      {...props}
    >
      <span className={`${lineBase} ${isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[6px]'}`} />
      <span className={`${lineBase} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`${lineBase} ${isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[6px]'}`} />
    </button>
  );
}
