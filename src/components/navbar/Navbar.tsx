"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFire, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { COMPANY } from '@/data/company';
import { Link, usePathname } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import { HamburgerButton } from './HamburgerButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { SocialFloating } from './SocialFloating';
import SubMenu from './SubMenu';
import type { NavItem, NavbarData } from './types';

const DEFAULT_HEADER_HEIGHT = 80;
const OPEN_DELAY = 180;
const CLOSE_DELAY = 240;

const navIconLookup: Record<string, IconDefinition> = {
  promotion: faFire,
  โปรโมชั่น: faFire,
  promotion_en: faFire,
};

function getNavIcon(item: NavItem): IconDefinition | undefined {
  if (item.icon && navIconLookup[item.icon]) {
    return navIconLookup[item.icon];
  }
  if (item.highlight) {
    return faFire;
  }
  const normalized = item.label.trim().toLowerCase();
  if (normalized.includes('promo') || normalized.includes('โปรโม')) {
    return faFire;
  }
  return undefined;
}

function normalizePath(path: string): string {
  const normalized = normalizeInternalHref(path || '/');
  if (normalized.length > 1 && normalized.endsWith('/')) {
    return normalized.slice(0, -1);
  }
  return normalized || '/';
}

function isInternalMatch(currentPath: string, href?: string): boolean {
  if (!href || href.startsWith('#') || isExternalHref(href)) {
    return false;
  }
  const targetPath = normalizePath(href);
  if (targetPath === '/') {
    return currentPath === '/';
  }
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

function hasActiveSubmenu(item: NavItem, currentPath: string): boolean {
  if (!item.subMenu?.length) {
    return false;
  }
  return item.subMenu.some((section) =>
    section.items.some((link) => isInternalMatch(currentPath, link.href)),
  );
}

export function Navbar({ data }: { data: NavbarData }) {
  const t = useTranslations('layout.header');
  const pathname = usePathname();
  const currentPath = useMemo(() => normalizePath(pathname || '/'), [pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBlurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const searchMobilePanelRef = useRef<HTMLDivElement | null>(null);
  const searchDesktopInputRef = useRef<HTMLInputElement | null>(null);
  const searchMobileInputRef = useRef<HTMLInputElement | null>(null);

  const searchPlaceholder = t('search.placeholder');
  const mobilePlaceholder = t('search.mobilePlaceholder');
  const searchToggleLabel = t('search.toggleLabel');
  const searchSubmitLabel = t('search.submitLabel');

  const hasMegaMenu = data.megaMenu.columns.length > 0;

  type PrimaryItem =
    | { type: 'link'; key: string; item: NavItem }
    | { type: 'mega'; key: string };

  const primaryItems = useMemo<PrimaryItem[]>(() => {
    const items: PrimaryItem[] = [];
    if (!data.nav.length && !hasMegaMenu) {
      return items;
    }

    if (data.nav.length) {
      const [first, ...rest] = data.nav;
      items.push({ type: 'link', key: 'link-0', item: first });
      if (hasMegaMenu) {
        items.push({ type: 'mega', key: '__mega' });
      }
      rest.forEach((item, index) => {
        items.push({ type: 'link', key: `link-${index + 1}`, item });
      });
    } else if (hasMegaMenu) {
      items.push({ type: 'mega', key: '__mega' });
    }

    return items;
  }, [data.nav, hasMegaMenu]);

  const megaMenuActive = useMemo(
    () =>
      data.megaMenu.columns.some((column) =>
        column.items.some((item) => isInternalMatch(currentPath, item.href)),
      ),
    [currentPath, data.megaMenu.columns],
  );

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const scheduleOpen = useCallback(
    (key: string) => {
      clearTimers();
      openTimer.current = setTimeout(() => {
        setActiveDropdown(key);
      }, OPEN_DELAY);
    },
    [clearTimers],
  );

  const scheduleClose = useCallback(
    (key: string) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
      closeTimer.current = setTimeout(() => {
        setActiveDropdown((prev) => (prev === key ? null : prev));
      }, CLOSE_DELAY);
    },
    [],
  );

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleLogoClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      if (currentPath !== '/') {
        return;
      }
      event.preventDefault();
      const target = document.getElementById('herosection');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPath],
  );

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const query = searchQuery.trim();
      if (query) {
        console.info('Search query submitted:', query);
      }
      setSearchQuery('');
      closeSearch();
    },
    [closeSearch, searchQuery],
  );

  const handleSearchBlur = useCallback(() => {
    if (searchBlurTimer.current) {
      clearTimeout(searchBlurTimer.current);
    }
    searchBlurTimer.current = setTimeout(() => {
      const active = document.activeElement;
      const containers = [searchContainerRef.current, searchMobilePanelRef.current];
      if (containers.some((element) => element && element.contains(active))) {
        return;
      }
      closeSearch();
    }, 150);
  }, [closeSearch]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, key: string) => {
      if (event.key === 'Escape') {
        closeDropdown();
        event.currentTarget.blur();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveDropdown(key);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        closeDropdown();
      }
    },
    [closeDropdown],
  );

  useEffect(() => {
    return () => {
      clearTimers();
      if (searchBlurTimer.current) {
        clearTimeout(searchBlurTimer.current);
      }
    };
  }, [clearTimers]);

  useEffect(() => {
    closeDropdown();
    setMobileOpen(false);
    closeSearch();
    setSearchQuery('');
  }, [pathname, closeDropdown, closeSearch]);

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

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const handleOutside = (event: globalThis.MouseEvent) => {
      const containers = [searchContainerRef.current, searchMobilePanelRef.current];
      if (containers.some((element) => element && element.contains(event.target as Node))) {
        return;
      }
      closeSearch();
    };
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const media = window.matchMedia('(min-width: 1024px)');
    const target = media.matches
      ? searchDesktopInputRef.current
      : searchMobileInputRef.current;
    requestAnimationFrame(() => target?.focus());
  }, [searchOpen]);

  return (
    <>
      <SocialFloating />
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#FFFEFE] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto flex h-[80px] w-full max-w-[1280px] items-center justify-between gap-8 px-6">
          <div onMouseLeave={cancelClose}>
            <Link
              href="/"
              className="flex items-center gap-3 text-left"
              onClick={handleLogoClick}
              prefetch
            >
              <Image src="/logo.png" alt={COMPANY.legalNameEn} width={44} height={44} priority />
              <span className="text-xl font-extrabold tracking-[0.18em] text-virintira-primary">ViRINTIRA</span>
            </Link>
          </div>
          <nav
            className="hidden flex-1 items-center justify-center gap-10 lg:flex"
            aria-label="Primary"
            role="menubar"
          >
            {primaryItems.map((entry) => {
              if (entry.type === 'mega') {
                if (!hasMegaMenu) {
                  return null;
                }
                return (
                  <div
                    key={entry.key}
                    className="relative"
                    onMouseEnter={() => scheduleOpen('__mega')}
                    onMouseLeave={() => scheduleClose('__mega')}
                  >
                    <button
                      type="button"
                      className={`nv-underline inline-flex items-center gap-2 px-2 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-[#2A2424] transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/30 ${
                        activeDropdown === '__mega' || megaMenuActive ? 'text-virintira-primary' : ''
                      }`}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === '__mega'}
                      aria-current={megaMenuActive ? 'page' : undefined}
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === '__mega' ? null : '__mega'))
                      }
                      onKeyDown={(event) => handleKeyDown(event, '__mega')}
                      onFocus={() => scheduleOpen('__mega')}
                    >
                      <span className="flex items-center gap-2">
                        <span>{data.megaMenu.triggerLabel}</span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-xs transition-transform duration-150 ease-out ${
                            activeDropdown === '__mega' ? 'rotate-180 text-virintira-primary' : ''
                          }`}
                        />
                      </span>
                    </button>
                    {activeDropdown === '__mega' ? (
                      <MegaMenu
                        columns={data.megaMenu.columns}
                        onMouseEnter={cancelClose}
                        onMouseLeave={() => scheduleClose('__mega')}
                        onLinkClick={closeDropdown}
                      />
                    ) : null}
                  </div>
                );
              }

              const item = entry.item;
              const icon = getNavIcon(item);
              const hasMenu = Boolean(item.subMenu?.length);
              const key = item.label || entry.key;
              const isActive =
                isInternalMatch(currentPath, item.href) || hasActiveSubmenu(item, currentPath);
              const linkClassName = `nv-underline inline-flex items-center gap-2 px-2 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-[#2A2424] transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/30 ${
                activeDropdown === key || isActive ? 'text-virintira-primary' : ''
              }`;

              const content = (
                <span className="flex items-center gap-2">
                  {icon ? (
                    <FontAwesomeIcon icon={icon} className="text-sm text-virintira-primary" />
                  ) : null}
                  <span>{item.label}</span>
                  {hasMenu ? (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-xs transition-transform duration-150 ease-out ${
                        activeDropdown === key || isActive ? 'rotate-180 text-virintira-primary' : ''
                      }`}
                    />
                  ) : null}
                </span>
              );

              if (hasMenu) {
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => scheduleOpen(key)}
                    onMouseLeave={() => scheduleClose(key)}
                  >
                    <button
                      type="button"
                      className={linkClassName}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === key}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === key ? null : key))
                      }
                      onKeyDown={(event) => handleKeyDown(event, key)}
                      onFocus={() => scheduleOpen(key)}
                    >
                      {content}
                    </button>
                    {activeDropdown === key ? (
                      <SubMenu
                        sections={item.subMenu ?? []}
                        onItemClick={closeDropdown}
                        onMouseEnter={cancelClose}
                        onMouseLeave={() => scheduleClose(key)}
                      />
                    ) : null}
                  </div>
                );
              }

              const href = item.href ?? '#';
              const linkProps = {
                className: linkClassName,
                'aria-current': isActive ? 'page' : undefined,
                onFocus: closeDropdown,
                onMouseEnter: () => scheduleOpen(key),
                onMouseLeave: () => scheduleClose(key),
              } as const;

              if (href.startsWith('#') || isExternalHref(href)) {
                return (
                  <a key={key} href={href} {...linkProps}>
                    {content}
                  </a>
                );
              }

              return (
                <Link key={key} href={normalizeInternalHref(href)} {...linkProps} prefetch>
                  {content}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            <div ref={searchContainerRef} className="relative h-10 w-10">
              <form
                className="nv-search-collapse absolute right-12 top-1/2 flex h-10 -translate-y-1/2 items-center gap-3 rounded-md bg-white px-4 text-sm shadow-[0_10px_32px_rgba(167,9,9,0.12)] ring-1 ring-virintira-primary/20"
                data-open={searchOpen}
                onSubmit={handleSearchSubmit}
              >
                <input
                  ref={searchDesktopInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={handleSearchBlur}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="w-full border-none bg-transparent text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-virintira-primary text-white shadow-[0_10px_26px_rgba(167,9,9,0.28)] transition-colors duration-150 ease-out hover:bg-[#C9341F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
                >
                  <span className="sr-only">{searchSubmitLabel}</span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                </button>
              </form>
              <SearchToggle
                active={searchOpen}
                srLabel={searchToggleLabel}
                onClick={handleSearchToggle}
                onBlur={handleSearchBlur}
                className="absolute right-0 top-1/2 -translate-y-1/2"
              />
            </div>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <SearchToggle
              active={searchOpen}
              srLabel={searchToggleLabel}
              onClick={handleSearchToggle}
            />
            <LanguageSwitcher />
            <HamburgerButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
        <div
          ref={searchMobilePanelRef}
          className="overflow-hidden border-t border-virintira-primary/10 bg-[#FFFEFE] px-6 transition-all duration-200 ease-out-soft data-[open=false]:max-h-0 data-[open=false]:opacity-0 data-[open=true]:max-h-32 data-[open=true]:opacity-100 lg:hidden"
          data-open={searchOpen}
        >
          <form
            className="mx-auto my-4 flex max-w-md items-center gap-3 rounded-full border border-virintira-primary/20 bg-white px-5 py-3 shadow-[0_12px_32px_rgba(167,9,9,0.12)]"
            onSubmit={handleSearchSubmit}
          >
            <input
              ref={searchMobileInputRef}
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              placeholder={mobilePlaceholder}
              aria-label={mobilePlaceholder}
              className="flex-1 border-none bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-virintira-primary text-white shadow-[0_10px_26px_rgba(167,9,9,0.28)] transition-colors duration-150 ease-out hover:bg-[#C9341F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
            >
              <span className="sr-only">{searchSubmitLabel}</span>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
            </button>
          </form>
        </div>
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
