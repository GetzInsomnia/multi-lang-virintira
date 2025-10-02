"use client";

import type { ButtonHTMLAttributes } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

type SearchToggleProps = {
  active: boolean;
  srLabel: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function SearchToggle({
  active,
  className = '',
  srLabel,
  ...props
}: SearchToggleProps) {
  const baseClasses =
    'flex h-10 w-10 items-center justify-center rounded-full border border-virintira-primary/25 bg-white text-virintira-primary shadow-[0_4px_8px_rgba(167,9,9,0.12)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40 hover:bg-virintira-primary hover:text-white';
  const activeClasses = active
    ? 'bg-virintira-primary text-white shadow-[0_12px_30px_rgba(167,9,9,0.25)]'
    : '';

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-expanded={active}
      data-active={active}
      className={`${baseClasses} ${activeClasses} ${className}`.trim()}
      {...props}
    >
      <span className="sr-only">{srLabel}</span>
      <FontAwesomeIcon icon={active ? faXmark : faMagnifyingGlass} className="text-[0.95rem]" />
    </button>
  );
}
