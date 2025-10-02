export type ProcessStep = {
  title: string;
  description: string;
};

export function HowItWorksSection({ heading, steps }: { heading: string; steps: ProcessStep[] }) {
  const processSteps: ProcessStep[] = Array.isArray(steps) ? steps : [];

  return (
    <section
      id="process"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center bg-[#fff4f4] px-4 py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,9,9,0.08)_0%,rgba(255,244,244,0)_65%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {heading ? (
          <h2 className="text-center text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold text-[#A70909]">
            {heading}
          </h2>
        ) : null}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-[0_25px_80px_rgba(167,9,9,0.12)] transition-transform duration-300 ease-out hover:-translate-y-2"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60" style={{ background: 'radial-gradient(circle at top, rgba(255,190,190,0.35), transparent 65%)' }} aria-hidden="true" />
              <div className="relative z-10 space-y-4">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#A70909]/30 bg-[#A70909]/10 text-sm font-semibold text-[#A70909]">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#A70909]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[#5d3f3f]">{step.description}</p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-[#A70909]/20 lg:block" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
