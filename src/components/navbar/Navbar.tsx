"use client";

import Image from 'next/image';
import { useLocale } from 'next-intl';
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { COMPANY } from '@/data/company';
import { Link, usePathname } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import { HamburgerButton } from './HamburgerButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { SocialFloating } from './SocialFloating';
import type { NavbarData } from './types';

const DEFAULT_HEADER_HEIGHT = 72;
const HIDE_DELAY = 150;

export function Navbar({ data }: { data: NavbarData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const locale = useLocale();

  const handleOpenMegaMenu = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setIsHoveringMenu(true);
  }, []);

  const handleCloseMegaMenu = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setIsHoveringMenu(false);
    }, HIDE_DELAY);
  }, []);

  const cancelCloseMegaMenu = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsHoveringMenu(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const updateHeight = () => {
      const header = headerRef.current;
      if (!header) return;
      const height = header.offsetHeight;
      const root = document.documentElement;
      const current = parseFloat(
        getComputedStyle(root).getPropertyValue('--header-height') || '0',
      );

      if (height && height !== current) {
        root.style.setProperty('--header-height', `${height}px`);
      } else if (!current) {
        root.style.setProperty('--header-height', `${DEFAULT_HEADER_HEIGHT}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleLogoClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
      const homePaths = new Set(['/', `/${locale}`, '']);
      if (homePaths.has(normalizedPath)) {
        event.preventDefault();
        const target = document.getElementById('herosection');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    [locale, pathname],
  );

  return (
    <>
      <SocialFloating />
      <header
        ref={headerRef}
        className="fixed left-0 top-0 z-50 w-full bg-[#FFFEFE] shadow-sm"
      >
        {data.announcement?.message ? (
          <div className="bg-virintira-primary text-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-2 text-sm">
              <p className="font-medium">{data.announcement.message}</p>
              {data.announcement.actionLabel ? (
                (() => {
                  const href = data.announcement?.actionHref;
                  if (!href) return null;
                  if (href.startsWith('#') || isExternalHref(href)) {
                    return (
                      <a
                        href={href}
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-virintira-primary"
                      >
                        {data.announcement.actionLabel}
                      </a>
                    );
                  }
                  const normalized = normalizeInternalHref(href);
                  return (
                    <Link
                      href={normalized}
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-virintira-primary"
                      prefetch
                    >
                      {data.announcement.actionLabel}
                    </Link>
                  );
                })()
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={handleLogoClick}
              prefetch
            >
              <Image
                src="/logo.png"
                alt={COMPANY.legalNameEn}
                width={40}
                height={40}
                priority
              />
              <span className="text-xl font-bold text-[#A70909] uppercase tracking-[0.2em]">
                VIRINTIRA
              </span>
            </Link>
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
              {data.nav.map((item) => {
                const href = item.href;
                const isExternal = isExternalHref(href);
                const isAnchor = href.startsWith('#');
                const content = (
                  <span className="relative font-medium text-black transition hover:text-[#A70909] after:absolute after:-bottom-6 after:left-0 after:h-[7px] after:w-full after:rounded-t-full after:bg-[#A70909] after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-[1.2]">
                    {item.label}
                  </span>
                );

                if (isExternal || isAnchor) {
                  return (
                    <a key={item.label} href={href} className="inline-flex items-center">
                      {content}
                    </a>
                  );
                }

                const normalized = normalizeInternalHref(href);
                return (
                  <Link key={item.label} href={normalized} className="inline-flex items-center" prefetch>
                    {content}
                  </Link>
                );
              })}
              {data.megaMenu.columns.length ? (
                <div
                  className="relative"
                  onMouseEnter={handleOpenMegaMenu}
                  onMouseLeave={handleCloseMegaMenu}
                  onFocus={cancelCloseMegaMenu}
                  onBlur={handleCloseMegaMenu}
                >
                  <button
                    type="button"
                    className={`relative font-medium transition ${
                      isHoveringMenu ? 'text-[#A70909]' : 'text-black'
                    } after:absolute after:-bottom-6 after:left-0 after:h-[7px] after:w-full after:rounded-t-full after:bg-[#A70909] after:origin-center after:transition-transform ${
                      isHoveringMenu ? 'after:scale-x-[1.2]' : 'after:scale-x-0'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isHoveringMenu}
                    onClick={() => setIsHoveringMenu((prev) => !prev)}
                  >
                    {data.megaMenu.triggerLabel}
                  </button>
                  {isHoveringMenu ? (
                    <MegaMenu
                      columns={data.megaMenu.columns}
                      onMouseEnter={handleOpenMegaMenu}
                      onMouseLeave={handleCloseMegaMenu}
                      onLinkClick={() => setIsHoveringMenu(false)}
                    />
                  ) : null}
                </div>
              ) : null}
            </nav>
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            <SearchToggle active={searchOpen} onClick={() => setSearchOpen((prev) => !prev)} />
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <SearchToggle active={searchOpen} onClick={() => setSearchOpen((prev) => !prev)} />
            <LanguageSwitcher />
            <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)} />
          </div>
        </div>
        {searchOpen ? (
          <div className="border-t border-virintira-border bg-white/90">
            <div className="mx-auto max-w-4xl px-4 py-4">
              <input
                type="search"
                placeholder="Search accounting resources"
                className="w-full rounded-full border border-virintira-border px-5 py-3 text-sm focus:border-[#A70909] focus:outline-none focus:ring-2 focus:ring-[#A70909]/20"
              />
            </div>
          </div>
        ) : null}
      </header>
      <MobileMenu
        open={mobileOpen}
        nav={data.nav}
        columns={data.megaMenu.columns}
        triggerLabel={data.megaMenu.triggerLabel}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}

export default Navbar;
