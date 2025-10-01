"use client";

import { useState } from 'react';

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';

import { HamburgerButton } from './HamburgerButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { SocialFloating } from './SocialFloating';
import type { NavbarData } from './types';

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function resolveHref(href: string) {
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (isExternal(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}

export function Navbar({ data }: { data: NavbarData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const announcementHref = data.announcement?.actionHref
    ? resolveHref(data.announcement.actionHref)
    : '#';
  const announcementIsExternal = data.announcement?.actionHref
    ? isExternal(data.announcement.actionHref)
    : false;

  return (
    <>
      <SocialFloating />
      <header className="sticky top-0 z-50 w-full bg-white/95 text-virintira-primary shadow backdrop-blur">
        {data.announcement?.message ? (
          <div className="bg-virintira-primary text-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-2 text-sm">
              <p className="font-medium">{data.announcement.message}</p>
              {data.announcement.actionLabel ? (
                announcementHref.startsWith('#') || announcementIsExternal ? (
                  <a
                    href={announcementHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-virintira-primary"
                  >
                    {data.announcement.actionLabel}
                  </a>
                ) : (
                  <Link
                    href={announcementHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-virintira-primary"
                    prefetch
                  >
                    {data.announcement.actionLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3" prefetch>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-virintira-primary/10 text-2xl font-bold">
                VT
              </div>
              <div className="space-y-0.5">
                <span className="block text-base font-extrabold leading-tight">
                  {COMPANY.legalNameTh}
                </span>
                <span className="block text-xs text-virintira-muted">
                  {COMPANY.legalNameEn}
                </span>
              </div>
            </Link>
            <nav aria-label="Primary" className="hidden items-center gap-2 xl:flex">
              {data.nav.map((item) => {
                const href = resolveHref(item.href);
                const className =
                  'rounded-full px-4 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary/10';
                if (href.startsWith('#') || isExternal(href)) {
                  return (
                    <a key={item.label} href={href} className={className}>
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link key={item.label} href={href} className={className} prefetch>
                    {item.label}
                  </Link>
                );
              })}
              {data.megaMenu.columns.length ? (
                <div className="group relative">
                  <button
                    type="button"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary/10"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {data.megaMenu.triggerLabel}
                  </button>
                  <div className="pointer-events-none opacity-0 transition duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
                    <MegaMenu columns={data.megaMenu.columns} />
                  </div>
                </div>
              ) : null}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <SearchToggle active={searchOpen} onClick={() => setSearchOpen((prev) => !prev)} />
            <LanguageSwitcher />
            <a
              href={`tel:${COMPANY.phone}`}
              className="hidden rounded-full border border-virintira-primary px-5 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary hover:text-white xl:inline-flex"
            >
              {data.ctaPrimary}
            </a>
            <a
              href={COMPANY.socials.line}
              className="inline-flex items-center rounded-full bg-[#06C755] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.ctaSecondary}
            </a>
            <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen(true)} className="xl:hidden" />
          </div>
        </div>
        {searchOpen ? (
          <div className="border-t border-virintira-border bg-white/90">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <input
                type="search"
                placeholder="Search accounting resources"
                className="w-full rounded-full border border-virintira-border px-5 py-3 text-sm focus:border-virintira-primary focus:outline-none focus:ring-2 focus:ring-virintira-primary/20"
              />
            </div>
          </div>
        ) : null}
      </header>
      <MobileMenu
        open={mobileOpen}
        nav={data.nav}
        columns={data.megaMenu.columns}
        ctaPrimary={data.ctaPrimary}
        ctaSecondary={data.ctaSecondary}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

export default Navbar;
