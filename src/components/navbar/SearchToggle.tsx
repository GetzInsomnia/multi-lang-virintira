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
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-expanded={active}
      className={`navbar-search-toggle ${active ? 'is-active' : ''} ${className}`}
      {...props}
    >
      <span className="sr-only">{srLabel}</span>
      <FontAwesomeIcon
        icon={active ? faXmark : faMagnifyingGlass}
        className="navbar-search-toggle-icon"
      />
    </button>
  );
}
