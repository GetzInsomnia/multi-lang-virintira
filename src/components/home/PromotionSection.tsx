import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

export function PromotionSection({ heading, description, ctaLabel, ctaHref }: { heading: string; description: string; ctaLabel: string; ctaHref: string }) {
  return (
    <section
      id="promotion"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#fffefe] px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,200,0.45),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(167,9,9,0.35),transparent_60%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[36px] border border-[#A70909]/15 bg-white/90 shadow-[0_35px_100px_rgba(167,9,9,0.18)]">
          <div className="grid gap-10 px-8 py-12 lg:grid-cols-[2fr_1fr] lg:items-center lg:px-16 lg:py-16">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center rounded-full bg-[#A70909]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#A70909]">
                Limited offer
              </span>
              {heading ? (
                <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3rem)] font-bold leading-snug text-[#A70909]">
                  {heading}
                </h2>
              ) : null}
              {description ? (
                <p className="text-base leading-relaxed text-[#5d3f3f]">
                  {description}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href={normalizeInternalHref(ctaHref)}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#A70909] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a70909]/30 transition-transform duration-300 ease-out hover:-translate-y-1 hover:bg-[#8c0808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:w-auto"
              >
                {ctaLabel}
              </Link>
              <p className="text-xs uppercase tracking-[0.35em] text-[#a70909]/60">
                *Complimentary assessment for new engagements booked this quarter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
