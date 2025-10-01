"use client";

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-white">
      <div className="h-14 w-14 animate-pulse rounded-full border-4 border-virintira-primary border-t-transparent" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}
