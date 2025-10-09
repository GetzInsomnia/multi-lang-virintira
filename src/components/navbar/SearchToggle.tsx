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

  // ปิดเมื่อคลิกนอก (delay 1 tick กันทับคลิกเปิด)
  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (shellRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      close();
    };
    const id = setTimeout(() => document.addEventListener('mousedown', onDocDown), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('mousedown', onDocDown);
    };
  }, [open, close]);

  // ปิดเมื่อกด Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // โฟกัส input เมื่อเปิด
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  // ล้าง query เมื่อปิด
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleToggle = () => (open ? close() : onOpenChange(true));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      e.preventDefault();
      setQuery('');
      close();
    }
  };

  const action = `${locale ? `/${locale}` : ''}${
    actionHref.startsWith('/') ? actionHref : `/${actionHref}`
  }`.replace(/\/+/g, '/');

  return (
    <div className="relative h-full">
      {/* ปุ่มนอก: เดสก์ท็อปไม่เฟด (กันกะพริบ); มือถือ/<1240px ค่อยเฟดตอนเปิด */}
      <button
        ref={buttonRef}
        type="button"
        aria-label="Search"
        aria-expanded={open}
        aria-controls="navbar-search-panel"
        onClick={handleToggle}
        className={[
          'inline-flex h-8 w-8 items-center justify-center rounded-full p-2 text-[#A70909]',
          'transition-opacity duration-200',
          // ซ่อนเฉพาะ <1240px ตอนเปิด เพื่อไม่ให้ซ้อนกับกล่องด้านล่าง navbar
          open ? 'max-[1239px]:opacity-0 max-[1239px]:pointer-events-none' : 'opacity-100',
          open ? '' : 'hover:opacity-80',
        ].join(' ')}
      >
        <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
      </button>

      {/* ≥1240px: ช่องค้นหา inline — งอกจากตำแหน่งไอคอน (ขยายไปทางซ้าย) */}
      <div
        id="navbar-search-panel"
        ref={shellRef}
        aria-hidden={open ? undefined : 'true'}
        className={[
          'pointer-events-none absolute right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center',
          'rounded-md bg-white shadow-md transition-all duration-300 ease-in-out',
          'min-[1240px]:flex',
          open ? 'pointer-events-auto opacity-100 w-72 pl-3' : 'opacity-0 w-0 pl-0',
        ].join(' ')}
      >
        <form
          action={action}
          method="get"
          className="relative flex h-8 w-full items-center"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-full w-full bg-transparent text-sm text-[#2A2A2A] outline-none placeholder:text-[#6B7280] pr-14"
          />
          {/* ปุ่มไอคอนในกล่อง: ตำแหน่งทับปุ่มนอกพอดี และไม่ทำ hover flicker */}
          <button
            type="submit"
            aria-label={submitLabel}
            className="absolute right-[0px] top-1/2 -mt-px -translate-y-1/2 h-8 w-8 p-2 text-[#A70909] flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* <1240px: กล่องใต้ navbar (เหมือน legacy) */}
      <div
        className={[
          'fixed left-0 top-[72px] w-full rounded-md bg-white px-4 py-2 shadow-md',
          'transition-all duration-300 ease-in-out',
          'max-[1239px]:block min-[1240px]:hidden',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <form action={action} method="get" className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-400 pr-10"
          />
        {/* ไอคอนในกล่อง (ขนาดเท่าปุ่มนอก) */}
          <button type="submit" aria-label={submitLabel} className="text-[#A70909] inline-flex h-8 w-8 items-center justify-center">
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
