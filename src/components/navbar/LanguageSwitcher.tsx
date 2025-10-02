"use client";

import { useTransition } from 'react';
import { useLocale } from 'next-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

import { i18n, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';

const labels: Record<Locale, string> = {
  th: 'ไทย',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  nl: 'Nederlands',
  it: 'Italiano',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  ja: '日本語',
  ko: '한국어',
  ms: 'Bahasa Melayu',
  ta: 'தமிழ்',
  hi: 'हिन्दी',
  ar: 'العربية',
  fa: 'فارسی',
  he: 'עברית',
};

export function LanguageSwitcher({
  variant = 'inline',
}: {
  variant?: 'inline' | 'pill';
}) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label className={`navbar-language ${variant === 'pill' ? 'navbar-language-pill' : ''}`}>
      <span className="sr-only">Select language</span>
      <span aria-hidden className="navbar-language-icon">
        <FontAwesomeIcon icon={faGlobe} />
      </span>
      <select
        className="navbar-language-select"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
          });
        }}
      >
        {i18n.locales.map((code) => (
          <option key={code} value={code}>
            {labels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
