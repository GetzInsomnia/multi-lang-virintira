"use client";

import { memo, useEffect, useState } from 'react';
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
      className="pointer-events-none absolute left-0 right-0 top-full z-40 transition-all duration-150 ease-out data-[open=false]:translate-y-2 data-[open=false]:opacity-0 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
      data-open={visible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="presentation"
    >
      <div
        className="mx-auto max-w-[1280px] rounded-b-3xl border-t border-black/5 bg-white shadow-2xl"
        role="menu"
      >
        <div className="grid gap-x-10 gap-y-8 px-10 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
      </div>
    </div>
  );
}

export const MegaMenu = memo(MegaMenuComponent);

export default MegaMenu;
