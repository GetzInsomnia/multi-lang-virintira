"use client";

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

import type { MegaMenuColumn, NavItem } from './types';
import { MobileMenuView } from './MobileMenuView';

export function MobileMenu({
  open,
  nav,
  columns,
  ctaPrimary,
  ctaSecondary,
  onClose,
}: {
  open: boolean;
  nav: NavItem[];
  columns: MegaMenuColumn[];
  ctaPrimary: string;
  ctaSecondary: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;
  const portalTarget = document.body;
  if (!portalTarget) return null;
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 h-full w-full max-w-sm overflow-hidden bg-white shadow-2xl">
        <MobileMenuView
          nav={nav}
          columns={columns}
          ctaPrimary={ctaPrimary}
          ctaSecondary={ctaSecondary}
          onClose={onClose}
        />
      </div>
      <button
        type="button"
        className="absolute inset-y-0 left-0 h-full w-full max-w-[calc(100%-16rem)]"
        onClick={onClose}
        aria-label="Close menu"
      />
    </div>,
    portalTarget,
  );
}
