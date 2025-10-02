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
    <div ref={containerRef} className={`language-switcher ${className}`}>
      <button
        type="button"
        className="language-switcher-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('language.dropdownLabel')}
        onClick={toggle}
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faGlobe} className="language-switcher-icon" />
      </button>
      <div className="language-switcher-dropdown" data-open={open} role="presentation">
        <ul
          ref={listRef}
          className="language-switcher-list lang-menu"
          role="menu"
          aria-label={t('language.dropdownLabel')}
        >
          {options.map(({ code, srLabel, display }, index) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitemradio"
                className="lang-item"
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
