'use client';

import type { ButtonHTMLAttributes } from 'react';

type HamburgerButtonProps = {
  isOpen: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function HamburgerButton({ isOpen, className = '', ...props }: HamburgerButtonProps) {
  // ปุ่มเรียบ ๆ ขนาดเท่าปุ่มอื่น
  const baseBtn = 'inline-flex h-8 w-8 items-center justify-center text-[#A70909] translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30';

  // เส้น: 3px, ความยาว 20px, ขยับเป็นจำนวนเต็มพิกเซล เพื่อลดอาการเบลอ
  const line = 'absolute h-[3px] w-5 rounded-full bg-current transition-transform duration-200 will-change-transform';

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={`${baseBtn} ${className}`.trim()}
      {...props}
    >
      <span className={`${line} ${isOpen ? 'translate-y-0 rotate-45' : '-translate-y-[6px]'}`} />
      <span className={`${line} ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`${line} ${isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[6px]'}`} />
    </button>
  );
}
