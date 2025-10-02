"use client";

import type { ButtonHTMLAttributes } from 'react';

export function SearchToggle({ active, className = '', ...props }: { active: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`hidden h-10 w-10 items-center justify-center rounded-full border border-virintira-border bg-white text-virintira-primary transition-colors duration-200 ease-in-out hover:border-virintira-primary/60 hover:shadow lg:flex focus-visible:ring-2 focus-visible:ring-virintira-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${active ? 'shadow-inner' : 'shadow'} ${className}`}
      {...props}
    >
      <span className="sr-only">Toggle search</span>
      <span aria-hidden className="text-lg">
        {active ? '×' : '⌕'}
      </span>
    </button>
  );
}
