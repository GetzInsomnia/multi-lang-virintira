"use client";

import { useLocale, useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { i18n, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';

type LanguageSwitcherProps = {
  className?: string;
};

type LanguageOption = {
  code: Locale;
  srLabel: string;
  display: string;
};

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('layout.header');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const options = useMemo<LanguageOption[]>(() => {
    const translate = t as unknown as (key: string) => string;
    return i18n.locales.map((code) => ({
      code: code as Locale,
      srLabel: translate(`language.options.${code}`),
      display: code.toUpperCase(),
    }));
  }, [t]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        close();
        return;
      }
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
      close();
    },
    [close, locale, pathname, router],
  );

  const focusByIndex = useCallback((index: number) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>('.lang-item');
    if (!items?.length) return;
    const next = ((index % items.length) + items.length) % items.length;
    items[next]?.focus();
  }, []);

  const handleItemKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        focusByIndex(index + 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusByIndex(index - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusByIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusByIndex(Number.MAX_SAFE_INTEGER);
      }
    },
    [focusByIndex],
  );

  useEffect(() => {
    if (!open) return;
    const firstSelected = listRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]');
    firstSelected?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-virintira-primary transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('language.dropdownLabel')}
        onClick={toggle}
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>
      <div
        className="absolute right-0 mt-3 w-32 bg-white nv-lang-menu transition-all duration-150 ease-out data-[open=false]:pointer-events-none data-[open=false]:opacity-0 data-[open=false]:translate-y-1 data-[open=true]:opacity-100 data-[open=true]:translate-y-0"
        data-open={open}
        role="presentation"
      >
        <ul
          ref={listRef}
          className="flex flex-col"
          role="menu"
          aria-label={t('language.dropdownLabel')}
        >
          {options.map(({ code, srLabel, display }, index) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitemradio"
                className="nv-lang-item w-full text-left text-sm font-semibold uppercase tracking-[0.28em] text-neutral-700 transition-colors duration-150 ease-out data-[selected=true]:text-virintira-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                data-selected={code === locale}
                aria-checked={code === locale}
                onClick={() => handleSelect(code)}
                disabled={isPending && code !== locale}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
              >
                <span className="sr-only">{srLabel}</span>
                <span aria-hidden>{display}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
