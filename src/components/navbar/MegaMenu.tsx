"use client";

import { memo, useEffect, useState } from 'react';

import Image from 'next/image';

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import type { MegaMenuColumn } from './types';

export type MegaMenuProps = {
  columns: MegaMenuColumn[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLinkClick?: () => void;
};

function MegaMenuComponent({ columns, onMouseEnter, onMouseLeave, onLinkClick }: MegaMenuProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!columns.length) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-[var(--nav-h)] z-40 w-full transition-all duration-150 ease-out data-[open=false]:translate-y-2 data-[open=false]:opacity-0 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
      data-open={visible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="presentation"
    >
      <div
        className="mx-auto max-w-[1280px] rounded-b-3xl border-t border-black/5 bg-white shadow-2xl"
        role="menu"
      >
        <div className="grid gap-8 px-8 py-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-[#A70909]">{column.title}</span>
                {column.subtitle ? (
                  <span className="text-sm text-neutral-600">{column.subtitle}</span>
                ) : null}
              </div>
              <ul className="space-y-2" role="none">
                {column.items.map((item) => {
                  const href = item.href;
                  const content = (
                    <span className="flex flex-col gap-0.5 text-sm leading-7 text-neutral-700 transition-colors duration-150 ease-out">
                      <span className="font-semibold">{item.label}</span>
                      {item.description ? (
                        <span className="text-xs text-neutral-500">{item.description}</span>
                      ) : null}
                    </span>
                  );

                  if (isExternalHref(href) || href.startsWith('#')) {
                    return (
                      <li key={item.label} role="none">
                        <a
                          href={href}
                          className="block rounded-lg px-0 py-1 transition-colors duration-150 ease-out hover:text-[#A70909] focus-visible:text-[#A70909] focus-visible:outline-none"
                          onClick={onLinkClick}
                          role="menuitem"
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label} role="none">
                      <Link
                        href={normalizeInternalHref(href)}
                        className="block rounded-lg px-0 py-1 transition-colors duration-150 ease-out hover:text-[#A70909] focus-visible:text-[#A70909] focus-visible:outline-none"
                        onClick={onLinkClick}
                        role="menuitem"
                        prefetch
                      >
                        {content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#A70909]/10 bg-gradient-to-r from-[#FFF7F7]/95 to-white/95" role="presentation">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-8 py-6 text-xs text-neutral-600">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={COMPANY.legalNameEn}
                width={56}
                height={56}
                className="rounded-2xl shadow-[0_10px_30px_rgba(167,9,9,0.15)]"
              />
              <div>
                <p className="font-semibold text-[#A70909]">{COMPANY.legalNameTh}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-neutral-500">
                  {COMPANY.legalNameEn}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="font-semibold text-[#A70909]">{COMPANY.phoneDisplay}</span>
              <span>{COMPANY.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MegaMenu = memo(MegaMenuComponent);

export default MegaMenu;
