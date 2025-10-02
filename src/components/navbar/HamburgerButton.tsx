"use client";

import type { ButtonHTMLAttributes } from 'react';

export function HamburgerButton({ isOpen, className = '', ...props }: { isOpen: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-virintira-border bg-white text-virintira-primary shadow transition-colors duration-200 ease-in-out hover:border-virintira-primary/60 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-virintira-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
      {...props}
    >
      <span className="relative block h-4 w-5">
        <span
          className={`absolute left-1/2 top-0 block h-0.5 w-5 -translate-x-1/2 transform rounded-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-current transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        />
        <span
          className={`absolute left-1/2 bottom-0 block h-0.5 w-5 -translate-x-1/2 transform rounded-full bg-current transition-transform duration-300 ease-in-out ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </span>
    </button>
  );
}
