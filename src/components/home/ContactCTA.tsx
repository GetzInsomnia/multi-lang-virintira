import { COMPANY } from '@/data/company';

export function ContactCTA({ heading, description, callLabel, chatLabel, emailLabel }: { heading: string; description: string; callLabel: string; chatLabel: string; emailLabel: string }) {
  return (
    <section className="bg-[#ffecec]" id="contact">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col items-center gap-6 rounded-[36px] bg-white/90 p-12 text-center shadow-xl">
          <h2 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] font-bold text-virintira-primary">{heading}</h2>
          <p className="max-w-2xl text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] leading-relaxed text-virintira-muted">{description}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-virintira-primary px-6 py-3 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary hover:text-white"
            >
              {callLabel}
            </a>
            <a
              href={COMPANY.socials.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {chatLabel}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-virintira-primary-dark"
            >
              {emailLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
