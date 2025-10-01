export type ProcessStep = {
  title: string;
  description: string;
};

export function HowItWorksSection({ heading, steps }: { heading: string; steps: ProcessStep[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4" id="process">
      <div className="space-y-8">
        <h2 className="text-center text-[clamp(1.9rem,1.3rem+1.6vw,2.6rem)] font-bold text-virintira-primary">{heading}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-virintira-border bg-white p-6 shadow-sm">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-virintira-primary/10 text-sm font-semibold text-virintira-primary">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-virintira-primary">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-virintira-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
