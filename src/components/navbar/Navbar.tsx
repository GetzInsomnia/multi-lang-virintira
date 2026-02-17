// src/components/navbar/Navbar.tsx
'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

import HamburgerButton from './HamburgerButton';
import LanguageSwitcher, { DEFAULT_LOCALES } from './LanguageSwitcher';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import NavLink from './NavLink';
import SearchToggle from './SearchToggle';
import SocialFloating from './SocialFloating';
import type { MegaMenuColumn, NavItem, NavbarData } from './types';
import type { MenuItem } from './MobileMenuView';
import type { Locale } from '@/i18n/config';
import { useUI } from '@/context/UIContext';
import {
  MOBILE_MENU_TRANSITION_DURATION_CLASS,
  MOBILE_MENU_TRANSITION_EASING_CLASS,
} from '@/components/navbar/mobileMenuTransition';

// Minimum spacing (in px) to keep between the desktop nav and surrounding controls.
const SAFE_GAP_PX = 30;

function isInternalMatch(currentPath: string, href?: string): boolean {
  if (!href || href.startsWith('#')) return false;
  const target = normalizeInternalHref(href);
  if (!target || target === '#') return false;
  if (target === '/') return currentPath === '/';
  return currentPath === target || currentPath.startsWith(`${target}/`);
}

function hasActiveMega(columns: MegaMenuColumn[], currentPath: string) {
  return columns.some((column) =>
    column.items.some((item) => isInternalMatch(currentPath, item.href)),
  );
}

type NavEntry = { type: 'link'; item: NavItem } | { type: 'mega'; item: NavItem };

type NavbarProps = { data: NavbarData };

// สร้างข้อมูลสำหรับ MobileMenu (ชั้นซ้อนแบบ legacy)
function buildMobileItems(nav: NavItem[], columns: MegaMenuColumn[]): MenuItem[] {
  const items: MenuItem[] = [];

  const megaMenuSections =
    columns.length > 0
      ? columns.map((col) => ({
        label: col.title,
        items: col.items.map((entry) => ({ label: entry.label, href: entry.href })),
      }))
      : null;

  nav.forEach((item, index) => {
    const isServices = Boolean(megaMenuSections) && index === 1;

    if (isServices) {
      items.push({
        label: item.label,
        items: megaMenuSections ?? undefined,
        highlight: item.highlight,
      });
      return;
    }

    items.push({ label: item.label, href: item.href, highlight: item.highlight });
  });

  return items;
}

