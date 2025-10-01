"use client";

export function ScrollToHero() {
  return (
    <a
      href="#hero"
      className="group fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-virintira-primary shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white xl:inline-flex"
    >
      <span className="inline-block rounded-full bg-virintira-primary px-2 py-1 text-xs text-white transition group-hover:scale-105">↑</span>
      <span>Back to top</span>
    </a>
  );
}
