"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

import { usePathname } from '@/i18n/routing';

import type { MegaMenuColumn, NavItem } from './types';
import { MobileMenuView } from './MobileMenuView';

type MenuItem = {
  label: string;
  href?: string;
  items?: MenuItem[];
};

export function MobileMenu({
  open,
  nav,
  columns,
  triggerLabel,
  onClose,
}: {
  open: boolean;
  nav: NavItem[];
  columns: MegaMenuColumn[];
  triggerLabel: string;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stack, setStack] = useState<{ title: string; items: MenuItem[] }[]>([]);

  const rootItems = useMemo<MenuItem[]>(() => {
    const baseItems: MenuItem[] = nav.map((item) => ({
      label: item.label,
      href: item.href,
    }));

    if (columns.length) {
      baseItems.splice(1, 0, {
        label: triggerLabel,
        items: columns.map((column) => ({
          label: column.title,
          items: column.items.map((subItem) => ({
            label: subItem.label,
            href: subItem.href,
          })),
        })),
      });
    }

    return baseItems;
  }, [columns, nav, triggerLabel]);

  useEffect(() => {
    setStack([{ title: 'ViRINTIRA', items: rootItems }]);
  }, [rootItems]);

  useEffect(() => {
    if (open) {
      setStack([{ title: 'ViRINTIRA', items: rootItems }]);
    }
  }, [open, rootItems]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    onClose();
  }, [pathname, open, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  const handleBack = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  const handleSelectSubMenu = (items: MenuItem[], title: string) => {
    setStack((prev) => [...prev, { title, items }]);
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : ''}`}
    >
      <div
        ref={containerRef}
        className={`absolute right-0 top-0 h-full w-4/5 max-w-xs transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative h-full w-full overflow-hidden">
          {stack.map((view, index) => (
            <MobileMenuView
              key={`${index}-${view.title}`}
              title={view.title}
              items={view.items}
              index={index}
              current={stack.length - 1}
              onBack={index > 0 ? handleBack : undefined}
              onSelectSubMenu={handleSelectSubMenu}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Close menu"
        className={`absolute inset-0 h-full w-full transition ${open ? 'bg-black/20' : 'bg-transparent'}`}
        onClick={onClose}
      />
    </div>
  );
}
