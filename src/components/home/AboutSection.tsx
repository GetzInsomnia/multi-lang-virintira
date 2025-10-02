import { COMPANY } from '@/data/company';

export function AboutSection({ heading, paragraphs, linkLabel }: { heading: string; paragraphs: string[]; linkLabel: string }) {
  const details: string[] = Array.isArray(paragraphs) ? paragraphs : [];

  const highlight = details[0] ?? heading;

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#fffeff] px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,210,210,0.45),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(167,9,9,0.25),transparent_60%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="space-y-8">
          {heading ? (
            <h2 className="text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-bold text-[#A70909]">
              {heading}
            </h2>
          ) : null}
          {highlight ? (
            <blockquote className="rounded-3xl border border-[#A70909]/20 bg-white/80 p-6 text-[clamp(1.1rem,1rem+0.5vw,1.45rem)] font-semibold leading-relaxed text-[#A70909] shadow-[0_20px_60px_rgba(167,9,9,0.12)]">
              {highlight}
            </blockquote>
          ) : null}
          <div className="space-y-5 text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-[#5d3f3f]">
            {(highlight ? details.slice(1) : details).map((paragraph, index) => (
              <p key={index} className="indent-6">
                {paragraph}
              </p>
            ))}
          </div>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#A70909]/40 bg-white px-6 py-2 text-sm font-semibold text-[#A70909] shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-[#A70909] hover:bg-[#fff1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {linkLabel}
          </a>
        </div>
        <aside className="mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-[30px] border border-[#A70909]/15 bg-white/95 p-8 text-[#5d3f3f] shadow-[0_30px_90px_rgba(167,9,9,0.12)]">
            <h3 className="text-lg font-semibold text-[#A70909]">{COMPANY.legalNameTh}</h3>
            <dl className="mt-6 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="font-semibold text-[#A70909]">Tax ID</dt>
                <dd>{COMPANY.taxId}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#A70909]">Address</dt>
                <dd>{COMPANY.address.streetAddress}</dd>
                <dd>
                  {COMPANY.address.subDistrict} {COMPANY.address.district} {COMPANY.address.province} {COMPANY.address.postalCode}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#A70909]">Email</dt>
                <dd>{COMPANY.email}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
