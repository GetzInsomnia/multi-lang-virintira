"use client";

import { memo } from 'react';

import { Link } from '@/i18n/routing';
import { isExternalHref, normalizeInternalHref } from '@/lib/links';

import type { SubMenuSection } from './types';

export type SubMenuProps = {
  sections: SubMenuSection[];
  onItemClick?: () => void;
};

function SubMenuComponent({ sections, onItemClick }: SubMenuProps) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="submenu-popover" role="presentation">
      <div className="submenu-surface" role="menu">
        {sections.map((section, index) => (
          <div key={`${section.title ?? 'section'}-${index}`} className="submenu-column">
            {section.title ? (
              <p className="submenu-column-title">{section.title}</p>
            ) : null}
            <ul className="submenu-list" role="none">
              {section.items.map((item) => {
                const href = item.href;
                const content = (
                  <span className="submenu-link">
                    <span className="submenu-link-label">{item.label}</span>
                    {item.description ? (
                      <span className="submenu-link-description">{item.description}</span>
                    ) : null}
                  </span>
                );

                if (isExternalHref(href) || href.startsWith('#')) {
                  return (
                    <li key={item.label} role="none">
                      <a
                        href={href}
                        className="submenu-anchor"
                        role="menuitem"
                        onClick={onItemClick}
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
                      className="submenu-anchor"
                      role="menuitem"
                      onClick={onItemClick}
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
    </div>
  );
}

export const SubMenu = memo(SubMenuComponent);

export default SubMenu;
