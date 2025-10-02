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

  const stackedLabel = useMemo(
    () => Array.from(t('toggleLabel').replace(/\s+/g, '').toUpperCase()).slice(0, 12),
    [t],
  );

  const toneClasses: Record<SocialAction['tone'], string> = {
    primary:
      'bg-virintira-primary text-white shadow-[0_10px_26px_rgba(167,9,9,0.28)] hover:bg-[#C9341F] focus-visible:ring-virintira-primary/60',
    secondary:
      'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-300',
    dark: 'bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-500',
    facebook: 'bg-[#1877F2] text-white hover:bg-[#145DBF] focus-visible:ring-[#2563EB]/60',
    line: 'bg-[#00C300] text-white hover:bg-[#00A000] focus-visible:ring-[#00C300]/60',
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
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end space-y-3 lg:flex"
      data-open={open}
    >
      <div
        id="contact-floating-panel"
        className="pointer-events-none w-72 translate-x-full opacity-0 transition-all duration-200 ease-out-soft data-[open=true]:pointer-events-auto data-[open=true]:translate-x-0 data-[open=true]:opacity-100"
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
        data-open={open}
      >
        <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-lg font-semibold text-virintira-primary">{t('heading')}</span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-virintira-primary/10 text-virintira-primary transition-colors duration-150 ease-out hover:bg-virintira-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-virintira-primary/40"
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
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${toneClasses[action.tone]}`}
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
        className="flex flex-col items-center gap-2 rounded-l-md bg-virintira-primary px-2 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-white shadow-lg transition-all duration-200 ease-out hover:bg-[#C9341F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
          className="text-sm transition-transform duration-200 ease-out data-[open=true]:rotate-180"
          aria-hidden
          data-open={open}
        />
      </button>
    </div>
  );
}

export default SocialFloating;
