'use client';

import { useEffect, useMemo, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';

const DEFAULT_LOCALES = [
  'th',
  'en',
  'fr',
  'de',
  'nl',
  'it',
  'zh-Hant',
  'zh-Hans',
  'ja',
  'ko',
  'ms',
  'ta',
  'hi',
  'ar',
  'fa',
  'he',
] as const;

type LanguageSwitcherProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLocale: string;
  locales?: readonly string[];
};

export default function LanguageSwitcher({
  open,
  onOpenChange,
  currentLocale,
  locales = DEFAULT_LOCALES,
}: LanguageSwitcherProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const codes = useMemo(() => {
    const unique = new Set(locales.map((code) => code.toLowerCase()));
    unique.add(currentLocale.toLowerCase());
    return Array.from(unique);
  }, [currentLocale, locales]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }
      onOpenChange(false);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onOpenChange]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Change language"
        aria-expanded={open}
        aria-controls="language-menu-panel"
        onClick={() => onOpenChange(!open)}
        className="rounded-full p-2 text-[#2A2A2A] transition-colors duration-150 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
      </button>

      <div
        id="language-menu-panel"
        className="pointer-events-none absolute top-full right-0 z-40 mt-4 opacity-0 transition-opacity duration-150 ease-out data-[open=true]:pointer-events-auto data-[open=true]:opacity-100"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : 'true'}
      >
        <div
          ref={panelRef}
          className="w-[min(360px,92vw)] rounded-xl bg-white p-2 shadow-2xl"
        >
          <ul className="max-h-80 overflow-y-auto">
            {codes.map((code) => {
              const normalized = code.toLowerCase();
              const href = `/${normalized}`;
              const isActive = normalized === currentLocale.toLowerCase();
              const itemClasses = isActive
                ? 'block rounded-xl px-4 py-2 text-[16px] font-semibold text-[#A70909] bg-gray-100'
                : 'block rounded-xl px-4 py-2 text-[16px] font-semibold text-[#2A2A2A] transition-colors duration-150 hover:bg-gray-100';
              return (
                <li key={code}>
                  <Link
                    href={href}
                    className={itemClasses}
                    onClick={() => onOpenChange(false)}
                  >
                    {normalized.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
