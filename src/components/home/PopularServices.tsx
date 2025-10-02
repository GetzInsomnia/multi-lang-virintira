export type ServiceItem = {
  title: string;
  description: string;
};

export function PopularServices({ heading, items }: { heading: string; items: ServiceItem[] }) {
  const services: ServiceItem[] = Array.isArray(items) ? items : [];

  return (
    <section
      id="services"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#fffefe] px-4 py-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,#ffe8e8_0%,#fffefe_55%,#fffefe_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {heading ? (
          <h2 className="text-center text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold text-[#A70909] drop-shadow-sm">
            {heading}
          </h2>
        ) : null}
        <div className="mt-12 grid auto-rows-[320px] gap-5 sm:auto-rows-[260px] sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4">
          {services.map((item, index) => {
            const isHeroCard = index === 0;
            return (
              <article
                key={`${item.title}-${index}`}
                className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-[#a70909]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(167,9,9,0.12)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(167,9,9,0.18)] ${
                  isHeroCard ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/70 via-white to-[#fff5f5] transition-opacity duration-500 group-hover:opacity-80" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(167,9,9,0.12), transparent 55%)' }} aria-hidden="true" />
                <div className="relative z-10 flex flex-col">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#A70909]/10 text-sm font-semibold text-[#A70909] shadow-inner">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-[#A70909] transition-colors duration-300 group-hover:text-[#6b0606]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5d3f3f]">{item.description}</p>
                </div>
                <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 h-[3px] origin-center scale-x-0 rounded-full bg-[#A70909] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
