"use client";

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { i18n, type Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

const localeLabels: Record<string, string> = {
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

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative inline-block">
      <select
        className="rounded-full border border-[#A70909]/30 bg-white px-4 py-2 text-sm font-medium text-[#A70909] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A70909]"
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          startTransition(() => {
            const basePath = normalizeInternalHref(pathname) || '/';
            router.replace(basePath, { locale: nextLocale });
          });
        }}
        disabled={isPending}
        aria-label="Select language"
      >
        {i18n.locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code] ?? code}
          </option>
        ))}
      </select>
    </div>
  );
}
