export function WhyChooseUsSection({ heading, points }: { heading: string; points: string[] }) {
  const highlights: string[] = Array.isArray(points) ? points : [];

  return (
    <section className="mx-auto max-w-6xl px-4" id="why-us">
      <div className="rounded-[36px] bg-gradient-to-br from-virintira-primary to-virintira-primary-dark p-12 text-white shadow-[0_40px_120px_rgba(167,9,9,0.35)]">
        <div className="space-y-8">
          <h2 className="text-center text-[clamp(1.9rem,1.3rem+1.6vw,2.6rem)] font-bold">{heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-3xl bg-white/10 p-6 text-[clamp(0.95rem,0.9rem+0.3vw,1.05rem)] leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