export default function Navbar({ data }: NavbarProps) {
  const { isContactDrawerOpen } = useUI();
  const locale = useLocale();
  const t = useTranslations('layout.header');
  const pathname = usePathname() || '/';
  const router = useRouter();
  const normalizedPath = useMemo(() => normalizeInternalHref(pathname) || '/', [pathname]);
  const currentPath = normalizedPath;
  const basePath = normalizedPath;

  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forceMobile, setForceMobile] = useState(false);
  const [compactActions, setCompactActions] = useState(false);

  const megaOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // สำคัญ: ใช้ครอบ "ปุ่ม" จริง ๆ และกัน bubble ด้วย onMouseDown
  const openerRef = useRef<HTMLSpanElement | null>(null);
  // Refs for measuring layout gaps without restructuring the header DOM.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const navWidthRef = useRef(0);
  const measureRaf = useRef<number | null>(null);
  const resizeRaf = useRef<number | null>(null);
  const deferredSearchRaf = useRef<number | null>(null);
  const deferredSearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const megaColumns = data.megaMenu.columns;
  const hasMegaMenu = megaColumns.length > 0;

  const navEntries = useMemo<NavEntry[]>(() => {
    if (!data.nav.length) return [];

    const servicesIndex = data.nav.findIndex((item) => {
      const normalizedHref = item.href?.trim().toLowerCase();
      return (
        normalizedHref === '/services' ||
        normalizedHref === '/under-construction' ||
        normalizedHref === '#services'
      );
    });

    const normalizedServicesIndex =
      servicesIndex >= 0
        ? servicesIndex
        : hasMegaMenu && data.nav.length > 1
          ? 1
          : -1;

    return data.nav.map((item, idx) => {
      const isServices = hasMegaMenu && idx === normalizedServicesIndex;
      if (isServices) {
        const servicesHref = !item.href || item.href.trim().startsWith('#')
          ? '/services'
          : item.href;
        return { type: 'mega', item: { ...item, href: servicesHref } };
      }
      return { type: 'link', item };
    });
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
      if (megaOpenTimer.current) clearTimeout(megaOpenTimer.current);
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (deferredSearchRaf.current !== null) {
        cancelAnimationFrame(deferredSearchRaf.current);
        deferredSearchRaf.current = null;
      }
      if (deferredSearchTimeout.current !== null) {
        clearTimeout(deferredSearchTimeout.current);
        deferredSearchTimeout.current = null;
      }
    };
  }, []);

  const measureHeaderSpace = useCallback(() => {
    // Measure layout on the next animation frame to avoid layout thrashing.
    if (typeof window === 'undefined') return;

    if (measureRaf.current !== null) {
      cancelAnimationFrame(measureRaf.current);
    }

    measureRaf.current = window.requestAnimationFrame(() => {
      measureRaf.current = null;

      const logoEl = logoRef.current;
      const navEl = navRef.current;
      const actionsEl = actionsRef.current;
      if (!logoEl || !navEl || !actionsEl) return;

      const containerWidth = containerRef.current?.clientWidth ?? window.innerWidth;

      const vw = window.innerWidth;
      const nextCompact = vw <= 349;

      setCompactActions((prev) => {
        if (prev === nextCompact) return prev;
        return nextCompact;
      });

      if (nextCompact) {
        return;
      }

      const logoRect = logoEl.getBoundingClientRect();
      const actionsRect = actionsEl.getBoundingClientRect();

      const mobileQuery = window.matchMedia('(max-width: 767px)');
      if (mobileQuery.matches) {
        setForceMobile((prev) => (prev ? false : prev));
        return;
      }

      let leftGap: number;
      let rightGap: number;
      let navWidth = navWidthRef.current;

      if (!forceMobile) {
        const navRect = navEl.getBoundingClientRect();
        navWidthRef.current = navRect.width;
        navWidth = navRect.width;
        leftGap = navRect.left - logoRect.right;
        rightGap = actionsRect.left - navRect.right;
      } else {
        const navWidth = navWidthRef.current;
        const availableSpace = actionsRect.left - logoRect.right;
        const remainingSpace = availableSpace - navWidth;
        const simulatedGap = remainingSpace / 2;
        leftGap = simulatedGap;
        rightGap = simulatedGap;
      }

      const combinedWidth = logoRect.width + navWidth + actionsRect.width + SAFE_GAP_PX;
      const overflowDetected = combinedWidth > containerWidth;

      // Hysteresis buffer: Require significantly more space to EXIT mobile mode.
      // This prevents flickering at the boundary where removing the hamburger button
      // (which shrinks actionsRect) would immediately cause the nav to "fit" again.
      const HYSTERESIS_PX = 20;

      const shouldForce = overflowDetected || leftGap < SAFE_GAP_PX || rightGap < SAFE_GAP_PX;

      setForceMobile((prev) => {
        if (shouldForce && !prev && megaOpen) {
          setMegaOpen(false);
        }

        // If currently forced mobile, require extra space (hysteresis) to switch back.
        if (prev && !shouldForce) {
          // Check if we are really safe to switch back
          const safeGap = SAFE_GAP_PX + HYSTERESIS_PX;
          if (leftGap < safeGap || rightGap < safeGap) {
            return true; // Keep forcing mobile
          }
        }

        // Safety: If navWidth calculation was 0 (e.g. hidden), do not switch out of mobile mode violently.
        if (prev && navWidth <= 0) {
          return true;
        }

        if (prev === shouldForce) return prev;
        return shouldForce;
      });
    });
  }, [forceMobile, megaOpen]);

  useEffect(() => {
    // Debounced window resize handler (via rAF) keeps measurements responsive without spam.
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      if (resizeRaf.current !== null) {
        cancelAnimationFrame(resizeRaf.current);
      }
      resizeRaf.current = window.requestAnimationFrame(() => {
        resizeRaf.current = null;
        measureHeaderSpace();
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeRaf.current !== null) {
        cancelAnimationFrame(resizeRaf.current);
        resizeRaf.current = null;
      }
    };
  }, [measureHeaderSpace]);

  useEffect(() => {
    // Single ResizeObserver covering the logo/nav/actions clusters.
    if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') {
      measureHeaderSpace();
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      measureHeaderSpace();
    });

    const elements: Element[] = [];
    if (containerRef.current) elements.push(containerRef.current);
    if (logoRef.current) elements.push(logoRef.current);
    if (navRef.current) elements.push(navRef.current);
    if (actionsRef.current) elements.push(actionsRef.current);

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [measureHeaderSpace]);

  useEffect(() => {
    // Recalculate after locale/content changes; refresh the cached nav width when collapsed.
    const navEl = navRef.current;
    if (!navEl) {
      measureHeaderSpace();
      return;
    }

    if (forceMobile) {
      const { display, position, visibility, pointerEvents } = navEl.style;
      navEl.style.display = 'flex';
      navEl.style.position = 'absolute';
      navEl.style.visibility = 'hidden';
      navEl.style.pointerEvents = 'none';

      const width = navEl.getBoundingClientRect().width || navEl.scrollWidth;
      navWidthRef.current = width;

      navEl.style.display = display;
      navEl.style.position = position;
      navEl.style.visibility = visibility;
      navEl.style.pointerEvents = pointerEvents;
    }

    measureHeaderSpace();
  }, [
    measureHeaderSpace,
    forceMobile,
    locale,
    data.nav,
    data.megaMenu.columns,
    data.megaMenu.triggerLabel,
  ]);

  useEffect(() => {
    return () => {
      if (measureRaf.current !== null) {
        cancelAnimationFrame(measureRaf.current);
        measureRaf.current = null;
      }
    };
  }, []);

  const scheduleMegaOpen = () => {
    if (!hasMegaMenu) return;
    if (megaCloseTimer.current) { clearTimeout(megaCloseTimer.current); megaCloseTimer.current = null; }
    if (megaOpenTimer.current) clearTimeout(megaOpenTimer.current);
    megaOpenTimer.current = setTimeout(() => {
      setMegaOpen(true);
      setSearchOpen(false);
      setLanguageOpen(false);
    }, 100);
  };

  const scheduleMegaClose = () => {
    if (!hasMegaMenu) return;
    if (megaOpenTimer.current) { clearTimeout(megaOpenTimer.current); megaOpenTimer.current = null; }
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const cancelMegaClose = () => {
    if (megaCloseTimer.current) { clearTimeout(megaCloseTimer.current); megaCloseTimer.current = null; }
  };

  const handleMobileToggle = () => {
    setMobileOpen((prev) => !prev);
    setSearchOpen(false);
    setLanguageOpen(false);
    setMegaOpen(false);
  };

  const onSearchOpenChange = useCallback((open: boolean) => {
    setSearchOpen(open);
    if (open) {
      setLanguageOpen(false);
      setMegaOpen(false);
    }
  }, []);

  const onLanguageOpenChange = useCallback((open: boolean) => {
    setLanguageOpen(open);
    if (open) {
      setSearchOpen(false);
      setMegaOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!compactActions) return;
    setSearchOpen(false);
    setLanguageOpen(false);
  }, [compactActions]);

  const mobileItems = useMemo(
    () => buildMobileItems(data.nav, data.megaMenu.columns),
    [data.nav, data.megaMenu.columns],
  );

  const languageCodes = useMemo(() => {
    const unique = new Set(DEFAULT_LOCALES.map((code) => code.toLowerCase()));
    unique.add(locale.toLowerCase());
    return Array.from(unique);
  }, [locale]);

  const handleDrawerSearch = useCallback(() => {
    setMobileOpen(false);

    if (deferredSearchRaf.current !== null) {
      cancelAnimationFrame(deferredSearchRaf.current);
      deferredSearchRaf.current = null;
    }
    if (deferredSearchTimeout.current !== null) {
      clearTimeout(deferredSearchTimeout.current);
      deferredSearchTimeout.current = null;
    }

    deferredSearchRaf.current = requestAnimationFrame(() => {
      deferredSearchTimeout.current = setTimeout(() => {
        deferredSearchTimeout.current = null;
        onSearchOpenChange(true);
      }, 24);
    });
  }, [onSearchOpenChange]);

  const handleDrawerLocaleSelect = useCallback(
    (targetLocale: string) => {
      const normalizedLocale = targetLocale.toLowerCase();

      setLanguageOpen(false);
      setSearchOpen(false);

      if (normalizedLocale === locale.toLowerCase()) {
        setMobileOpen(false);
        return;
      }

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('vir-scrollY', String(window.scrollY));
        } catch { }
      }

      router.push(basePath, { locale: normalizedLocale as Locale, scroll: false });
      setMobileOpen(false);
    },
    [router, basePath, locale],
  );

  return (
    <>
      <SocialFloating {...({ menuOpen: mobileOpen } as any)} />


      <header
        className={`sticky top-0 z-[61] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-transform ${MOBILE_MENU_TRANSITION_DURATION_CLASS} ${MOBILE_MENU_TRANSITION_EASING_CLASS} supports-[backdrop-filter]:bg-white/60 ${isContactDrawerOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        style={{ '--header-height': '72px', paddingRight: 'var(--removed-body-scroll-bar-size, 0px)' } as CSSProperties}
      >
        <div ref={containerRef} className="relative mx-auto max-w-[1280px] px-4">
          <div className="flex h-[var(--header-height)] items-center justify-between">
            <Link
              ref={logoRef}
              href={normalizeInternalHref('/')}
              className="flex items-center gap-3"
              prefetch
            >
              <Image src="/logo.png" alt="ViRINTIRA" width={44} height={44} priority />
              <span className="text-[22px] font-extrabold tracking-[0.02em] text-[#A70909]">ViRINTIRA</span>
            </Link>

            {/* 
              Desktop Nav:
              - Use absolute positioning + transform to ensure it's mathematically centered within the max-w container.
              - Standard justify-between pushes it off-center because Logo width != Actions width.
            */}
            <nav
              ref={navRef}
              className={`hidden md:flex items-center gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible${forceMobile ? ' !hidden' : ''}`}
              aria-label="Primary navigation"
            >
              {navEntries.map((entry, index) => {
                if (entry.type === 'mega') {
                  if (!hasMegaMenu) return null;
                  const isOpen = megaOpen || megaActive;
                  const { item } = entry;
                  return (
                    <div
                      key={`mega-${index}`}
                      className="relative"
                      onMouseEnter={scheduleMegaOpen}
                      onMouseLeave={scheduleMegaClose}
                      onFocus={scheduleMegaOpen}
                      onBlur={scheduleMegaClose}
                    >
                      <NavLink
                        href={item.href || '/services'}
                        label={item.label}
                        active={isOpen}
                        flame={Boolean(item.highlight)}
                        onClick={() => {
                          // Do NOT close mega menu on click; let hover state persist to avoid flicker.
                          // The menu will close naturally when the user moves the mouse away.
                          setSearchOpen(false);
                          setLanguageOpen(false);
                        }}
                        ariaExpanded={isOpen}
                        ariaControls="mega-menu-panel"
                        role="button"
                      />
                    </div>
                  );
                }

                const { item } = entry;
                const active = isInternalMatch(currentPath, item.href);
                return (
                  <NavLink
                    key={`${item.label}-${index}`}
                    href={item.href || '#'}
                    label={item.label}
                    flame={Boolean(item.highlight)}
                    active={active}
                    onMouseEnter={() => setMegaOpen(false)}
                  />
                );
              })}
            </nav>

            <div ref={actionsRef} className="flex items-center gap-4">
              <SearchToggle
                open={searchOpen}
                onOpenChange={onSearchOpenChange}
                placeholder={t('search.placeholder')}
                submitLabel={t('search.submitLabel')}
                compactHidden={compactActions}
              />
              <LanguageSwitcher
                open={languageOpen}
                onOpenChange={onLanguageOpenChange}
                currentLocale={locale}
                compactHidden={compactActions}
              />
              {/* Surface the hamburger on desktop only when space is constrained (no breakpoint changes). */}
              <div className={forceMobile ? 'md:block' : 'md:hidden'}>
                {/* กัน bubble คลิกแรกไม่ให้กลายเป็น outside-click */}
                <span ref={openerRef} className="inline-flex" onMouseDown={(e) => e.stopPropagation()}>
                  <HamburgerButton isOpen={mobileOpen} onClick={handleMobileToggle} />
                </span>
              </div>
            </div>
          </div>

          {hasMegaMenu ? (
            <MegaMenu
              open={megaOpen}
              columns={megaColumns}
              onMouseEnter={(e) => { void e; cancelMegaClose(); setMegaOpen(true); }}
              onMouseLeave={(e) => { void e; scheduleMegaClose(); }}
              onLinkClick={() => setMegaOpen(false)}
            />
          ) : null}
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        openerRef={openerRef}
        rootTitle="ViRINTIRA"
        items={mobileItems}
        compactActions={compactActions}
        onRequestSearch={handleDrawerSearch}
        languageLocales={languageCodes}
        currentLocale={locale}
        onSelectLocale={handleDrawerLocaleSelect}
        languageLabel="Language"
        searchLabel={t('search.submitLabel')}
      />
    </>
  );
}
