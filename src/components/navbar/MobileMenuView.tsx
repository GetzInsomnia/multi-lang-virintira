"use client";

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';

import type { MegaMenuColumn, NavItem } from './types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BackButton } from './BackButton';

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function resolveHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (isExternal(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}

export function MobileMenuView({
  nav,
  columns,
  onClose,
  ctaPrimary,
  ctaSecondary,
}: {
  nav: NavItem[];
  columns: MegaMenuColumn[];
  onClose: () => void;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto bg-white p-6">
      <div className="flex items-center justify-between">
        <BackButton onClick={onClose} label="Close" />
        <LanguageSwitcher variant="pill" />
      </div>
      <nav className="space-y-3" aria-label="Primary">
        {nav.map((item) => {
          const href = resolveHref(item.href);
          if (href.startsWith('#') || isExternal(href)) {
            return (
              <a
                key={item.label}
                href={href}
                className="block rounded-2xl border border-transparent bg-virintira-soft px-4 py-3 text-lg font-semibold text-virintira-primary transition hover:border-virintira-primary/50 hover:bg-white"
                onClick={onClose}
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.label}
              href={href}
              className="block rounded-2xl border border-transparent bg-virintira-soft px-4 py-3 text-lg font-semibold text-virintira-primary transition hover:border-virintira-primary/50 hover:bg-white"
              onClick={onClose}
              prefetch
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-6">
        {columns.map((column) => (
          <section key={column.title} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-virintira-muted">
              {column.title}
            </p>
            <div className="space-y-3">
              {column.items.map((item) => {
                const href = resolveHref(item.href);
                const card = (
                  <div className="rounded-2xl border border-virintira-border bg-white p-4 shadow-sm transition hover:border-virintira-primary/40 hover:shadow-lg">
                    <p className="font-semibold text-virintira-primary">{item.label}</p>
                    {item.description ? (
                      <p className="mt-1 text-sm text-virintira-muted">{item.description}</p>
                    ) : null}
                  </div>
                );

                if (href.startsWith('#') || isExternal(href)) {
                  return (
                    <a key={item.label} href={href} onClick={onClose}>
                      {card}
                    </a>
                  );
                }

                return (
                  <Link key={item.label} href={href} onClick={onClose} prefetch>
                    {card}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <div className="space-y-3">
        <a
          href={`tel:${COMPANY.phone}`}
          className="block w-full rounded-full bg-virintira-primary px-4 py-3 text-center text-sm font-semibold text-white shadow transition hover:bg-virintira-primary-dark"
        >
          {ctaPrimary}
        </a>
        <a
          href={COMPANY.socials.line}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-full border border-[#06C755] bg-[#06C755] px-4 py-3 text-center text-sm font-semibold text-white shadow transition hover:brightness-110"
        >
          {ctaSecondary}
        </a>
      </div>
      <div className="space-y-1 text-xs text-virintira-muted">
        <p>{COMPANY.legalNameTh}</p>
        <p>{COMPANY.legalNameEn}</p>
        <p>{COMPANY.phoneDisplay}</p>
      </div>
    </div>
  );
}
