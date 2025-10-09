// src/components/navbar/MobileMenuView.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

export type MenuItem = {
  label: string;
  href?: string;
  description?: string;
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
      // รอ 1 เฟรมก่อนเข้า เพื่อให้ได้ทรานซิชัน
      const id = requestAnimationFrame(() => setEnter(true));
      return () => cancelAnimationFrame(id);
    }
    setEnter(false);
  }, [current, index]);

  // สมูท: slide-in + fade (เหมือน legacy)
  const active = index === current;
  const tx = enter ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';

  return (
    <div
      className={[
        'absolute inset-0',
        'transition-[transform,opacity] duration-500 ease-in-out',
        'will-change-transform will-change-opacity',
        tx,
        active ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
    >
      <div className="bg-white w-full h-full p-6">
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
          <button
            onClick={onClose}
            className="text-[#A70909] text-2xl font-[1000]"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-4" role="menu" aria-label={title}>
          {items.map((item, idx) => {
            // กัน key ซ้ำ แม้ href จะเหมือนกัน
            const key = `${item.label}-${item.href ?? 'nohref'}-${idx}`;

            if (item.items && item.items.length > 0) {
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => onSelectSubMenu?.(item.items!, item.label)}
                    className="w-full text-left text-black hover:text-[#A70909] transition-colors font-medium text-base"
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
                    href={item.href}
                    onClick={onClose}
                    className="block text-black hover:text-[#A70909] transition-colors font-medium text-base"
                    prefetch
                    role="menuitem"
                  >
                    {item.label.includes('โปรโมชั่น') ? (
                      <>
                        โปรโมชั่น <span className="inline-block animate-bounce">🔥</span>
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
