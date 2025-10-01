import { COMPANY } from '@/data/company';

export function AboutSection({ heading, paragraphs, linkLabel }: { heading: string; paragraphs: string[]; linkLabel: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4" id="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="space-y-6">
          <h2 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-virintira-primary">{heading}</h2>
          <div className="space-y-4 text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-virintira-muted">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="indent-6">
                {paragraph}
              </p>
            ))}
          </div>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex w-fit items-center justify-center rounded-full border border-virintira-primary px-5 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary hover:text-white"
          >
            {linkLabel}
          </a>
        </div>
        <aside className="flex justify-center">
          <div className="w-full max-w-sm rounded-[28px] border border-virintira-border bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-virintira-primary">{COMPANY.legalNameTh}</h3>
            <div className="mt-4 space-y-1 text-sm text-virintira-muted">
              <p>Tax ID: {COMPANY.taxId}</p>
              <p>{COMPANY.address.streetAddress}</p>
              <p>
                {COMPANY.address.subDistrict} {COMPANY.address.district} {COMPANY.address.province} {COMPANY.address.postalCode}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
