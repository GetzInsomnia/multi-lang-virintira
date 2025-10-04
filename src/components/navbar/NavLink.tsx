'use client';

import type { FocusEventHandler, MouseEventHandler } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';

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
  const baseClasses =
    "group relative text-[17px] font-normal leading-none tracking-tight text-[#2A2A2A] transition-colors duration-200 hover:text-[#A70909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30 after:absolute after:bottom-[-24px] after:left-0 after:right-0 after:h-[7px] after:w-full after:rounded-t-full after:bg-[#A70909] after:content-[''] after:origin-center after:scale-0 after:transition-transform after:duration-200 group-hover:after:scale-100 aria-[current=true]:text-[#A70909] aria-[expanded=true]:text-[#A70909] aria-[current=true]:after:scale-100 aria-[expanded=true]:after:scale-100";
  const classes = active ? `${baseClasses} text-[#A70909]` : baseClasses;

  return (
    <Link
      href={href}
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
      <span className="inline-flex items-center gap-2">
        {flame ? (
          <FontAwesomeIcon
            icon={faFire}
            className="h-4 w-4 self-center text-[#A70909] animate-bounce"
          />
        ) : null}
        <span>{label}</span>
      </span>
    </Link>
  );
}
