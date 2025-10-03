'use client';

import type { MouseEventHandler } from 'react';

import { Link } from '@/i18n/routing';

import type { MegaMenuColumn } from './types';

type MegaMenuProps = {
  open: boolean;
  columns: MegaMenuColumn[];
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onLinkClick?: () => void;
};

export default function MegaMenu({
  open,
  columns,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: MegaMenuProps) {
  return (
    <div
      id="mega-menu-panel"
      className="pointer-events-none absolute left-0 right-0 top-full z-40 flex justify-center pt-5 opacity-0 transition-opacity duration-150 ease-out data-[open=true]:pointer-events-auto data-[open=true]:opacity-100"
      data-open={open ? 'true' : 'false'}
    >
      <div
        className="pointer-events-auto w-full max-w-[1280px] rounded-xl bg-white p-8 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A70909]">
                  {column.title}
                </p>
                {column.subtitle ? (
                  <p className="mt-1 text-sm text-[#6B7280]">{column.subtitle}</p>
                ) : null}
              </div>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-[15px] font-medium text-[#2A2A2A] transition-colors duration-150 hover:text-[#A70909]"
                      onClick={onLinkClick}
                    >
                      <span className="block leading-snug">{item.label}</span>
                      {item.description ? (
                        <span className="text-sm text-[#6B7280]">{item.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
