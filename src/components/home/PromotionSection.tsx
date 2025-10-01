import { Link } from '@/i18n/routing';

export function PromotionSection({ heading, description, ctaLabel, ctaHref }: { heading: string; description: string; ctaLabel: string; ctaHref: string }) {
  return (
    <section className="bg-virintira-soft" id="promotion">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[32px] border border-virintira-border bg-white p-10 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-virintira-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-virintira-primary">
                Limited offer
              </span>
              <h2 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-virintira-primary">{heading}</h2>
              <p className="text-sm leading-relaxed text-virintira-muted">{description}</p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-virintira-primary-dark"
              >
                {ctaLabel}
              </Link>
              <p className="text-xs text-virintira-muted">
                *Complimentary assessment for new engagements booked this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
