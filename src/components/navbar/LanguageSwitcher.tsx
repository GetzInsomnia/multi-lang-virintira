"use client";

import Image from 'next/image';
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
import { faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons';

import { i18n, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';

const FLAG_MAP: Partial<Record<Locale, string>> = {
  th: '/flags/th.png',
  en: '/flags/en.png',
};

type LanguageSwitcherProps = {
  className?: string;
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

  const options = useMemo(() => {
    const translate = t as unknown as (key: string) => string;
    return i18n.locales.map((code) => ({
      code,
      label: translate(`language.options.${code}`),
      flag: FLAG_MAP[code as Locale] ?? '/flags/en.png',
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

  const handleToggle = useCallback(() => {
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
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '.language-switcher-item',
    );
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
    const firstSelected = listRef.current?.querySelector<HTMLButtonElement>(
      '[data-selected="true"]',
    );
    firstSelected?.focus();
  }, [open]);

  return (
    <div ref={containerRef} className={`language-switcher ${className}`}>
      <button
        type="button"
        className="language-switcher-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('language.dropdownLabel')}
        onClick={handleToggle}
        disabled={isPending}
      >
        <FontAwesomeIcon icon={faGlobe} className="language-switcher-icon" />
        <span className="language-switcher-label">{t('language.label')}</span>
        <FontAwesomeIcon icon={faChevronDown} className="language-switcher-caret" />
      </button>
      <div className="language-switcher-dropdown" data-open={open} role="presentation">
        <ul
          ref={listRef}
          className="language-switcher-list"
          role="menu"
          aria-label={t('language.dropdownLabel')}
        >
          {options.map(({ code, label, flag }, index) => (
            <li key={code} role="none">
              <button
                type="button"
                role="menuitemradio"
                data-selected={code === locale}
                aria-checked={code === locale}
                className="language-switcher-item"
                onClick={() => handleSelect(code as Locale)}
                disabled={isPending && code !== locale}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
              >
                <span className="language-switcher-flag" aria-hidden>
                  <Image src={flag} alt="" width={20} height={14} />
                </span>
                <span className="language-switcher-name">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
