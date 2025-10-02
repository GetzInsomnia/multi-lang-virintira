"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

import { usePathname } from '@/i18n/routing';

import type { MegaMenuColumn, NavItem } from './types';
import { MobileMenuView } from './MobileMenuView';

export type MobileMenuProps = {
  open: boolean;
  nav: NavItem[];
  columns: MegaMenuColumn[];
  triggerLabel: string;
  onClose: () => void;
};

type MenuItem = {
  label: string;
  href?: string;
  description?: string;
  items?: MenuItem[];
};

const ROOT_TITLE = 'ViRINTIRA';

export function MobileMenu({ open, nav, columns, triggerLabel, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stack, setStack] = useState<{ title: string; items: MenuItem[] }[]>([
    { title: ROOT_TITLE, items: [] },
  ]);

  const derivedRoot = useMemo<MenuItem[]>(() => {
    const primaryItems: MenuItem[] = nav.map((item) => ({
      label: item.label,
      href: item.href,
      description: item.description,
      items: item.subMenu
        ? item.subMenu.map((section) => ({
            label: section.title || item.label,
            description: section.title ? undefined : item.description,
            items: section.items.map((entry) => ({
              label: entry.label,
              href: entry.href,
              description: entry.description,
            })),
          }))
        : undefined,
    }));

    if (columns.length) {
      const megaMenuItem: MenuItem = {
        label: triggerLabel,
        items: columns.map((column) => ({
          label: column.title,
          description: column.subtitle,
          items: column.items.map((item) => ({
            label: item.label,
            href: item.href,
            description: item.description,
          })),
        })),
      };

      const existingIndex = primaryItems.findIndex((item) => item.label === triggerLabel);
      if (existingIndex >= 0) {
        primaryItems[existingIndex] = {
          ...primaryItems[existingIndex],
          items: megaMenuItem.items,
        };
      } else {
        primaryItems.splice(1, 0, megaMenuItem);
      }
    }

    return primaryItems;
  }, [columns, nav, triggerLabel]);

  useEffect(() => {
    setStack([{ title: ROOT_TITLE, items: derivedRoot }]);
  }, [derivedRoot]);

  useEffect(() => {
    if (open) {
      setStack([{ title: ROOT_TITLE, items: derivedRoot }]);
    }
  }, [open, derivedRoot]);

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
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleSelect = (items: MenuItem[] | undefined, title: string) => {
    if (!items || !items.length) {
      onClose();
      return;
    }
    setStack((prev) => [...prev, { title, items }]);
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 data-[open=true]:pointer-events-auto"
      data-open={open}
      aria-hidden={!open}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute right-0 top-0 h-full w-[min(320px,85vw)] translate-x-full bg-white shadow-[-10px_0_40px_rgba(27,23,52,0.18)] transition-transform duration-300 ease-out data-[open=true]:translate-x-0"
        data-open={open}
      >
        <div className="relative h-full overflow-hidden">
          {stack.map((view, index) => (
            <MobileMenuView
              key={`${index}-${view.title}`}
              title={view.title}
              items={view.items}
              index={index}
              current={stack.length - 1}
              onBack={index > 0 ? handleBack : undefined}
              onSelectSubMenu={handleSelect}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 ease-out data-[open=true]:pointer-events-auto data-[open=true]:opacity-100"
        data-open={open}
        onClick={onClose}
      />
    </div>
  );
}
