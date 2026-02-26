// src/components/navbar/SearchToggle.tsx
'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { normalizeInternalHref } from '@/lib/links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder: string;
  submitLabel: string;
  actionHref?: string;
  compactHidden?: boolean;
};

const DEFAULT_ACTION = '/search';

export default function SearchToggle({
  open,
  onOpenChange,
  placeholder,
  submitLabel,
  actionHref = DEFAULT_ACTION,
  compactHidden = false,
}: SearchToggleProps) {
  const [query, setQuery] = useState('');
  const shellRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setQuery('');
    onOpenChange(false);
  }, [onOpenChange]);

  // ปิดเมื่อคลิกนอกพร้อมบล็อกการคลิกทะลุลงปุ่มด้านล่าง (Capture Phase)
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node | null;
      if (shellRef.current?.contains(t) || buttonRef.current?.contains(t)) return;

      e.stopPropagation();
      e.preventDefault();
      close();
    };

    // ใช้ Capture Phase เพื่อดักจับและฆ่า Event ก่อนที่มันจะเดินทางไปถึงปุ่มบนหน้าเว็บ
    const id = setTimeout(() => {
      document.addEventListener('click', onDocClick, { capture: true });
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener('click', onDocClick, { capture: true });
    };
  }, [open, close]);

  // ปิดเมื่อกด Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // โฟกัส input เมื่อเปิด (autoFocus + rAF + setTimeout ให้ชัวร์ทุกเบราว์เซอร์)
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const tid = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tid);
    };
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

  const action = normalizeInternalHref(actionHref);

  const shouldHideTrigger = compactHidden && !open; // Explicit guard replaces the old max-[340px] hide.

  return (
    <div className="relative h-full" aria-hidden={shouldHideTrigger ? true : undefined}>

      {/* ปุ่มแว่นขยาย */}
      {!shouldHideTrigger && (
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
            open ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:opacity-80',
          ]
            .filter(Boolean)
            .join(' ')}
          tabIndex={compactHidden ? -1 : undefined}
          aria-hidden={compactHidden ? true : undefined}
        >
          <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
        </button>
      )}

      {/* ชั้นนอกสุด: จัดวาง + กึ่งกลางด้วย flex */}
      <div
        className={[
          'fixed inset-x-0 z-40 pointer-events-none flex justify-center px-4 md:px-0',
        ].join(' ')}
        style={{ top: 'calc(var(--header-height) + 1px)' }}
      >
        {/* ชั้นกลาง: คุม opacity + pointer-events */}
        <div
          id="navbar-search-panel"
          ref={shellRef}
          aria-hidden={open ? undefined : 'true'}
          className={[
            'w-full max-w-[800px]',
            'transition-opacity duration-300 ease-in-out',
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          ].join(' ')}
        >
          {/* ชั้นแอนิเมชัน: slide เฉพาะแกน Y (ไม่ยุ่งกับกึ่งกลางแนวนอน) */}
          <div
            className={[
              'transform-gpu will-change-transform',
              'transition-transform duration-300 ease-in-out',
              open ? 'translate-y-0' : '-translate-y-2',
            ].join(' ')}
          >
            <div className="rounded-b-2xl bg-white px-4 py-2 shadow-md w-full border border-gray-200">
              <form
                action={action}
                method="get"
                className="flex items-center gap-2"
                onSubmit={handleSubmit}
              >
                <input
                  ref={inputRef}
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  autoFocus={open}
                  enterKeyHint="search"
                  className="w-full bg-transparent outline-none text-xs sm:text-sm text-ellipsis overflow-hidden whitespace-nowrap text-[#2A2A2A] placeholder:text-[#6B7280] pr-2"
                />
                <button
                  type="submit"
                  aria-label={submitLabel}
                  className="text-[#A70909] inline-flex h-8 w-8 items-center justify-center"
                >
                  <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
