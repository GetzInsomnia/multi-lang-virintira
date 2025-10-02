"use client";

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

export type MobileMenuEntry = {
  label: string;
  href?: string;
  description?: string;
  items?: MobileMenuEntry[];
};

type MobileMenuViewProps = {
  title: string;
  items: MobileMenuEntry[];
  onBack?: () => void;
  onSelectSubMenu?: (items: MobileMenuEntry[] | undefined, title: string) => void;
  onClose: () => void;
  index: number;
  current: number;
};

export function MobileMenuView({
  title,
  items,
  onBack,
  onSelectSubMenu,
  onClose,
  index,
  current,
}: MobileMenuViewProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === current) {
      requestAnimationFrame(() => setIsActive(true));
    } else {
      setIsActive(false);
    }
  }, [current, index]);

  const translate = index <= current ? 0 : 100;

  return (
    <div
      className="absolute inset-0 flex flex-col bg-white px-6 py-7 transition-transform duration-300 ease-out-soft"
      style={{ transform: `translateX(${translate}%)` }}
      aria-hidden={index !== current}
      data-active={isActive}
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-virintira-primary/25 bg-white text-virintira-primary shadow-[0_4px_8px_rgba(167,9,9,0.12)] transition-all duration-200 ease-out hover:bg-virintira-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="sr-only">Back</span>
          </button>
        ) : (
          <span className="h-10 w-10" />
        )}
        <h2 className="text-lg font-semibold text-virintira-primary">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-virintira-primary/25 bg-white text-virintira-primary shadow-[0_4px_8px_rgba(167,9,9,0.12)] transition-all duration-200 ease-out hover:bg-virintira-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <ul className="flex flex-col gap-4" role="menu" aria-label={title}>
        {items.map((item) => {
          if (item.items?.length) {
            return (
              <li key={item.label} role="none">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 rounded-xl bg-virintira-primary/10 px-4 py-3 text-left text-sm font-semibold text-neutral-800 transition-colors duration-150 ease-out hover:bg-virintira-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
                  onClick={() => onSelectSubMenu?.(item.items, item.label)}
                >
                  <span>
                    <span className="block">{item.label}</span>
                    {item.description ? (
                      <span className="mt-1 block text-xs font-medium text-neutral-500">{item.description}</span>
                    ) : null}
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm text-virintira-primary" />
                </button>
              </li>
            );
          }

          const href = item.href ?? '#';
          const content = (
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
              {item.description ? (
                <span className="mt-1 text-xs font-medium text-neutral-500">{item.description}</span>
              ) : null}
            </span>
          );

          if (href.startsWith('#') || isExternalHref(href)) {
            return (
              <li key={item.label} role="none">
                <a
                  href={href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-left text-sm font-semibold text-neutral-800 transition-colors duration-150 ease-out hover:bg-virintira-primary/10 hover:text-virintira-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
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
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-left text-sm font-semibold text-neutral-800 transition-colors duration-150 ease-out hover:bg-virintira-primary/10 hover:text-virintira-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
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
  );
}
