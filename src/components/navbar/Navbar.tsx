"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFire, faSearch } from '@fortawesome/free-solid-svg-icons';

import { COMPANY } from '@/data/company';
import { Link, usePathname } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import { HamburgerButton } from './HamburgerButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { SocialFloating } from './SocialFloating';
import { SubMenu } from './SubMenu';
import type { NavItem, NavbarData } from './types';

const OPEN_DELAY = 180;
const CLOSE_DELAY = 220;

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

type PrimaryItem =
  | { type: 'link'; key: string; item: NavItem }
  | { type: 'mega'; key: string };

export function Navbar({ data }: { data: NavbarData }) {
  const t = useTranslations('layout.header');
  const pathname = usePathname();
  const currentPath = useMemo(() => normalizePath(pathname || '/'), [pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchOverlayRef = useRef<HTMLDivElement | null>(null);
  const searchMobilePanelRef = useRef<HTMLDivElement | null>(null);
  const searchDesktopInputRef = useRef<HTMLInputElement | null>(null);
  const searchMobileInputRef = useRef<HTMLInputElement | null>(null);

  const searchPlaceholder = t('search.placeholder');
  const mobilePlaceholder = t('search.mobilePlaceholder');
  const searchToggleLabel = t('search.toggleLabel');
  const searchSubmitLabel = t('search.submitLabel');

  const hasMegaMenu = data.megaMenu.columns.length > 0;

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

  const scheduleClose = useCallback((key: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }, CLOSE_DELAY);
  }, []);

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

  const handleDesktopBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.trim()) {
        return;
      }
      closeSearch();
    },
    [closeSearch],
  );

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
    };
  }, [clearTimers]);

  useEffect(() => {
    closeDropdown();
    setMobileOpen(false);
    closeSearch();
    setSearchQuery('');
  }, [pathname, closeDropdown, closeSearch]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      const overlay = searchOverlayRef.current;
      const mobilePanel = searchMobilePanelRef.current;
      if (overlay?.contains(event.target as Node) || mobilePanel?.contains(event.target as Node)) {
        return;
      }
      closeSearch();
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
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

  const linkBaseClasses =
    "group relative flex h-full items-center whitespace-nowrap px-3 text-[15px] font-medium tracking-[0.02em] text-[#211E1E] transition-colors duration-200 hover:text-[#A70909] aria-[current=page]:text-[#A70909] aria-[expanded=true]:text-[#A70909] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/30 after:absolute after:left-0 after:right-0 after:-bottom-[18px] after:h-[4px] after:rounded-full after:bg-transparent after:content-[''] after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:bg-[#A70909] hover:after:scale-x-100 aria-[current=page]:after:bg-[#A70909] aria-[current=page]:after:scale-x-100 aria-[expanded=true]:after:bg-[#A70909] aria-[expanded=true]:after:scale-x-100";

  return (
    <>
      <SocialFloating />
      <div className="flex h-full w-full items-center gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={handleLogoClick}
          prefetch
        >
          <Image
            src="/logo.png"
            alt={COMPANY.legalNameEn}
            width={44}
            height={44}
            priority
          />
          <span className="text-[20px] font-bold tracking-[0.02em] text-[#A70909]">ViRINTIRA</span>
        </Link>
        <nav
          className="hidden h-full flex-1 items-end justify-center gap-10 pb-[18px] lg:flex"
          aria-label="Primary"
          role="menubar"
        >
          {primaryItems.map((entry) => {
            if (entry.type === 'mega') {
              if (!hasMegaMenu) {
                return null;
              }
              const isActive = activeDropdown === '__mega' || megaMenuActive;
              return (
                <div
                  key={entry.key}
                  className="relative h-full"
                  onMouseEnter={() => scheduleOpen('__mega')}
                  onMouseLeave={() => scheduleClose('__mega')}
                >
                  <button
                    type="button"
                    className={linkBaseClasses}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === '__mega'}
                    aria-current={megaMenuActive ? 'page' : undefined}
                    onClick={() =>
                      setActiveDropdown((prev) => (prev === '__mega' ? null : '__mega'))
                    }
                    onKeyDown={(event) => handleKeyDown(event, '__mega')}
                    onFocus={() => scheduleOpen('__mega')}
                    data-active={isActive}
                  >
                    <span className="flex items-center gap-2 text-[15px] leading-none">
                      <span>{data.megaMenu.triggerLabel}</span>
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

            const className = `${linkBaseClasses} ${
              activeDropdown === key || isActive ? 'text-[#A70909]' : ''
            }`;

            const showChevron = hasMenu && icon === undefined;

            const content = (
              <span className="flex items-center gap-2 text-[15px] leading-none">
                {icon ? (
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-base text-[#A70909] motion-safe:animate-bounce"
                  />
                ) : null}
                <span>{item.label}</span>
                {showChevron ? (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs transition-transform duration-200 ${
                      activeDropdown === key || isActive ? 'rotate-180 text-[#A70909]' : ''
                    }`}
                  />
                ) : null}
              </span>
            );

            if (hasMenu) {
              return (
                <div
                  key={key}
                  className="relative h-full"
                  onMouseEnter={() => scheduleOpen(key)}
                  onMouseLeave={() => scheduleClose(key)}
                >
                  <button
                    type="button"
                    className={className}
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
              className,
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
        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <SearchToggle
            active={searchOpen}
            srLabel={searchToggleLabel}
            onClick={handleSearchToggle}
          />
          <LanguageSwitcher />
        </div>
        <div className="ml-auto flex items-center gap-3 lg:hidden">
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
      {searchOpen ? (
        <div
          ref={searchOverlayRef}
          className="fixed left-1/2 top-[calc(var(--nav-h)+12px)] z-[60] w-[min(90vw,820px)] -translate-x-1/2 px-5 hidden lg:block"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-full border border-black/10 bg-white shadow-lg"
          >
            <div className="flex h-12 items-center gap-3 px-5">
              <FontAwesomeIcon icon={faSearch} className="text-[#A70909]" />
              <input
                ref={searchDesktopInputRef}
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                onBlur={handleDesktopBlur}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-full flex-1 bg-transparent text-[15px] text-neutral-800 placeholder:text-neutral-400 outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[#A70909] px-4 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#8F0707] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40"
              >
                {searchSubmitLabel}
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <div
        ref={searchMobilePanelRef}
        className="overflow-hidden border-t border-black/10 bg-white px-5 transition-all duration-300 ease-out-soft data-[open=false]:max-h-0 data-[open=false]:opacity-0 data-[open=true]:max-h-32 data-[open=true]:opacity-100 lg:hidden"
        data-open={searchOpen}
      >
        <form
          className="mx-auto my-4 flex max-w-md items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 shadow-lg"
          onSubmit={handleSearchSubmit}
        >
          <FontAwesomeIcon icon={faSearch} className="text-[#A70909]" />
          <input
            ref={searchMobileInputRef}
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={mobilePlaceholder}
            aria-label={mobilePlaceholder}
            className="flex-1 border-none bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-[#A70909] px-4 py-1 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#8F0707] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40"
          >
            {searchSubmitLabel}
          </button>
        </form>
      </div>
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
