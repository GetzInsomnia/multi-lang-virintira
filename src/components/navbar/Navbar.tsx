"use client";

import Image from 'next/image';
import { useLocale } from 'next-intl';
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFire, faPhone } from '@fortawesome/free-solid-svg-icons';

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
const OPEN_DELAY = 100;
const CLOSE_DELAY = 180;

const navIconLookup: Record<string, IconDefinition> = {
  promotion: faFire,
  โปรโมชั่น: faFire,
  promotion_en: faFire,
};

function getNavIcon(item: NavItem) {
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

export function Navbar({ data }: { data: NavbarData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();

  const headerRef = useRef<HTMLElement | null>(null);
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const hasMegaMenu = data.megaMenu.columns.length > 0;

  const navItems = useMemo(() => {
    return data.nav.filter((item) => item.label !== data.megaMenu.triggerLabel);
  }, [data.nav, data.megaMenu.triggerLabel]);

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

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

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    closeDropdown();
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname, closeDropdown]);

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
      const normalizedPath =
        pathname.endsWith('/') && pathname.length > 1
          ? pathname.slice(0, -1)
          : pathname;
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

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, key: string) => {
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

  return (
    <>
      <SocialFloating />
      <header ref={headerRef} className="navbar-container">
        {data.announcement?.message ? (
          <div className="navbar-announcement">
            <div className="navbar-announcement-content">
              <p className="navbar-announcement-text">{data.announcement.message}</p>
              {data.announcement.actionLabel && data.announcement.actionHref ? (
                (() => {
                  const href = data.announcement.actionHref;
                  if (href.startsWith('#') || isExternalHref(href)) {
                    return (
                      <a
                        href={href}
                        className="navbar-announcement-action"
                      >
                        {data.announcement.actionLabel}
                      </a>
                    );
                  }
                  return (
                    <Link
                      href={normalizeInternalHref(href)}
                      className="navbar-announcement-action"
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
        <div className="navbar-inner">
          <div className="navbar-brand" onMouseLeave={cancelClose}>
            <Link
              href="/"
              className="navbar-brand-link"
              onClick={handleLogoClick}
              prefetch
            >
              <Image src="/logo.png" alt={COMPANY.legalNameEn} width={40} height={40} priority />
              <span className="navbar-brand-text">VIRINTIRA</span>
            </Link>
          </div>
          <nav className="navbar-primary" aria-label="Primary">
            {navItems.map((item) => {
              const icon = getNavIcon(item);
              const hasMenu = Boolean(item.subMenu?.length);
              const key = item.label;

              const triggerClasses = `navbar-link ${
                activeDropdown === key ? 'navbar-link-active' : ''
              }`;

              const content = (
                <span className="navbar-link-inner">
                  {icon ? (
                    <FontAwesomeIcon icon={icon} className="navbar-link-icon" />
                  ) : null}
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
                      className={triggerClasses}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === key}
                      onClick={() =>
                        setActiveDropdown((prev) => (prev === key ? null : key))
                      }
                      onKeyDown={(event) => handleKeyDown(event, key)}
                    >
                      {content}
                    </button>
                    {activeDropdown === key ? (
                      <SubMenu
                        sections={item.subMenu ?? []}
                        onItemClick={closeDropdown}
                      />
                    ) : null}
                  </div>
                );
              }

              const href = item.href ?? '#';
              const isAnchor = href.startsWith('#');
              const isExternal = isExternalHref(href);

              const linkProps = {
                className: triggerClasses,
                onMouseEnter: () => scheduleOpen(key),
                onMouseLeave: () => scheduleClose(key),
              } as const;

              if (isExternal || isAnchor) {
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
                  className={`navbar-link ${activeDropdown === '__mega' ? 'navbar-link-active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === '__mega'}
                  onClick={() =>
                    setActiveDropdown((prev) => (prev === '__mega' ? null : '__mega'))
                  }
                  onKeyDown={(event) => handleKeyDown(event, '__mega')}
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
            <SearchToggle active={searchOpen} onClick={toggleSearch} />
            <div className="navbar-contact">
              <FontAwesomeIcon icon={faPhone} aria-hidden className="navbar-contact-icon" />
              <span className="navbar-contact-text">{COMPANY.phoneDisplay}</span>
            </div>
            <LanguageSwitcher />
          </div>
          <div className="navbar-mobile-actions">
            <SearchToggle active={searchOpen} onClick={toggleSearch} />
            <LanguageSwitcher />
            <HamburgerButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
        {searchOpen ? (
          <div className="navbar-search-panel">
            <div className="navbar-search-inner">
              <input
                type="search"
                placeholder="Search accounting resources"
                className="navbar-search-input"
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
