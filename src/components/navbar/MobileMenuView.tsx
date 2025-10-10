'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

export type MenuItem = {
  label: string;
  href?: string;
  description?: string;
  highlight?: boolean;
  items?: MenuItem[];
};

export default function MobileMenuView({
  title,
  items,
  onBack,
  onSelectSubMenu,
  onClose,
  index,
  current,
}: {
  title: string;
  items: MenuItem[];
  onBack?: () => void;
  onSelectSubMenu?: (items: MenuItem[], title: string) => void;
  onClose: () => void;
  index: number;
  current: number;
}) {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    if (index === current) {
      const id = requestAnimationFrame(() => setEnter(true));
      return () => cancelAnimationFrame(id);
    }
    setEnter(false);
  }, [current, index]);

  const active = index === current;

  return (
    <div
      className={[
        'absolute inset-0',
        'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0,0,1)]',
        'will-change-transform will-change-opacity',
        enter ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        active ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
    >
      <div className="bg-white w-full h-full p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-[#A70909] text-xl"
              aria-label="Back"
            >
              <FaChevronLeft />
            </button>
          ) : (
            <div />
          )}

          <h2 className="text-lg font-semibold text-[#A70909]">{title}</h2>

          {/* ✅ ปุ่มปิดแบบ faXmark */}
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="text-[#A70909] text-xl hover:opacity-80 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* ✅ เมนูทั้งหมดเป็นสีดำ (รวมบรรทัดแรก) */}
        <ul className="space-y-4" role="menu" aria-label={title}>
          {items.map((item, idx) => {
            const key = `${item.label}-${item.href ?? 'nohref'}-${idx}`;
            if (item.items && item.items.length > 0) {
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => onSelectSubMenu?.(item.items!, item.label)}
                    className="w-full text-left text-black hover:text-[#A70909] transition-colors font-normal text-base"
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            if (item.href) {
              return (
                <li key={key}>
                  <Link
                    href={normalizeInternalHref(item.href)}
                    onClick={onClose}
                    className="block text-black hover:text-[#A70909] transition-colors font-normal text-base"
                    prefetch
                    role="menuitem"
                  >
                    {item.highlight ? (
                      <>
                        {item.label}{' '}
                        <FontAwesomeIcon
                          icon={faFire}
                          className="inline-block animate-bounce text-[#A70909]"
                        />
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                </li>
              );
            }

            return (
              <li key={key}>
                <span className="text-black font-medium text-base">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
