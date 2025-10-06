'use client';

import { useEffect, useMemo, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { usePathname, useRouter } from '@/i18n/routing';

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
  const router = useRouter();
  const pathname = usePathname() || '/';
  const codes = useMemo(() => {
    const unique = new Set(locales.map((code) => code.toLowerCase()));
    unique.add(currentLocale.toLowerCase());
    return Array.from(unique);
  }, [currentLocale, locales]);

  const buildPathForLocale = (targetLocale: string) => {
    const normalizedLocale = targetLocale.toLowerCase();
    const segments = pathname.split('/').filter(Boolean);

    if (!segments.length) {
      return `/${normalizedLocale}`;
    }

    const [, ...rest] = segments;
    return `/${[normalizedLocale, ...rest].join('/')}`;
  };

  const handleSelect = (targetLocale: string) => {
    const normalizedLocale = targetLocale.toLowerCase();
    const nextPath = buildPathForLocale(normalizedLocale);

    if (nextPath !== pathname) {
      router.push(nextPath);
    }

    onOpenChange(false);
  };

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
        className="rounded-full p-2 text-[#A70909] transition-colors duration-150 hover:opacity-80"
      >
        <FontAwesomeIcon icon={faGlobe} className="h-5 w-5" />
      </button>

      <div
        id="language-menu-panel"
        className="
  pointer-events-none fixed right-50 top-[calc(var(--header-height)+1px)] z-40
  w-auto max-w-[92vw] opacity-0 transition-opacity duration-150 ease-out
  data-[open=true]:pointer-events-auto data-[open=true]:opacity-100
"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : 'true'}
      >
        <div
          ref={panelRef}
          className="rounded-xl bg-white p-2 shadow-2xl"
        >
          {/* ใส่ wrapper ที่ควบคุมความสูงเลื่อนแบบซ่อน scrollbar */}
          <div className="relative max-h-[35vh] overflow-hidden">
            {/* แถบไล่สีบอกเลื่อนขึ้น */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent" />

            <ul className="max-h-[35vh] overflow-auto pr-1 scrollbar-hide space-y-1">
              {codes.map((code) => {
                const normalized = code.toLowerCase();
                const isActive = normalized === currentLocale.toLowerCase();
                const baseClasses =
                  'block rounded-xl px-4 py-2 text-[16px] font-normal text-[#2A2A2A] transition-colors duration-150 hover:bg-[#FDEAEA]';
                const itemClasses = isActive
                  ? `${baseClasses} bg-[#FDEAEA]`
                  : baseClasses;
                return (
                  <li key={code}>
                    <button
                      type="button"
                      className={itemClasses}
                      onClick={() => handleSelect(code)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {normalized.toUpperCase()}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
