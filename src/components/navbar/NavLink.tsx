'use client';

import type { FocusEventHandler, MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

type NavLinkProps = {
  href: string;
  label: string;
  flame?: boolean;
  active?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  role?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
};

export default function NavLink({
  href,
  label,
  flame,
  active,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  role,
  ariaControls,
  ariaExpanded,
}: NavLinkProps) {
  // ทำให้เป็น inline-flex แล้วผูก pseudo-element กับลิงก์โดยตรง
  // (ใช้ hover:after/aria:after ไม่ใช้ group-hover)
  const baseClasses = [
    // กล่องลิงก์
    'relative inline-flex h-[30px] items-center gap-2 leading-none',

    // ตัวอักษร + transition
    'text-[17px] font-normal tracking-tight text-[#2A2A2A]',
    'transition-colors duration-200 hover:text-[#A70909]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30',

    // ── แถบแดงใต้เมนู ─────────────────────────────────────────────
    // ปรับค่า bottom ให้ตรงกับตำแหน่งที่พอใจ (-18px/-20px แล้วแต่ดีไซน์)
    'after:pointer-events-none after:absolute after:left-0 after:right-0 after:bottom-[-21px]',
    'after:h-[7px] after:rounded-t-full after:bg-[#A70909] after:content-[""]',
    'after:origin-center after:scale-x-0 after:transition-transform after:duration-200',

    // โชว์เส้นตอน hover/focus และตอน active/expanded
    'hover:after:scale-x-100 focus-visible:after:scale-x-100',
    'aria-[current=true]:text-[#A70909] aria-[expanded=true]:text-[#A70909]',
    'aria-[current=true]:after:scale-x-100 aria-[expanded=true]:after:scale-x-100',
  ].join(' ');

  const classes = active ? `${baseClasses} text-[#A70909]` : baseClasses;

  return (
    <Link
      href={normalizeInternalHref(href)}
      className={classes}
      aria-current={active ? 'true' : undefined}
      data-flame={flame ? 'true' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      role={role}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
    >
      {flame ? (
        <FontAwesomeIcon
          icon={faFire}
          className="h-4 w-4 text-[#A70909] animate-bounce relative -top-px align-middle"
        />
      ) : null}
      <span className="leading-none">{label}</span>
    </Link>
  );
}
