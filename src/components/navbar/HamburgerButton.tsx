"use client";

import type { ButtonHTMLAttributes } from 'react';

export function HamburgerButton({
  isOpen,
  className = '',
  ...props
}: { isOpen: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={`navbar-hamburger ${isOpen ? 'is-active' : ''} ${className}`}
      {...props}
    >
      <span className="navbar-hamburger-line top" />
      <span className="navbar-hamburger-line middle" />
      <span className="navbar-hamburger-line bottom" />
    </button>
  );
}
