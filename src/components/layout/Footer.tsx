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

function resolveHref(rawHref: string) {
  const href = rawHref.trim();
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}

function isExternalHref(href: string) {
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href) && !href.startsWith('/');
}

export function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="bg-[#2D0404] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{data.tagline}</h2>
          <p className="text-sm text-white/70">{data.description}</p>
          <div className="space-y-1 text-sm">
            <p>{COMPANY.legalNameTh}</p>
            <p>{COMPANY.address.streetAddress}</p>
            <p>
              {COMPANY.address.subDistrict} {COMPANY.address.district} {COMPANY.address.province}{' '}
              {COMPANY.address.postalCode}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 text-sm font-semibold">
            <a href={`tel:${COMPANY.phone}`} className="transition hover:text-[#FDD3D3]">
              {data.contact.phone.replace('{phone}', COMPANY.phoneDisplay)}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="transition hover:text-[#FDD3D3]">
              {data.contact.email.replace('{email}', COMPANY.email)}
            </a>
            <a
              href={COMPANY.socials.line}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#FDD3D3]"
            >
              {data.contact.line}
            </a>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {data.quickLinks.map((link) => {
                const href = resolveHref(link.href);
                if (link.href.startsWith('#') || isExternalHref(href)) {
                  return (
                    <li key={link.label}>
                      <a href={href} className="transition hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={link.label}>
                    <Link href={href} className="transition hover:text-white" prefetch>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/60">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
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
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        {data.legal.replace('{year}', new Date().getFullYear().toString())}
      </div>
    </footer>
  );
}

export default Footer;
