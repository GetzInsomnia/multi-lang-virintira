import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';

export type FooterLink = { label: string; href: string };

export type FooterData = {
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    line: string;
  };
  quickLinks: FooterLink[];
  legal: string;
};

const externalPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

function resolveHref(rawHref: string) {
  const href = rawHref.trim();
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (externalPattern.test(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}

function isExternalHref(href: string) {
  return externalPattern.test(href) && !href.startsWith('/');
}

export function Footer({ data }: { data: FooterData }) {
  const year = new Date().getFullYear().toString();

  return (
    <footer className="bg-virintira-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {COMPANY.brand}
              </span>
              <h2 className="text-[clamp(1.85rem,1.3rem+1.4vw,2.6rem)] font-bold leading-tight">{data.tagline}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/80">{data.description}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Registered office</p>
              <div className="mt-3 space-y-1 text-sm text-white/80">
                <p>{COMPANY.legalNameTh}</p>
                <p>{COMPANY.address.streetAddress}</p>
                <p>
                  {COMPANY.address.subDistrict} {COMPANY.address.district} {COMPANY.address.province} {COMPANY.address.postalCode}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                {data.contact.phone.replace('{phone}', COMPANY.phoneDisplay)}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20"
              >
                {data.contact.email.replace('{email}', COMPANY.email)}
              </a>
              <a
                href={COMPANY.socials.line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-white transition hover:brightness-110"
              >
                {data.contact.line}
              </a>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <section className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Quick links</p>
              <ul className="space-y-3 text-sm text-white/80">
                {data.quickLinks.map((link) => {
                  const href = resolveHref(link.href);
                  if (link.href.startsWith('#') || isExternalHref(href)) {
                    return (
                      <li key={link.label}>
                        <a className="transition hover:text-white" href={href}>
                          {link.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={link.label}>
                      <Link className="transition hover:text-white" href={href} prefetch>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Follow Virintira</p>
              <ul className="space-y-3 text-sm text-white/80">
                <li>
                  <a
                    href={COMPANY.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.socials.line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    LINE OA
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
              <div className="rounded-2xl bg-white/10 p-4 text-xs text-white/70">
                <p>Tax ID: {COMPANY.taxId}</p>
                <p>Line OA: {COMPANY.socials.line}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-virintira-primary-dark py-6 text-center text-xs text-white/70">
        {data.legal.replace('{year}', year)}
      </div>
    </footer>
  );
}

export default Footer;
