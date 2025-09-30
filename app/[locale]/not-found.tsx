'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold text-[#A70909] sm:text-5xl">{t('title')}</h1>
      <p className="text-base text-gray-700">{t('description')}</p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center justify-center rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
      >
        {t('back')}
      </Link>
    </div>
  );
}
