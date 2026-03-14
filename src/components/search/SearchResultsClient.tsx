'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getCategoryTheme } from '@/config/categoryThemes';
import {
  buildServiceSearchIndex,
  searchItems,
  highlightMatches,
  type SearchResultItem,
} from '@/lib/searchIndex';

type TabId = 'all' | 'services' | 'articles';

/** Category pill tag */
function CategoryTag({ categorySlug }: { categorySlug: string }) {
  const theme = getCategoryTheme(categorySlug);
  const tCategories = useTranslations('services.categories');

  let label: string;
  try {
    label = tCategories(`${categorySlug}.title`);
  } catch {
    label = categorySlug;
  }

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-tight tracking-wide whitespace-nowrap"
      style={{
        backgroundColor: `${theme.accent}14`,
        color: theme.accent,
      }}
    >
      {label}
    </span>
  );
}

/** Highlight matched text */
function HighlightedText({ text, query }: { text: string; query: string }) {
  const segments = useMemo(() => highlightMatches(text, query), [text, query]);

  return (
    <>
      {segments.map((seg, i) =>
        seg.highlight ? (
          <mark key={i} className="bg-yellow-100 text-inherit rounded-sm px-0.5">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

/** Single result row */
function ResultRow({ item, query }: { item: SearchResultItem; query: string }) {
  const theme = getCategoryTheme(item.categorySlug as string);

  return (
    <Link
      href={item.href}
      className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
    >
      {/* Left accent bar */}
      <div
        className="mt-0.5 h-12 w-1 shrink-0 rounded-full"
        style={{ backgroundColor: theme.accent }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-semibold text-gray-900 break-words [word-break:keep-all]">
            <HighlightedText text={item.title} query={query} />
          </h3>
          <CategoryTag categorySlug={item.categorySlug as string} />
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 break-words">
          <HighlightedText text={item.summary} query={query} />
        </p>
      </div>

      {/* Arrow */}
      <span className="mt-2 shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors text-lg">
        →
      </span>
    </Link>
  );
}

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const tServices = useTranslations('services');
  const tSearch = useTranslations('search');

  const query = searchParams.get('q') ?? '';
  const [activeTab, setActiveTab] = useState<TabId>('all');

  // Build index
  const serviceIndex = useMemo(
    () => buildServiceSearchIndex((key: string) => tServices(key as any)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );

  // Search
  const serviceResults = useMemo(
    () => searchItems(serviceIndex, query),
    [serviceIndex, query],
  );
  // TODO: article results from CMS/API later
  const articleResults: SearchResultItem[] = [];

  // Apply tab filter
  const filteredResults = useMemo(() => {
    if (activeTab === 'services') return serviceResults;
    if (activeTab === 'articles') return articleResults;
    return [...serviceResults, ...articleResults];
  }, [activeTab, serviceResults, articleResults]);

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'all', label: tSearch('tabAll'), count: serviceResults.length + articleResults.length },
    { id: 'services', label: tSearch('tabServices'), count: serviceResults.length },
    { id: 'articles', label: tSearch('tabArticles'), count: articleResults.length },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 [word-break:keep-all]">
          {query ? tSearch('heading', { query }) : tSearch('headingEmpty')}
        </h1>
        {query && (
          <p className="mt-2 text-sm text-gray-500">
            {tSearch('resultCount', { count: filteredResults.length })}
          </p>
        )}
      </div>

      {/* Tab bar */}
      {query && (
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              <span>{tab.label}</span>
              <span
                className={[
                  'text-[11px] rounded-full px-1.5 py-0.5 font-semibold',
                  activeTab === tab.id
                    ? 'bg-[#A70909]/10 text-[#A70909]'
                    : 'bg-gray-200 text-gray-500',
                ].join(' ')}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {!query ? (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500">{tSearch('emptyPrompt')}</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-gray-700 font-medium">{tSearch('noResults', { query })}</p>
          <p className="mt-2 text-sm text-gray-400">{tSearch('noResultsHint')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredResults.map((item) => (
            <ResultRow key={`${item.type}-${item.slug}`} item={item} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}
