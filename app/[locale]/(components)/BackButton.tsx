"use client";

import type { ButtonHTMLAttributes } from 'react';

export function BackButton({ label = 'Back', className = '', ...props }: { label?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary/10 ${className}`}
      {...props}
    >
      <span aria-hidden className="inline-block rotate-180 text-lg">
        →
      </span>
      {label}
    </button>
  );
}
