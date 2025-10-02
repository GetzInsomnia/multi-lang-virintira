export type ServiceItem = {
  title: string;
  description: string;
};

export function PopularServices({ heading, items }: { heading: string; items: ServiceItem[] }) {
  const services: ServiceItem[] = Array.isArray(items) ? items : [];

  return (
    <section className="bg-white" id="services">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="space-y-6 text-center">
          <h2 className="text-[clamp(1.9rem,1.3rem+1.6vw,2.6rem)] font-bold text-virintira-primary">{heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-3xl border border-virintira-border bg-white p-6 text-left shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-virintira-primary/30 hover:shadow-xl"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-virintira-primary/10 text-sm font-semibold text-virintira-primary">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-virintira-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-virintira-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
