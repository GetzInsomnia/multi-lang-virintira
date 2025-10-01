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
  return (
    <section className="relative overflow-hidden bg-virintira-soft" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-virintira-soft via-white to-[#fde8e8]" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-24 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-virintira-muted">
            Virintira Accounting
          </span>
          <h1 className="text-[clamp(2.6rem,1.8rem+2.5vw,4rem)] font-extrabold leading-tight text-virintira-primary">
            {content.title}
          </h1>
          <div className="text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] font-semibold text-virintira-primary">
            <TypewriterText phrases={content.typewriter} />
          </div>
          <p className="text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] font-semibold text-virintira-primary/90">
            {content.subtitle}
          </p>
          <p className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-virintira-muted">
            {content.description}
          </p>
          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-start">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-virintira-primary-dark"
            >
              {content.primary}
            </a>
            <a
              href={COMPANY.socials.line}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chatLabel}
            </a>
          </div>
        </div>
        <div className="flex max-w-md flex-col items-center gap-5 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <p className="text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] font-semibold text-virintira-primary">
            {content.emailHeading}
          </p>
          <p className="text-sm text-virintira-muted">{COMPANY.legalNameTh}</p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-virintira-primary-dark"
          >
            {content.emailButton}
          </a>
        </div>
      </div>
    </section>
  );
}
