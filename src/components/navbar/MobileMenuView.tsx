"use client";

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

export type MobileMenuEntry = {
  label: string;
  href?: string;
  description?: string;
  items?: MobileMenuEntry[];
};

type MobileMenuViewProps = {
  title: string;
  items: MobileMenuEntry[];
  onBack?: () => void;
  onSelectSubMenu?: (items: MobileMenuEntry[] | undefined, title: string) => void;
  onClose: () => void;
  index: number;
  current: number;
};

export function MobileMenuView({
  title,
  items,
  onBack,
  onSelectSubMenu,
  onClose,
  index,
  current,
}: MobileMenuViewProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (index === current) {
      requestAnimationFrame(() => setIsActive(true));
    } else {
      setIsActive(false);
    }
  }, [current, index]);

  const translate = index <= current ? 0 : 100;

  return (
    <div
      className={`mobile-menu-view ${isActive ? 'is-active' : ''}`}
      style={{ transform: `translateX(${translate}%)` }}
      aria-hidden={index !== current}
    >
      <div className="mobile-menu-view-header">
        {onBack ? (
          <button type="button" onClick={onBack} className="mobile-menu-back">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="sr-only">Back</span>
          </button>
        ) : (
          <span className="mobile-menu-back-placeholder" />
        )}
        <h2 className="mobile-menu-title">{title}</h2>
        <button type="button" onClick={onClose} className="mobile-menu-close" aria-label="Close menu">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <ul className="mobile-menu-list" role="menu" aria-label={title}>
        {items.map((item) => {
          if (item.items?.length) {
            return (
              <li key={item.label} role="none">
                <button
                  type="button"
                  className="mobile-menu-link has-children"
                  onClick={() => onSelectSubMenu?.(item.items, item.label)}
                >
                  <span>
                    <span className="mobile-menu-link-label">{item.label}</span>
                    {item.description ? (
                      <span className="mobile-menu-link-description">{item.description}</span>
                    ) : null}
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="mobile-menu-link-caret" />
                </button>
              </li>
            );
          }

          const href = item.href ?? '#';
          const content = (
            <span className="mobile-menu-link">
              <span className="mobile-menu-link-label">{item.label}</span>
              {item.description ? (
                <span className="mobile-menu-link-description">{item.description}</span>
              ) : null}
            </span>
          );

          if (href.startsWith('#') || isExternalHref(href)) {
            return (
              <li key={item.label} role="none">
                <a href={href} onClick={onClose} className="mobile-menu-anchor" role="menuitem">
                  {content}
                </a>
              </li>
            );
          }

          return (
            <li key={item.label} role="none">
              <Link
                href={normalizeInternalHref(href)}
                onClick={onClose}
                className="mobile-menu-anchor"
                role="menuitem"
                prefetch
              >
                {content}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
