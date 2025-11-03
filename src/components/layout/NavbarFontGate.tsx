'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

const FONT_TIMEOUT_MS = 1200;

export default function NavbarFontGate({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let tid: ReturnType<typeof setTimeout> | undefined;

    const reveal = () => {
      if (!cancelled) setRevealed(true);
    };

    if (typeof document !== 'undefined' && 'fonts' in document) {
      tid = setTimeout(reveal, FONT_TIMEOUT_MS);
      (document as Document & { fonts: FontFaceSet }).fonts.ready.then(() => {
        if (tid) clearTimeout(tid);
        reveal();
      });
    } else {
      reveal();
    }

    return () => {
      cancelled = true;
      if (tid) clearTimeout(tid);
    };
  }, []);

  if (!revealed) {
    return (
      <div
        className="sticky top-0 z-50 bg-white shadow-sm"
        style={{ '--header-height': '72px' } as CSSProperties}
        aria-hidden
      >
        <div className="relative mx-auto max-w-[1280px] px-4">
          <div className="h-[var(--header-height)]" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
