import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchResultsClient from '@/components/search/SearchResultsClient';
import { resolveLocale } from '@/i18n/loadMessages';

interface PageParams {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const locale = resolveLocale(params.locale);

  // Search pages should NOT be indexed — they are duplicate/parameterized content
  return {
    title: locale === 'th' ? 'ค้นหา | Virintira' : 'Search | Virintira',
    robots: { index: false, follow: true },
  };
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded-lg bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-100" />
            <div className="mt-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchResultsClient />
    </Suspense>
  );
}
