'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from '@/i18n/routing';

type MenuItem = {
  label: string;
  href?: string;
  description?: string;
  items?: MenuItem[];
};

type MobileMenuViewProps = {
  title: string;
  items: MenuItem[];
  index: number;
  current: number;
  onBack?: () => void;
  onSelectSubMenu: (items: MenuItem[] | undefined, title: string) => void;
  onClose: () => void;
};

export default function MobileMenuView({
  title,
  items,
  index,
  current,
  onBack,
  onSelectSubMenu,
  onClose,
}: MobileMenuViewProps) {
  return (
    <div
      className="absolute inset-0 flex h-full w-full translate-x-full flex-col bg-white px-6 py-8 transition-transform duration-300 ease-out-soft"
      style={{ transform: `translateX(${(index - current) * 100}%)` }}
    >
      <div className="mb-6 flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#2A2A2A]"
            onClick={onBack}
            aria-label="Back"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        ) : null}
        <span className="text-lg font-semibold text-[#2A2A2A]">{title}</span>
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;
          if (hasChildren) {
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className="flex w-full flex-col items-start gap-1 text-left"
                  onClick={() => onSelectSubMenu(item.items, item.label)}
                >
                  <span className="text-base font-semibold text-[#2A2A2A]">{item.label}</span>
                  {item.description ? (
                    <span className="text-sm text-[#6B7280]">{item.description}</span>
                  ) : null}
                </button>
              </li>
            );
          }

          if (item.href) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col gap-1 text-left"
                  onClick={onClose}
                >
                  <span className="text-base font-semibold text-[#2A2A2A]">{item.label}</span>
                  {item.description ? (
                    <span className="text-sm text-[#6B7280]">{item.description}</span>
                  ) : null}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.label}>
              <span className="text-base font-semibold text-[#2A2A2A]">{item.label}</span>
              {item.description ? (
                <span className="text-sm text-[#6B7280]">{item.description}</span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type { MenuItem };
