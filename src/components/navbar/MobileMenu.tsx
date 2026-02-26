'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenuView from './MobileMenuView';
import {
  MOBILE_MENU_CLOSE_DELAY_MS,
  MOBILE_MENU_TRANSITION_DURATION_CLASS,
  MOBILE_MENU_TRANSITION_EASING_CLASS,
} from './mobileMenuTransition';

export interface MenuItem {
  label: string;
  href?: string;
  items?: MenuItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  openerRef?: React.RefObject<HTMLElement>;
  rootTitle?: string;
  items: MenuItem[];
  compactActions?: boolean;
  onRequestSearch?: () => void;
  languageLocales?: readonly string[];
  currentLocale?: string;
  onSelectLocale?: (locale: string) => void;
  languageLabel?: string;
  searchLabel?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  openerRef,
  rootTitle = 'ViRINTIRA',
  items,
  compactActions = false,
  onRequestSearch,
  languageLocales,
  currentLocale,
  onSelectLocale,
  languageLabel,
  searchLabel,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [stack, setStack] = useState<{ title: string; items: MenuItem[] }[]>([
    { title: rootTitle, items },
  ]);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openingLock = useRef(false);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  const pathname = usePathname();

  /** ✅ ป้องกัน onClose() รันตอน mount ครั้งแรก */
  const lastPathRef = useRef(pathname);
  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    onClose();
  }, [pathname, onClose]);

  /** ✅ Mount / Unmount + sync panel & content transition */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);

      openingLock.current = true;
      const id = setTimeout(() => {
        openingLock.current = false;
      }, 250);
      return () => {
        clearTimeout(id);
      };
    }

    setShow(false);
    const id = setTimeout(() => setMounted(false), MOBILE_MENU_CLOSE_DELAY_MS); // ← เพิ่มเล็กน้อยให้เนียนขึ้น
    return () => clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    const cancelQueuedFrames = () => {
      if (raf1Ref.current !== null) {
        cancelAnimationFrame(raf1Ref.current);
        raf1Ref.current = null;
      }
      if (raf2Ref.current !== null) {
        cancelAnimationFrame(raf2Ref.current);
        raf2Ref.current = null;
      }
    };

    if (!mounted || !isOpen) {
      cancelQueuedFrames();
      return undefined;
    }

    raf1Ref.current = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        setShow(true);
      });
    });

    return () => {
      cancelQueuedFrames();
    };
  }, [mounted, isOpen]);

  // ปิดด้วย ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // outside-click แบบปลอดภัย
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: MouseEvent) => {
      if (openingLock.current) return;
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (openerRef?.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener('mousedown', handler, true);
    return () => document.removeEventListener('mousedown', handler, true);
  }, [isOpen, onClose, openerRef]);

  // รีเซ็ต stack เมื่อปิด
  useEffect(() => {
    if (!isOpen) setStack([{ title: rootTitle, items }]);
  }, [isOpen, items, rootTitle]);

  const handleBack = () => setStack((prev) => prev.slice(0, -1));
  const handleSelectSubMenu = (items: MenuItem[], title: string) =>
    setStack((prev) => [...prev, { title, items }]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        aria-hidden
        className={[
          'fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ease-out',
          show ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onClose}
      />

      {/* ✅ Slide Panel - synced transition */}
      <div
        ref={panelRef}
        className={[
          'fixed top-0 right-0 z-[80] h-full w-4/5 max-w-xs bg-white shadow-lg',
          'transform transition-transform',
          'opacity-100',
          MOBILE_MENU_TRANSITION_DURATION_CLASS,
          MOBILE_MENU_TRANSITION_EASING_CLASS,
          show ? 'translate-x-0' : 'translate-x-full', // 👈 sync delay
        ].join(' ')}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full overflow-hidden">
          {stack.map((view, index) => (
            <MobileMenuView
              key={`${index}-${view.title}`}
              title={view.title}
              items={view.items}
              index={index}
              current={stack.length - 1}
              panelVisible={show}
              onBack={index > 0 ? handleBack : undefined}
              onSelectSubMenu={handleSelectSubMenu}
              onClose={onClose}
              showUtilities={compactActions && index === 0}
              onUtilitySearch={onRequestSearch}
              languageLocales={languageLocales}
              currentLocale={currentLocale}
              onUtilityLocaleSelect={onSelectLocale}
              languageLabel={languageLabel}
              searchLabel={searchLabel}
            />
          ))}
        </div>
      </div>
    </>
  );
}
