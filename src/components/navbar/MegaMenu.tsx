import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';

import type { MegaMenuColumn } from './types';

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function resolveHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (isExternal(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}

export function MegaMenu({ columns }: { columns: MegaMenuColumn[] }) {
  return (
    <div className="absolute left-1/2 top-full z-30 mt-4 w-[640px] -translate-x-1/2 rounded-[32px] border border-virintira-border bg-white p-8 text-left shadow-2xl shadow-black/10">
      <div className="grid gap-8 sm:grid-cols-2">
        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-virintira-muted">
              {column.title}
            </p>
            <ul className="space-y-3">
              {column.items.map((item) => {
                const href = resolveHref(item.href);
                const content = (
                  <div className="rounded-2xl border border-transparent p-4 transition hover:border-virintira-primary/30 hover:bg-virintira-soft">
                    <p className="font-semibold text-virintira-primary">{item.label}</p>
                    {item.description ? (
                      <p className="mt-1 text-sm text-virintira-muted">{item.description}</p>
                    ) : null}
                  </div>
                );

                if (href.startsWith('#') || isExternal(href)) {
                  return (
                    <li key={item.label}>
                      <a href={href}>{content}</a>
                    </li>
                  );
                }

                return (
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
      <div className="mt-8 flex items-center justify-between rounded-2xl bg-virintira-soft px-6 py-4 text-sm text-virintira-muted">
        <span>{COMPANY.legalNameTh}</span>
        <a className="font-semibold text-virintira-primary" href={`tel:${COMPANY.phone}`}>
          {COMPANY.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
