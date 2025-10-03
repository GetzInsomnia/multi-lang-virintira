'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchToggleProps = {
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder: string;
  submitLabel: string;
  actionHref?: string;
};

const DEFAULT_ACTION = '/search';

export default function SearchToggle({
  locale,
  open,
  onOpenChange,
  placeholder,
  submitLabel,
  actionHref = DEFAULT_ACTION,
}: SearchToggleProps) {
  const [query, setQuery] = useState('');
  const shellRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setQuery('');
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (shellRef.current?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }
      if (query.trim().length > 0) {
        return;
      }
      close();
    };

    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [close, open, query]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (query.trim().length > 0) {
          setQuery('');
          requestAnimationFrame(() => inputRef.current?.focus());
          return;
        }
        close();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close, open, query]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const handleToggle = () => {
    if (!open) {
      onOpenChange(true);
      return;
    }
    if (query.trim().length > 0) {
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      event.preventDefault();
      setQuery('');
      close();
      return;
    }
  };

  const action = `${locale ? `/${locale}` : ''}${actionHref.startsWith('/') ? actionHref : `/${actionHref}`}`.replace(
    /\/+/g,
    '/',
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Search"
        aria-expanded={open}
        aria-controls="navbar-search-panel"
        onClick={handleToggle}
        className="rounded-full p-2 text-[var(--nav-text)] transition-colors duration-150 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
      </button>

      <div
        id="navbar-search-panel"
        className="pointer-events-none absolute left-1/2 top-full z-40 flex w-full -translate-x-1/2 justify-center pt-4 opacity-0 transition-opacity duration-150 ease-out data-[open=true]:pointer-events-auto data-[open=true]:opacity-100"
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : 'true'}
      >
        <div
          ref={shellRef}
          className="w-[min(920px,92vw)] rounded-full bg-[var(--surface)] px-4 py-2 shadow-[var(--shadow-lg)]"
        >
          <form
            action={action}
            method="get"
            className="flex items-center gap-3"
            onSubmit={handleSubmit}
          >
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-[var(--nav-muted)]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              name="q"
              autoComplete="off"
              placeholder={placeholder}
              className="h-10 w-full bg-transparent text-[17px] leading-none text-[var(--nav-text)] outline-none placeholder:text-[var(--nav-muted)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--brand-red)] px-5 py-1.5 text-sm font-semibold text-white transition-opacity duration-150 hover:brightness-110"
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
