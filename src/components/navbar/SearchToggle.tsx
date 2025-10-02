"use client";

import type { ButtonHTMLAttributes } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

export function SearchToggle({
  active,
  className = '',
  ...props
}: { active: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`navbar-search-toggle ${active ? 'is-active' : ''} ${className}`}
      {...props}
    >
      <span className="sr-only">Toggle search</span>
      <FontAwesomeIcon
        icon={active ? faXmark : faMagnifyingGlass}
        className="navbar-search-toggle-icon"
      />
    </button>
  );
}
