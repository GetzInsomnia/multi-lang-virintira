'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenuView from './MobileMenuView';

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
}

export default function MobileMenu({
  isOpen,
  onClose,
  openerRef,
  rootTitle = 'ViRINTIRA',
  items,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [stack, setStack] = useState<{ title: string; items: MenuItem[] }[]>([
    { title: rootTitle, items },
  ]);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openingLock = useRef(false);
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
      let raf1: number | null = null;
      let raf2: number | null = null;

      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShow(true));
      });

      openingLock.current = true;
      const id = setTimeout(() => {
        openingLock.current = false;
      }, 250);
      return () => {
        clearTimeout(id);
        if (raf1 !== null) cancelAnimationFrame(raf1);
        if (raf2 !== null) cancelAnimationFrame(raf2);
      };
    } else {
      setShow(false);
      const id = setTimeout(() => setMounted(false), 350); // ← เพิ่มเล็กน้อยให้เนียนขึ้น
      return () => clearTimeout(id);
    }
  }, [isOpen]);

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
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-out',
          show ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onClose}
      />

      {/* ✅ Slide Panel - synced transition */}
      <div
        ref={panelRef}
        className={[
          'fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-lg',
          'transform transition-[transform,opacity] duration-900 ease-[cubic-bezier(0.2,0,0,1)]',
          show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0', // 👈 sync delay
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
              onBack={index > 0 ? handleBack : undefined}
              onSelectSubMenu={handleSelectSubMenu}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </>
  );
}
