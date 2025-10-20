'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSearch, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';
import {
  MOBILE_MENU_TRANSITION_DURATION_CLASS,
  MOBILE_MENU_TRANSITION_EASING_CLASS,
} from './mobileMenuTransition';

export type MenuItem = {
  label: string;
  href?: string;
  description?: string;
  highlight?: boolean;
  items?: MenuItem[];
};

export default function MobileMenuView({
  title,
  items,
  onBack,
  onSelectSubMenu,
  onClose,
  index,
  current,
  panelVisible,
  showUtilities = false,
  onUtilitySearch,
  languageLocales = [],
  currentLocale,
  onUtilityLocaleSelect,
  languageLabel = 'Language',
  searchLabel = 'Search',
}: {
  title: string;
  items: MenuItem[];
  onBack?: () => void;
  onSelectSubMenu?: (items: MenuItem[], title: string) => void;
  onClose: () => void;
  index: number;
  current: number;
  panelVisible: boolean;
  showUtilities?: boolean;
  onUtilitySearch?: () => void;
  languageLocales?: readonly string[];
  currentLocale?: string;
  onUtilityLocaleSelect?: (locale: string) => void;
  languageLabel?: string;
  searchLabel?: string;
}) {
  const [enter, setEnter] = useState(false);
  const [languageExpanded, setLanguageExpanded] = useState(false);
  const [searchActivated, setSearchActivated] = useState(false);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  const focusNeutralizerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const languageSectionRef = useRef<HTMLDivElement | null>(null);
  const utilitiesWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cancelQueuedFrames = () => {
      if (raf1Ref.current !== null) {
        cancelAnimationFrame(raf1Ref.current);
        raf1Ref.current = null;
      }
      if (raf2Ref.current !== null) {
        cancelAnimationFrame(raf2Ref.current);
        raf2Ref.current = null;
      }
    };

    const isCurrent = index === current;
    if (!isCurrent || !panelVisible) {
      cancelQueuedFrames();
      setEnter(false);
      return undefined;
    }

    raf1Ref.current = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        setEnter(true);
      });
    });

    return () => {
      cancelQueuedFrames();
    };
  }, [current, index, panelVisible]);

  const active = index === current && panelVisible;

  useEffect(() => {
    if (!active || !showUtilities) {
      setLanguageExpanded(false);
      setSearchActivated(false);
    }
  }, [active, showUtilities]);

  useEffect(() => {
    if (focusNeutralizerRef.current !== null) {
      cancelAnimationFrame(focusNeutralizerRef.current);
      focusNeutralizerRef.current = null;
    }

    if (!active || !showUtilities || searchActivated) {
      return undefined;
    }

    focusNeutralizerRef.current = requestAnimationFrame(() => {
      focusNeutralizerRef.current = null;
      if (searchButtonRef.current !== document.activeElement) {
        return;
      }

      if (utilitiesWrapperRef.current) {
        utilitiesWrapperRef.current.focus();
        return;
      }

      if (panelRef.current) {
        panelRef.current.focus();
        return;
      }

      searchButtonRef.current?.blur();
    });

    return () => {
      if (focusNeutralizerRef.current !== null) {
        cancelAnimationFrame(focusNeutralizerRef.current);
        focusNeutralizerRef.current = null;
      }
    };
  }, [active, showUtilities, searchActivated]);

  useEffect(() => {
    if (!languageExpanded) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (languageSectionRef.current?.contains(target)) return;
      setLanguageExpanded(false);
    };

    document.addEventListener('mousedown', handlePointerDown, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
    };
  }, [languageExpanded]);

  useEffect(() => {
    if (!languageExpanded) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLanguageExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [languageExpanded]);

  const languageListId = `mobile-language-list-${index}`;

  const handleLanguageToggle = () => {
    setLanguageExpanded((prev) => !prev);
  };

  const handleLanguageSelect = (code: string) => {
    onUtilityLocaleSelect?.(code);
    setLanguageExpanded(false);
  };

  return (
    <div
      className={[
        'absolute inset-0',
        'transition-[transform,opacity]',
        MOBILE_MENU_TRANSITION_DURATION_CLASS,
        MOBILE_MENU_TRANSITION_EASING_CLASS,
        'will-change-transform will-change-opacity',
        enter ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        active ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      ref={panelRef}
    >
      <div className="bg-white w-full h-full p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-[#A70909] text-xl"
              aria-label="Back"
            >
              <FaChevronLeft />
            </button>
          ) : (
            <div />
          )}

          <h2 className="text-lg font-semibold text-[#A70909]">{title}</h2>

          {/* ✅ ปุ่มปิดแบบ faXmark */}
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="text-[#A70909] text-xl hover:opacity-80 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* ✅ เมนูทั้งหมดเป็นสีดำ (รวมบรรทัดแรก) */}
        <ul className="space-y-4" role="menu" aria-label={title}>
          {items.map((item, idx) => {
            const key = `${item.label}-${item.href ?? 'nohref'}-${idx}`;
            if (item.items && item.items.length > 0) {
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => onSelectSubMenu?.(item.items!, item.label)}
                    className="w-full text-left text-black hover:text-[#A70909] transition-colors font-normal text-base"
                  >
                    {item.label}
                  </button>
                </li>
              );
            }

            if (item.href) {
              return (
                <li key={key}>
                  <Link
                    href={normalizeInternalHref(item.href)}
                    onClick={onClose}
                    className="block text-black hover:text-[#A70909] transition-colors font-normal text-base"
                    prefetch
                    role="menuitem"
                  >
                    {item.highlight ? (
                      <>
                        {item.label}{' '}
                        <FontAwesomeIcon
                          icon={faFire}
                          className="inline-block animate-bounce text-[#A70909]"
                        />
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                </li>
              );
            }

            return (
              <li key={key}>
                <span className="text-black font-medium text-base">{item.label}</span>
              </li>
            );
          })}
        </ul>

        {showUtilities ? (
          <div
            ref={utilitiesWrapperRef}
            tabIndex={-1}
            className="drawer-utilities mt-4 border-t border-gray-200 pt-4 space-y-3 focus:outline-none"
          >
            <button
              type="button"
              onClick={() => {
                setSearchActivated(true);
                onUtilitySearch?.();
              }}
              data-drawer-active={searchActivated ? 'true' : undefined}
              aria-pressed={searchActivated}
              className="relative flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left text-base font-medium text-[#A70909] transition-colors hover:border-[#F5B5B5] hover:bg-[#FDEAEA]"
              ref={searchButtonRef}
            >
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
              <span>{searchLabel}</span>
            </button>

            <div>
              <div ref={languageSectionRef} className="relative">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleLanguageToggle();
                  }}
                  aria-expanded={languageExpanded}
                  aria-controls={languageListId}
                  data-open={languageExpanded ? 'true' : 'false'}
                  data-drawer-active={languageExpanded ? 'true' : undefined}
                  className="relative flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-left text-base font-medium text-[#A70909] transition-colors hover:border-[#F5B5B5] hover:bg-[#FDEAEA]"
                >
                  {/* Red stripe pseudo-element removed to keep compact styling consistent. */}
                  <span className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />
                    <span>{languageLabel}</span>
                  </span>
                  <span className="text-sm text-[#6B7280]">{currentLocale?.toUpperCase()}</span>
                </button>

                <div
                  id={languageListId}
                  role="listbox"
                  aria-hidden={languageExpanded ? undefined : true}
                  className={[
                    'mt-2 rounded-md border border-gray-200 bg-white transition-[max-height,opacity] duration-200 ease-out',
                    languageExpanded
                      ? 'max-h-40 opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden',
                  ].join(' ')}
                >
                  <ul className="drawer-language-scroll max-h-40 overflow-auto pr-1">
                    {languageLocales.map((code) => {
                      const normalized = code.toLowerCase();
                      const isActive = normalized === currentLocale?.toLowerCase();
                      return (
                        <li key={code}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            onClick={() => handleLanguageSelect(code)}
                            className={[
                              'flex w-full items-center justify-between px-4 py-2 text-sm transition-colors',
                              isActive
                                ? 'bg-[#FDEAEA] text-[#A70909]'
                                : 'text-[#2A2A2A] hover:bg-[#FDEAEA]',
                            ].join(' ')}
                          >
                            <span>{normalized.toUpperCase()}</span>
                            {isActive ? (
                              <span className="h-2 w-2 rounded-full bg-[#A70909]" aria-hidden />
                            ) : (
                              <span className="h-2 w-2" aria-hidden />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
