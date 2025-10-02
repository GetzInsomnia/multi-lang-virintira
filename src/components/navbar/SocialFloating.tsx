"use client";

import { useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLine, faTiktok } from '@fortawesome/free-brands-svg-icons';

import { COMPANY } from '@/data/company';

type SocialAction = {
  id: 'call' | 'line' | 'tiktok' | 'facebook' | 'email';
  href: string;
  external?: boolean;
  icon: IconDefinition;
  className: string;
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
        className: 'social-floating-link-call',
      },
      {
        id: 'line',
        href: COMPANY.socials.line,
        external: true,
        icon: faLine,
        className: 'social-floating-link-line',
      },
      {
        id: 'tiktok',
        href: COMPANY.socials.tiktok,
        external: true,
        icon: faTiktok,
        className: 'social-floating-link-tiktok',
      },
      {
        id: 'facebook',
        href: COMPANY.socials.facebook,
        external: true,
        icon: faFacebookF,
        className: 'social-floating-link-facebook',
      },
      {
        id: 'email',
        href: `mailto:${COMPANY.email}`,
        icon: faEnvelope,
        className: 'social-floating-link-email',
      },
    ],
    [],
  );

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

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div ref={containerRef} className="social-floating" data-open={open}>
      <div
        id="social-floating-panel"
        className="social-floating-panel"
        role="dialog"
        aria-modal="false"
        aria-hidden={!open}
      >
        <div className="social-floating-header">
          <span className="social-floating-title">{t('heading')}</span>
          <button
            type="button"
            className="social-floating-close"
            onClick={close}
            aria-label={t('closeLabel')}
          >
            ×
          </button>
        </div>
        <ul className="social-floating-list" role="menu" aria-label={t('heading')}>
          {actions.map((action) => (
            <li key={action.id} role="none">
              <a
                href={action.href}
                className={`social-floating-link ${action.className}`}
                role="menuitem"
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
              >
                <FontAwesomeIcon icon={action.icon} className="social-floating-icon" />
                <span className="social-floating-text">{t(`links.${action.id}`)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="social-floating-toggle"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="social-floating-panel"
        aria-label={t('toggleLabel')}
      >
        <span className="social-floating-toggle-text" aria-hidden>
          {t('toggleLabel')}
        </span>
        <FontAwesomeIcon icon={faChevronLeft} className="social-floating-toggle-icon" aria-hidden />
      </button>
    </div>
  );
}
