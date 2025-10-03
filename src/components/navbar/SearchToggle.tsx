"use client";

import type { ButtonHTMLAttributes } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
    'inline-flex items-center justify-center p-2 text-[1.05rem] text-[#221F1F] transition-colors duration-200 hover:text-[#A70909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30';

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-expanded={active}
      data-active={active}
      className={`${baseClasses} ${active ? 'text-[#A70909]' : ''} ${className}`.trim()}
      {...props}
    >
      <span className="sr-only">{srLabel}</span>
      <FontAwesomeIcon icon={faSearch} />
    </button>
  );
}
