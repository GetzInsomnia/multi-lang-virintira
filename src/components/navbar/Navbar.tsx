'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

import { Link, usePathname } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

import HamburgerButton from './HamburgerButton';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchToggle from './SearchToggle';
import SocialFloating from './SocialFloating';
import type { MegaMenuColumn, NavItem, NavbarData } from './types';

function isInternalMatch(currentPath: string, href?: string): boolean {
  if (!href || href.startsWith('#')) {
    return false;
  }
  const target = normalizeInternalHref(href);
  if (!target || target === '#') {
    return false;
  }
  if (target === '/') {
    return currentPath === '/';
  }
  return currentPath === target || currentPath.startsWith(`${target}/`);
}

function hasActiveMega(columns: MegaMenuColumn[], currentPath: string) {
  return columns.some((column) =>
    column.items.some((item) => isInternalMatch(currentPath, item.href)),
  );
}

const linkBaseClasses =
  "group relative text-[17px] font-normal leading-none tracking-tight text-[#2A2A2A] transition-colors duration-200 hover:text-[#A70909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30 after:absolute after:bottom-[-24px] after:left-0 after:right-0 after:h-[7px] after:w-full after:rounded-t-full after:bg-[#A70909] after:content-[''] after:origin-center after:scale-0 after:transition-transform after:duration-200 group-hover:after:scale-100 aria-[current=true]:text-[#A70909] aria-[expanded=true]:text-[#A70909] aria-[current=true]:after:scale-100 aria-[expanded=true]:after:scale-100";
const linkContentClasses = 'inline-flex h-[30px] items-center gap-2 leading-none';
const linkLabelClasses = 'leading-none';

type NavEntry = { type: 'link'; item: NavItem } | { type: 'mega' };

type NavbarProps = {
  data: NavbarData;
};

