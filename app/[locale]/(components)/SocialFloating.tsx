"use client";

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEnvelope,
  faPhone,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLine, faTiktok } from '@fortawesome/free-brands-svg-icons';

import { COMPANY } from '@/data/company';

type SocialAction = {
  id: 'call' | 'line' | 'tiktok' | 'facebook' | 'email';
  href: string;
  external?: boolean;
  icon: IconDefinition;
  tone: 'primary' | 'secondary' | 'dark' | 'facebook' | 'line';
};

export function SocialFloating() {
  const t = useTranslations('layout.header.social');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const actions = useMemo<SocialAction[]>(
    () => [
      {
        id: 'call',
        href: `tel:${COMPANY.phone}`,
        icon: faPhone,
        tone: 'primary',
      },
      {
        id: 'line',
        href: COMPANY.socials.line,
        external: true,
        icon: faLine,
        tone: 'line',
      },
      {
        id: 'tiktok',
        href: COMPANY.socials.tiktok,
        external: true,
        icon: faTiktok,
        tone: 'dark',
      },
      {
        id: 'facebook',
        href: COMPANY.socials.facebook,
        external: true,
        icon: faFacebookF,
        tone: 'facebook',
      },
      {
        id: 'email',
        href: `mailto:${COMPANY.email}`,
        icon: faEnvelope,
        tone: 'secondary',
      },
    ],
    [],
  );

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const stackedLabel = useMemo(() => {
    const base = t('toggleLabel').replace(/\s+/g, '').toUpperCase();
    return Array.from(base).slice(0, 10);
  }, [t]);

  const toneClasses: Record<SocialAction['tone'], string> = {
    primary:
      'bg-[#A70909] text-white shadow-lg hover:bg-[#8F0707] focus-visible:ring-[#A70909]/60',
    secondary:
      'bg-[#F5F5F5] text-[#1F1B1B] hover:bg-[#E6E6E6] focus-visible:ring-[#A70909]/20',
    dark: 'bg-black text-white hover:bg-neutral-800 focus-visible:ring-neutral-500',
    facebook: 'bg-[#1877F2] text-white hover:bg-[#145DBF] focus-visible:ring-[#2563EB]/60',
    line: 'bg-[#06C755] text-white hover:bg-[#059944] focus-visible:ring-[#06C755]/60',
  };

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
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, close]);

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3 lg:flex"
      data-open={open}
    >
      <div
        id="contact-floating-panel"
        className="pointer-events-none w-72 translate-x-full opacity-0 transition-all duration-300 ease-out-soft data-[open=true]:pointer-events-auto data-[open=true]:translate-x-0 data-[open=true]:opacity-100"
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        data-open={open}
      >
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-lg font-semibold text-[#A70909]">{t('heading')}</span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A70909]/10 text-[#A70909] transition-colors duration-200 hover:bg-[#A70909] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40"
              onClick={close}
              aria-label={t('closeLabel')}
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden />
            </button>
          </div>
          <ul className="space-y-3" role="menu" aria-label={t('heading')}>
            {actions.map((action) => (
              <li key={action.id} role="none">
                <a
                  href={action.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${toneClasses[action.tone]}`}
                  role="menuitem"
                  aria-label={t(`links.${action.id}`)}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                >
                  <FontAwesomeIcon icon={action.icon} className="text-base" aria-hidden />
                  <span>{t(`links.${action.id}`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-l-md bg-[#A70909] px-2 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-colors duration-200 hover:bg-[#8F0707] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="contact-floating-panel"
      >
        <span className="sr-only">{t('toggleLabel')}</span>
        <span aria-hidden className="flex flex-col items-center leading-[0.85rem]">
          {stackedLabel.map((char, index) => (
            <span key={`${char}-${index}`}>{char}</span>
          ))}
        </span>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={`text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
    </div>
  );
}

export default SocialFloating;
