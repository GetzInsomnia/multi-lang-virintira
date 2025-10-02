"use client";

import { useEffect, useState } from 'react';

import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

export type MobileMenuEntry = {
  label: string;
  href?: string;
  items?: MobileMenuEntry[];
};

type MobileMenuViewProps = {
  title: string;
  items: MobileMenuEntry[];
  onBack?: () => void;
  onSelectSubMenu?: (items: MobileMenuEntry[], title: string) => void;
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

  const translate = isActive ? 0 : 100;

  return (
    <div
      className="absolute inset-0 h-full w-full transform transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(${translate}%)` }}
    >
      <div className="flex h-full w-full flex-col bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-lg font-semibold text-[#A70909]"
            >
              ←
            </button>
          ) : (
            <span className="w-4" />
          )}
          <h2 className="text-lg font-semibold text-[#A70909]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl font-bold text-[#A70909]"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-4" role="menu" aria-label={title}>
          {items.map((item) => {
            if (item.items?.length) {
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onSelectSubMenu?.(item.items ?? [], item.label)}
                    className="w-full text-left text-base font-medium text-black transition hover:text-[#A70909]"
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            const href = item.href ?? '#';
            const label =
              item.label.includes('โปรโมชั่น') && !item.label.includes('🔥')
                ? (
                    <>
                      {item.label}{' '}
                      <span className="inline-block animate-bounce">🔥</span>
                    </>
                  )
                : (
                    item.label
                  );

            if (href.startsWith('#') || isExternalHref(href)) {
              return (
                <li key={item.label}>
                  <a
                    href={href}
                    onClick={onClose}
                    className="block text-base font-medium text-black transition hover:text-[#A70909]"
                  >
                    {label}
                  </a>
                </li>
              );
            }

            const normalized = normalizeInternalHref(href);
            return (
              <li key={item.label}>
                <Link
                  href={normalized}
                  onClick={onClose}
                  className="block text-base font-medium text-black transition hover:text-[#A70909]"
                  prefetch
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
