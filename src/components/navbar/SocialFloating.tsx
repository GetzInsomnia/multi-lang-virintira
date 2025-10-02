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
    <div ref={containerRef} className="contact-floating" data-open={open}>
      <div
        id="contact-floating-panel"
        className="contact-floating-panel"
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
      >
        <div className="contact-floating-header">
          <span className="contact-floating-title">{t('heading')}</span>
          <button
            type="button"
            className="contact-floating-close"
            onClick={close}
            aria-label={t('closeLabel')}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden />
          </button>
        </div>
        <ul className="contact-floating-list" role="menu" aria-label={t('heading')}>
          {actions.map((action) => (
            <li key={action.id} role="none">
              <a
                href={action.href}
                className={`contact-floating-link contact-floating-${action.id}`}
                data-tone={action.tone}
                role="menuitem"
                aria-label={t(`links.${action.id}`)}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
              >
                <span className="contact-floating-link-inner">
                  <FontAwesomeIcon
                    icon={action.icon}
                    className="contact-floating-icon"
                    aria-hidden
                  />
                  <span className="contact-floating-text">{t(`links.${action.id}`)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="contact-floating-tab"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="contact-floating-panel"
      >
        <span className="sr-only">{t('toggleLabel')}</span>
        <span aria-hidden className="contact-floating-tab-text">
          {t('toggleLabel')}
        </span>
        <FontAwesomeIcon icon={faChevronLeft} className="contact-floating-tab-icon" aria-hidden />
      </button>
    </div>
  );
}

export default SocialFloating;
