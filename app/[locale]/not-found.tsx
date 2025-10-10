'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-[clamp(2.25rem,1.4rem+2.1vw,3.25rem)] font-bold text-[#A70909]">{t('title')}</h1>
      <p className="text-[clamp(0.95rem,0.9rem+0.3vw,1.1rem)] text-gray-700">{t('description')}</p>
      <Link
        href={normalizeInternalHref('/')}
        className="inline-flex items-center justify-center rounded-full bg-[#A70909] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9341F]"
      >
        {t('back')}
      </Link>
    </div>
  );
}
