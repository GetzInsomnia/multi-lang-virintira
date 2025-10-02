"use client";

import { memo } from 'react';

import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import type { SubMenuSection } from './types';

export type SubMenuProps = {
  sections: SubMenuSection[];
  onItemClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function SubMenuComponent({ sections, onItemClick, onMouseEnter, onMouseLeave }: SubMenuProps) {
  if (!sections.length) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-full z-40 mt-8 w-max -translate-x-1/2"
      role="presentation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="pointer-events-auto grid min-w-[260px] gap-6 rounded-2xl bg-white px-8 py-6 text-sm shadow-[0_30px_60px_rgba(27,23,52,0.12)] sm:grid-cols-2"
        role="menu"
      >
        {sections.map((section, index) => (
          <div key={`${section.title ?? 'section'}-${index}`} className="flex flex-col gap-3">
            {section.title ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-virintira-primary">
                {section.title}
              </p>
            ) : null}
            <ul className="space-y-2" role="none">
              {section.items.map((item) => {
                const href = item.href;
                const content = (
                  <span className="flex flex-col gap-0.5 text-neutral-700 transition-colors duration-150 ease-out">
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
                        className="block rounded-lg px-0 py-1 transition-colors duration-150 ease-out hover:text-virintira-primary focus-visible:text-virintira-primary focus-visible:outline-none"
                        role="menuitem"
                        onClick={onItemClick}
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
                      className="block rounded-lg px-0 py-1 transition-colors duration-150 ease-out hover:text-virintira-primary focus-visible:text-virintira-primary focus-visible:outline-none"
                      role="menuitem"
                      onClick={onItemClick}
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
  );
}

export const SubMenu = memo(SubMenuComponent);

export default SubMenu;
