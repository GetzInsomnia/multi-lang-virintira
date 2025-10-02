"use client";

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import type { MegaMenuColumn } from './types';

export function MegaMenu({
  columns,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: {
  columns: MegaMenuColumn[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLinkClick?: () => void;
}) {
  return (
    <div
      className="fixed left-0 top-[var(--header-height,72px)] z-40 w-full border-t border-gray-200 bg-white shadow-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 py-6 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <h4 className="text-base font-semibold text-[#A70909]">{column.title}</h4>
            <ul className="space-y-2">
              {column.items.map((item) => {
                const href = item.href;
                const isAnchor = href.startsWith('#');
                const isExternal = isExternalHref(href);
                const label = item.label;

                if (isAnchor || isExternal) {
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        onClick={onLinkClick}
                        className="block text-gray-700 transition hover:text-[#A70909]"
                      >
                        {label}
                      </a>
                    </li>
                  );
                }

                const normalized = normalizeInternalHref(href);
                return (
                  <li key={label}>
                    <Link
                      href={normalized}
                      onClick={onLinkClick}
                      className="block text-gray-700 transition hover:text-[#A70909]"
                      prefetch
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 text-xs text-gray-600">
          <span>{COMPANY.legalNameTh}</span>
          <span>{COMPANY.phoneDisplay}</span>
        </div>
      </div>
    </div>
  );
}
