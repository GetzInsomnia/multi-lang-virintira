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
        className="rounded-full p-2 text-[#A70909] transition-colors duration-150 hover:opacity-80"
      >
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
      </button>

      {/* Desktop inline search (slide from right) */}
      <div
        id="navbar-search-panel"
        className={`
    pointer-events-none absolute right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center
    rounded-md bg-white pl-3 pr-10 shadow-md transition-all duration-300 ease-out
    md:flex
    ${open ? 'pointer-events-auto opacity-100 w-72' : 'opacity-0 w-0'}
  `}
        data-open={open ? 'true' : 'false'}
        aria-hidden={open ? undefined : 'true'}
        ref={shellRef}
      >
        <form
          action={action}
          method="get"
          className="flex h-8 w-full items-center gap-2"
          onSubmit={handleSubmit}
        >
          <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-[#6B7280]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="q"
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-[#2A2A2A] outline-none placeholder:text-[#6B7280]"
          />
          <button
            type="submit"
            className="absolute right-2 rounded px-3 py-1 text-xs font-semibold text-white bg-[#A70909] hover:brightness-110"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </>
  );
}
