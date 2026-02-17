"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // 1. Force "auto" scroll behavior immediately on route change
    // This prevents the "smooth" CSS from interfering with our explicit restoration/reset
    const originalBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let rafId: number;
    let timeoutId: NodeJS.Timeout;
    const startTime = Date.now();
    const RESTORE_DURATION = 1000; // Keep aggressive restoration for 1s to cover loading.tsx

    // 2. Determine Target Position
    const saved = sessionStorage.getItem("vir-scrollY");
    // If saved exists, use it. Otherwise, force top (0).
    const targetY = saved ? (Number(saved) || 0) : 0;

    const restoreScroll = () => {
      // Force scroll to target
      window.scrollTo(0, targetY);

      // Continue for the duration to fight layout shifts
      if (Date.now() - startTime < RESTORE_DURATION) {
        rafId = requestAnimationFrame(restoreScroll);
      } else {
        // 3. Cleanup & Restore "Smooth" behavior after we are stable
        if (saved) sessionStorage.removeItem("vir-scrollY");
        // Only revert to smooth if that was the original setting (or default to smooth)
        // We defer this slightly to ensure the last auto-scroll takes effect
        document.documentElement.style.scrollBehavior = "smooth";
      }
    };

    // Start the loop
    restoreScroll();

    // Safety timeout to ensure we definitely clean up even if something halts rAF
    timeoutId = setTimeout(() => {
      cancelAnimationFrame(rafId);
      if (saved) sessionStorage.removeItem("vir-scrollY");
      document.documentElement.style.scrollBehavior = "smooth";
    }, RESTORE_DURATION + 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      // Ensure we leave the DOM in a clean state
      document.documentElement.style.scrollBehavior = "smooth";
    };
  }, [pathname]);

  return null;
}
