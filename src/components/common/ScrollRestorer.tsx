"use client";

import { useLayoutEffect } from "react";

export function ScrollRestorer() {
  useLayoutEffect(() => {
    try {
      const saved = sessionStorage.getItem("vir-scrollY");
      if (!saved) return;
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const y = Number(saved) || 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, left: 0 });
        document.documentElement.style.scrollBehavior = prev || "";
        sessionStorage.removeItem("vir-scrollY");
      });
    } catch {}
  }, []);
  return null;
}
