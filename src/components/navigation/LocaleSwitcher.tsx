'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { i18n, type Locale } from '@/i18n/config';

export function LocaleSwitcher() {
  const t = useTranslations('layout');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState('');

  // Capture hash on mount
  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  // Update hash when it changes
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // Reconstruct the path with the new locale
      const segments = pathname.split('/');
      // The first segment is empty string because pathname starts with /
      // The second segment is the locale if it exists in i18n config
      const hasLocalePrefix = i18n.locales.includes(segments[1] as any);

      let newPath: string;
      if (hasLocalePrefix) {
        segments[1] = nextLocale;
        newPath = segments.join('/');
      } else {
        newPath = `/${nextLocale}${pathname}`;
      }

      // Append query params
      const params = searchParams.toString();
      if (params) {
        newPath += `?${params}`;
      }

      // Append hash
      if (hash) {
        newPath += hash;
      }

      router.replace(newPath, { scroll: false });
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t('header.language')}</span>
      <select
        defaultValue={locale}
        className="form-select block w-full rounded-md border-gray-300 bg-transparent py-1 pl-2 pr-7 text-sm font-medium text-gray-700 bg-none focus:border-[#A70909] focus:outline-none focus:ring-[#A70909] disabled:opacity-50"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="th">ภาษาไทย</option>
        <option value="en">English (US)</option>
        <option value="zh-Hans">简体中文</option>
        <option value="zh-Hant">繁體中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
        <option value="nl">Nederlands</option>
        <option value="ms">Bahasa Melayu</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
        {/* RTL languages removed */}
      </select>
    </label>
  );
}
