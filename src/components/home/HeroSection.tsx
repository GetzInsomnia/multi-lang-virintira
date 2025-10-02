import { COMPANY } from '@/data/company';

import { TypewriterText } from '@/components/common/TypewriterText';

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  primary: string;
  typewriter: string[];
  emailHeading: string;
  emailButton: string;
};

export function HeroSection({ content, chatLabel }: { content: HeroContent; chatLabel: string }) {
  const typewriterPhrases: string[] = Array.isArray(content.typewriter) ? content.typewriter : [];

  return (
    <section
      id="herosection"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center overflow-hidden bg-[#fffbfb] px-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#fff0f0] via-[#fff8f8] to-[#ffe4e4]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[580px] rounded-full bg-[#ffe0e0] opacity-60 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#A70909] shadow-sm">
          Virintira Accounting
        </span>
        <h1 className="text-[clamp(2.4rem,1.8rem+2.6vw,4rem)] font-bold leading-snug tracking-tight text-[#A70909]">
          {content.title}
        </h1>
        {typewriterPhrases.length ? (
          <div className="text-[clamp(1.2rem,1.1rem+0.5vw,1.6rem)] font-semibold text-[#A70909]">
            <TypewriterText phrases={typewriterPhrases} />
          </div>
        ) : null}
        {content.subtitle ? (
          <p className="text-[clamp(1.05rem,0.98rem+0.4vw,1.35rem)] font-semibold text-[#8a1b1b]">
            {content.subtitle}
          </p>
        ) : null}
        {content.description ? (
          <p className="max-w-3xl text-[clamp(0.95rem,0.9rem+0.3vw,1.15rem)] leading-relaxed text-[#5d3f3f]">
            {content.description}
          </p>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <a
            href={`tel:${COMPANY.phone}`}
            className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#A70909] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a70909]/30 transition-transform duration-300 ease-out hover:-translate-y-[3px] hover:bg-[#8c0808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {content.primary}
          </a>
          <a
            href={COMPANY.socials.line}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#06C755] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06c755]/20 transition-transform duration-300 ease-out hover:-translate-y-[3px] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06C755] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {chatLabel}
          </a>
          {content.emailButton ? (
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#A70909]/40 bg-white px-8 py-3 text-sm font-semibold text-[#A70909] shadow-sm transition-transform duration-300 ease-out hover:-translate-y-[3px] hover:border-[#A70909] hover:bg-[#fff1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {content.emailButton}
            </a>
          ) : null}
        </div>
        {content.emailHeading ? (
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#a70909]/70">
            {content.emailHeading}
          </p>
        ) : null}
      </div>
    </section>
  );
}
