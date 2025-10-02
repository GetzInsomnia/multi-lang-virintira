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
import {
  faChevronDown,
  faFire,
  faMagnifyingGlass,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

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

const DEFAULT_HEADER_HEIGHT = 72;
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
  const phoneLabel = t('actions.phoneLabel');

  const hasMegaMenu = data.megaMenu.columns.length > 0;
  const navItems = useMemo(() => {
    return data.nav.filter((item) => item.label !== data.megaMenu.triggerLabel);
  }, [data.nav, data.megaMenu.triggerLabel]);

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

  const announcement = data.announcement;

  return (
    <>
      <SocialFloating />
      <header ref={headerRef} className="navbar-container">
        {announcement?.message ? (
          <div className="navbar-announcement" role="region" aria-live="polite">
            <div className="navbar-announcement-content">
              <p className="navbar-announcement-text">{announcement.message}</p>
              {announcement.actionLabel && announcement.actionHref ? (
                (() => {
                  const href = announcement.actionHref;
                  if (href.startsWith('#') || isExternalHref(href)) {
                    return (
                      <a href={href} className="navbar-announcement-action">
                        {announcement.actionLabel}
                      </a>
                    );
                  }
                  return (
                    <Link
                      href={normalizeInternalHref(href)}
                      className="navbar-announcement-action"
                      prefetch
                    >
                      {announcement.actionLabel}
                    </Link>
                  );
                })()
              ) : null}
            </div>
          </div>
        ) : null}
        <div className="navbar-bar">
          <div className="navbar-brand" onMouseLeave={cancelClose}>
            <Link href="/" className="navbar-brand-link" onClick={handleLogoClick} prefetch>
              <Image
                src="/logo.png"
                alt={COMPANY.legalNameEn}
                width={40}
                height={40}
                priority
              />
              <span className="navbar-brand-text">VIRINTIRA</span>
            </Link>
          </div>
          <nav className="navbar-primary" aria-label="Primary" role="menubar">
            {navItems.map((item) => {
              const icon = getNavIcon(item);
              const hasMenu = Boolean(item.subMenu?.length);
              const key = item.label;
              const isActive = isInternalMatch(currentPath, item.href) || hasActiveSubmenu(item, currentPath);
              const linkClassName = `navbar-link nav-underline ${
                activeDropdown === key || isActive ? 'is-active' : ''
              }`;

              const content = (
                <span className="navbar-link-inner">
                  {icon ? <FontAwesomeIcon icon={icon} className="navbar-link-icon" /> : null}
                  <span>{item.label}</span>
                  {hasMenu ? (
                    <FontAwesomeIcon icon={faChevronDown} className="navbar-link-caret" />
                  ) : null}
                </span>
              );

              if (hasMenu) {
                return (
                  <div
                    key={key}
                    className="navbar-item"
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
            {hasMegaMenu ? (
              <div
                className="navbar-item"
                onMouseEnter={() => scheduleOpen('__mega')}
                onMouseLeave={() => scheduleClose('__mega')}
              >
                <button
                  type="button"
                  className={`navbar-link nav-underline ${
                    activeDropdown === '__mega' || megaMenuActive ? 'is-active' : ''
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
                  <span className="navbar-link-inner">
                    <span>{data.megaMenu.triggerLabel}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="navbar-link-caret" />
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
            ) : null}
          </nav>
          <div className="navbar-actions">
            <div ref={searchContainerRef} className="navbar-search-group">
              <form
                className="navbar-search-form search-collapse"
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
                  className="navbar-search-input"
                />
                <button type="submit" className="navbar-search-submit">
                  <span className="sr-only">{searchSubmitLabel}</span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar-search-submit-icon" />
                </button>
              </form>
              <SearchToggle
                active={searchOpen}
                srLabel={searchToggleLabel}
                onClick={handleSearchToggle}
                onBlur={handleSearchBlur}
                className="navbar-search-toggle-button"
              />
            </div>
            <div className="navbar-phone">
              <FontAwesomeIcon icon={faPhone} aria-hidden className="navbar-phone-icon" />
              <div className="navbar-phone-text">
                <span className="navbar-phone-label">{phoneLabel}</span>
                <a href={`tel:${COMPANY.phone}`} className="navbar-phone-number">
                  {COMPANY.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="navbar-language-wrapper">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="navbar-mobile-actions">
            <SearchToggle
              active={searchOpen}
              srLabel={searchToggleLabel}
              onClick={handleSearchToggle}
              className="navbar-mobile-search"
            />
            <LanguageSwitcher className="navbar-mobile-language" />
            <HamburgerButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
        <div
          ref={searchMobilePanelRef}
          className="navbar-search-mobile"
          data-open={searchOpen}
        >
          <form className="navbar-search-mobile-form" onSubmit={handleSearchSubmit}>
            <input
              ref={searchMobileInputRef}
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              placeholder={mobilePlaceholder}
              aria-label={mobilePlaceholder}
              className="navbar-search-mobile-input"
            />
            <button type="submit" className="navbar-search-mobile-submit">
              <span className="sr-only">{searchSubmitLabel}</span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
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
