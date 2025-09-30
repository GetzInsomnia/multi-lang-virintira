import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/navigation/LocaleSwitcher';

export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderMegaMenuColumn = {
  title: string;
  items: Array<{ label: string; description: string; href: string }>;
};

export type HeaderData = {
  announcement: { message: string; actionLabel: string; actionHref: string };
  nav: HeaderNavItem[];
  megaMenu: { triggerLabel: string; columns: HeaderMegaMenuColumn[] };
  ctaPrimary: string;
  ctaSecondary: string;
};

function resolveHref(href: string, locale: string) {
  if (href.startsWith('http')) return href;
  if (href.startsWith('#')) return href;
  return `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
}

export function Header({ data, locale }: { data: HeaderData; locale: string }) {
  return (
    <header className="bg-white/95 text-[#A70909] shadow-sm backdrop-blur">
      <div className="bg-[#A70909] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
          <p>{data.announcement.message}</p>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#A70909]"
            href={resolveHref(data.announcement.actionHref, locale)}
          >
            {data.announcement.actionLabel}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-3" prefetch>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A70909]/10 text-2xl font-bold">
              VT
            </div>
            <div className="space-y-0.5">
              <span className="block text-base font-extrabold leading-tight">{COMPANY.legalNameTh}</span>
              <span className="block text-xs text-[#A70909]/80">{COMPANY.legalNameEn}</span>
            </div>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex">
            {data.nav.map((item) => {
              const href = resolveHref(item.href, locale);
              return item.href.startsWith('#') ? (
                <a
                  key={item.label}
                  href={href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909]/10"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909]/10"
                  prefetch
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="group relative">
              <button
                type="button"
                className="rounded-full px-3 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909]/10"
                aria-haspopup="true"
              >
                {data.megaMenu.triggerLabel}
              </button>
              <div className="invisible absolute left-0 top-full z-20 mt-3 w-[640px] -translate-y-4 rounded-3xl border border-[#A70909]/10 bg-white p-6 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid gap-6 sm:grid-cols-2">
                  {data.megaMenu.columns.map((column) => (
                    <div key={column.title} className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-wide text-[#A70909]/70">
                        {column.title}
                      </p>
                      <ul className="space-y-2 text-sm">
                        {column.items.map((item) => {
                          const href = resolveHref(item.href, locale);
                          const content = (
                            <div className="rounded-2xl border border-transparent p-3 transition hover:border-[#A70909]/20 hover:bg-[#A70909]/5">
                              <p className="font-semibold text-[#A70909]">{item.label}</p>
                              <p className="text-xs text-[#A70909]/70">{item.description}</p>
                            </div>
                          );
                          return item.href.startsWith('#') ? (
                            <li key={item.label}>
                              <a href={href}>{content}</a>
                            </li>
                          ) : (
                            <li key={item.label}>
                              <Link href={href} prefetch>
                                {content}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a
            href={`tel:${COMPANY.phone}`}
            className="hidden rounded-full border border-[#A70909] px-4 py-2 text-sm font-semibold text-[#A70909] transition hover:bg-[#A70909] hover:text-white lg:inline-flex"
          >
            {data.ctaPrimary}
          </a>
          <a
            href={COMPANY.socials.line}
            className="inline-flex items-center rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.ctaSecondary}
          </a>
        </div>
      </div>
    </header>
  );
}
