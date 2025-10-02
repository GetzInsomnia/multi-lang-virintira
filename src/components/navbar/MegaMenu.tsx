"use client";

import { memo } from 'react';

import Image from 'next/image';

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import type { MegaMenuColumn } from './types';

export type MegaMenuProps = {
  columns: MegaMenuColumn[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLinkClick?: () => void;
};

function MegaMenuComponent({ columns, onMouseEnter, onMouseLeave, onLinkClick }: MegaMenuProps) {
  if (!columns.length) {
    return null;
  }

  return (
    <div
      className="mega-menu-wrapper"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="presentation"
    >
      <div className="mega-menu-surface" role="menu">
        <div className="mega-menu-grid">
          {columns.map((column) => (
            <div key={column.title} className="mega-menu-column">
              <div className="mega-menu-column-header">
                <span className="mega-menu-column-title">{column.title}</span>
                {column.subtitle ? (
                  <span className="mega-menu-column-subtitle">{column.subtitle}</span>
                ) : null}
              </div>
              <ul className="mega-menu-list" role="none">
                {column.items.map((item) => {
                  const href = item.href;
                  const content = (
                    <span className="mega-menu-link">
                      <span className="mega-menu-link-label">{item.label}</span>
                      {item.description ? (
                        <span className="mega-menu-link-description">{item.description}</span>
                      ) : null}
                    </span>
                  );

                  if (isExternalHref(href) || href.startsWith('#')) {
                    return (
                      <li key={item.label} role="none">
                        <a
                          href={href}
                          className="mega-menu-anchor"
                          onClick={onLinkClick}
                          role="menuitem"
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label} role="none">
                      <Link
                        href={normalizeInternalHref(href)}
                        className="mega-menu-anchor"
                        onClick={onLinkClick}
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
          ))}
        </div>
        <div className="mega-menu-footer" role="presentation">
          <div className="mega-menu-footer-content">
            <div className="mega-menu-footer-brand">
              <Image
                src="/logo.png"
                alt={COMPANY.legalNameEn}
                width={56}
                height={56}
                className="mega-menu-footer-logo"
              />
              <div>
                <p className="mega-menu-footer-title">{COMPANY.legalNameTh}</p>
                <p className="mega-menu-footer-subtitle">{COMPANY.legalNameEn}</p>
              </div>
            </div>
            <div className="mega-menu-footer-contact">
              <span className="mega-menu-footer-phone">{COMPANY.phoneDisplay}</span>
              <span className="mega-menu-footer-note">{COMPANY.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MegaMenu = memo(MegaMenuComponent);

export default MegaMenu;
