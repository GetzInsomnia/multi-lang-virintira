import { COMPANY } from '@/data/company';

export function ContactCTA({ heading, description, callLabel, chatLabel, emailLabel }: { heading: string; description: string; callLabel: string; chatLabel: string; emailLabel: string }) {
  return (
    <section
      id="contact"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#fff0f0] px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,9,9,0.12)_0%,rgba(255,240,240,0)_60%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center gap-6 rounded-[42px] border border-[#A70909]/20 bg-white/95 px-10 py-14 text-center shadow-[0_40px_120px_rgba(167,9,9,0.18)]">
          {heading ? (
            <h2 className="text-[clamp(2.1rem,1.5rem+1.8vw,3.1rem)] font-bold text-[#A70909]">
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-3xl text-[clamp(1rem,0.95rem+0.35vw,1.2rem)] leading-relaxed text-[#5d3f3f]">
              {description}
            </p>
          ) : null}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-center">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#A70909]/40 bg-white px-8 py-3 text-sm font-semibold text-[#A70909] shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:border-[#A70909] hover:bg-[#fff1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {callLabel}
            </a>
            <a
              href={COMPANY.socials.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#06C755] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06c755]/20 transition-transform duration-300 ease-out hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {chatLabel}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#A70909] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a70909]/30 transition-transform duration-300 ease-out hover:-translate-y-1 hover:bg-[#8c0808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {emailLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
