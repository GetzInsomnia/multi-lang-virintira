export function WhyChooseUsSection({ heading, points }: { heading: string; points: string[] }) {
  const highlights: string[] = Array.isArray(points) ? points : [];

  return (
    <section
      id="why-us"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden px-4 py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,120,120,0.4)_0%,rgba(255,120,120,0)_55%),radial-gradient(circle_at_80%_80%,rgba(167,9,9,0.35)_0%,rgba(167,9,9,0)_60%),linear-gradient(135deg,#8c1804,#a70909,#d94d3a,#ff8f8f,#ffe4e4)]"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-6xl">
        {heading ? (
          <h2 className="text-center text-[clamp(2rem,1.5rem+1.8vw,3.2rem)] font-bold text-white drop-shadow-lg">
            {heading}
          </h2>
        ) : null}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="group relative overflow-hidden rounded-3xl bg-white/10 p-8 text-center text-base font-medium leading-relaxed text-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:-translate-y-2"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60" style={{ background: 'radial-gradient(circle at top, rgba(255,255,255,0.4), transparent 65%)' }} aria-hidden="true" />
              <div className="relative z-10 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-lg font-semibold tracking-[0.2em] text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