export default function Navbar({ data }: NavbarProps) {
  const locale = useLocale();
  const t = useTranslations('layout.header');
  const pathname = usePathname() || '/';
  const currentPath = useMemo(() => normalizeInternalHref(pathname), [pathname]);

  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const megaOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const megaColumns = data.megaMenu.columns;
  const hasMegaMenu = megaColumns.length > 0;

  const navEntries = useMemo<NavEntry[]>(() => {
    const entries: NavEntry[] = [];
    if (data.nav.length > 0) {
      entries.push({ type: 'link', item: data.nav[0] });
    }
    if (hasMegaMenu) {
      entries.push({ type: 'mega' });
    }
    for (let index = 1; index < data.nav.length; index += 1) {
      entries.push({ type: 'link', item: data.nav[index] });
    }
    return entries;
  }, [data.nav, hasMegaMenu]);

  const megaActive = useMemo(
    () => (hasMegaMenu ? hasActiveMega(megaColumns, currentPath) : false),
    [currentPath, hasMegaMenu, megaColumns],
  );

  useEffect(() => {
    setMegaOpen(false);
    setSearchOpen(false);
    setLanguageOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (megaOpenTimer.current) {
        clearTimeout(megaOpenTimer.current);
      }
      if (megaCloseTimer.current) {
        clearTimeout(megaCloseTimer.current);
      }
    };
  }, []);

  const scheduleMegaOpen = () => {
    if (!hasMegaMenu) return;
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    if (megaOpenTimer.current) {
      clearTimeout(megaOpenTimer.current);
    }
    megaOpenTimer.current = setTimeout(() => {
      setMegaOpen(true);
      setSearchOpen(false);
      setLanguageOpen(false);
    }, 100);
  };

  const scheduleMegaClose = () => {
    if (!hasMegaMenu) return;
    if (megaOpenTimer.current) {
      clearTimeout(megaOpenTimer.current);
      megaOpenTimer.current = null;
    }
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
    }
    megaCloseTimer.current = setTimeout(() => {
      setMegaOpen(false);
    }, 140);
  };

  const cancelMegaClose = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
  };

  const handleMobileToggle = () => {
    setMobileOpen((prev) => !prev);
    setSearchOpen(false);
    setLanguageOpen(false);
    setMegaOpen(false);
  };

  const onSearchOpenChange = (open: boolean) => {
    setSearchOpen(open);
    if (open) {
      setLanguageOpen(false);
      setMegaOpen(false);
    }
  };

  const onLanguageOpenChange = (open: boolean) => {
    setLanguageOpen(open);
    if (open) {
      setSearchOpen(false);
      setMegaOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{ '--header-height': '72px' } as CSSProperties}
    >
      <SocialFloating />
      <div className="relative mx-auto max-w-[1280px] px-4">
        <div className="flex h-[var(--header-height)] items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3" prefetch>
            <Image src="/logo.png" alt="ViRINTIRA" width={44} height={44} priority />
            <span className="text-[22px] font-extrabold tracking-[0.02em] text-[#A70909]">
              ViRINTIRA
            </span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex overflow-visible" aria-label="Primary navigation">
            {navEntries.map((entry, index) => {
              if (entry.type === 'mega') {
                if (!hasMegaMenu) {
                  return null;
                }
                const isOpen = megaOpen || megaActive;
                return (
                  <div
                    key={`mega-${index}`}
                    className="relative"
                    onMouseEnter={scheduleMegaOpen}
                    onMouseLeave={scheduleMegaClose}
                    onFocus={scheduleMegaOpen}
                    onBlur={scheduleMegaClose}
                  >
                    <button
                      type="button"
                      className={isOpen ? `${linkBaseClasses} text-[#A70909]` : linkBaseClasses}
                      aria-expanded={isOpen}
                      aria-controls="mega-menu-panel"
                      onClick={() => {
                        if (isOpen) {
                          setMegaOpen(false);
                        } else {
                          setMegaOpen(true);
                          setSearchOpen(false);
                          setLanguageOpen(false);
                        }
                      }}
                    >
                      <span className={linkContentClasses}>
                        <span className={linkLabelClasses}>{data.megaMenu.triggerLabel}</span>
                      </span>
                    </button>
                  </div>
                );
              }

              const { item } = entry;
              const active = isInternalMatch(currentPath, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className={active ? `${linkBaseClasses} text-[#A70909]` : linkBaseClasses}
                  aria-current={active ? 'true' : undefined}
                  data-flame={item.highlight ? 'true' : undefined}
                  onMouseEnter={() => setMegaOpen(false)}
                >
                  <span className={linkContentClasses}>
                    {item.highlight ? (
                      <FontAwesomeIcon
                        icon={faFire}
                        className="h-4 w-4 text-[#A70909] animate-bounce relative -top-px align-middle"
                      />
                    ) : null}
                    <span className={linkLabelClasses}>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <SearchToggle
              locale={locale}
              open={searchOpen}
              onOpenChange={onSearchOpenChange}
              placeholder={t('search.placeholder')}
              submitLabel={t('search.submitLabel')}
            />
            <LanguageSwitcher
              open={languageOpen}
              onOpenChange={onLanguageOpenChange}
              currentLocale={locale}
            />
            <div className="md:hidden">
              <HamburgerButton isOpen={mobileOpen} onClick={handleMobileToggle} />
            </div>
          </div>
        </div>
        {hasMegaMenu ? (
          <MegaMenu
            open={megaOpen}
            columns={megaColumns}
            onMouseEnter={(event) => {
              void event;
              cancelMegaClose();
              setMegaOpen(true);
            }}
            onMouseLeave={(event) => {
              void event;
              scheduleMegaClose();
            }}
            onLinkClick={() => setMegaOpen(false)}
          />
        ) : null}
      </div>
      <MobileMenu
        open={mobileOpen}
        nav={data.nav}
        columns={megaColumns}
        triggerLabel={data.megaMenu.triggerLabel}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
