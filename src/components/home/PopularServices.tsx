import Image from 'next/image';

export type ServiceCardItem = {
  serviceSlug: string;
  imagePath: string;
  title: string;
  description: string;
};

export function PopularServices({
  heading,
  items,
}: {
  heading: string;
  items: ServiceCardItem[];
}) {
  const services: ServiceCardItem[] = Array.isArray(items) ? items : [];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#fffefe] px-4 py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,#ffe8e8_0%,#fffefe_55%,#fffefe_100%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {heading ? (
          <h2 className="text-center text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold text-[#A70909] drop-shadow-sm">
            {heading}
          </h2>
        ) : null}
        <div className="mt-12 grid auto-rows-[320px] gap-5 sm:auto-rows-[280px] sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4">
          {services.map((item, index) => {
            const isHeroCard = index === 0;
            const imageSizes = isHeroCard
              ? '(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 100vw'
              : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';
            return (
              <article
                key={`${item.serviceSlug}-${index}`}
                className={`group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-[#f3dede] bg-white shadow-[0_20px_60px_rgba(167,9,9,0.12)] transition-shadow duration-300 ease-out hover:shadow-[0_30px_80px_rgba(167,9,9,0.18)] ${
                  isHeroCard ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl ${
                    isHeroCard ? 'aspect-[4/3]' : 'aspect-[16/9]'
                  }`}
                >
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    sizes={imageSizes}
                    className="transform-gpu object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-70" aria-hidden="true" />
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: 'radial-gradient(circle at 20% 20%, rgba(167,9,9,0.18), transparent 55%)' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-2 bg-white px-5 py-4 sm:px-6 sm:py-5">
                  <h3 className="line-clamp-1 text-lg font-semibold text-[#A70909] transition-colors duration-300 group-hover:text-[#6b0606]">
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm text-[#5d3f3f] ${
                      isHeroCard ? 'line-clamp-2' : 'line-clamp-1'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
