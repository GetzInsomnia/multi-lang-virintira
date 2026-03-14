// src/components/search/SearchDropdown.tsx
'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { servicesConfig } from '@/config/services';
import { getCategoryTheme } from '@/config/categoryThemes';
import {
  buildServiceSearchIndex,
  searchItems,
  allocateResults,
  highlightMatches,
  type SearchResultItem,
} from '@/lib/searchIndex';

type SearchDropdownProps = {
  query: string;
  visible: boolean;
  onSelect?: () => void;
};

const MAX_DROPDOWN_RESULTS = 4;

/** Category pill tag component — modern colored tag */
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
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight tracking-wide whitespace-nowrap"
      style={{
        backgroundColor: `${theme.accent}14`,
        color: theme.accent,
      }}
    >
      {label}
    </span>
  );
}

/** Highlight matched text within a string */
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

function SearchDropdown({ query, visible, onSelect }: SearchDropdownProps) {
  const locale = useLocale();
  const tServices = useTranslations('services');
  const tSearch = useTranslations('layout.header.search');
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  // Build search index (memoized per locale — doesn't rebuild unless locale changes)
  const serviceIndex = useMemo(
    () => buildServiceSearchIndex((key: string) => tServices(key as any)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );

  // Search and allocate results
  const { services, articles, hasResults, totalCount } = useMemo(() => {
    if (!query.trim()) {
      return { services: [], articles: [], hasResults: false, totalCount: 0 };
    }

    const serviceResults = searchItems(serviceIndex, query);
    // TODO: When articles backend is ready, fetch article results here
    const articleResults: SearchResultItem[] = [];

    const allocated = allocateResults(serviceResults, articleResults, MAX_DROPDOWN_RESULTS);

    return {
      services: allocated.services,
      articles: allocated.articles,
      hasResults: allocated.services.length + allocated.articles.length > 0,
      totalCount: serviceResults.length + articleResults.length,
    };
  }, [query, serviceIndex]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // Build flat list of all displayed items for keyboard nav
  const flatItems = useMemo(() => {
    const items: SearchResultItem[] = [];
    items.push(...services);
    items.push(...articles);
    return items;
  }, [services, articles]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible || !hasResults) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const item = flatItems[activeIndex];
        if (item) {
          onSelect?.();
          // Navigate via link click
          const linkEl = listRef.current?.querySelector(
            `[data-search-index="${activeIndex}"] a`,
          ) as HTMLAnchorElement | null;
          linkEl?.click();
        }
      }
    },
    [visible, hasResults, activeIndex, flatItems, onSelect],
  );

  useEffect(() => {
    if (!visible) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, handleKeyDown]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0) return;
    const el = listRef.current?.querySelector(`[data-search-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIndex]);

  if (!visible || !query.trim()) return null;

  // Get suggestions for empty state
  let suggestions: string[] = [];
  try {
    // Try to get suggestions from translations
    suggestions = ['จดทะเบียน', 'บัญชี', 'ใบอนุญาต', 'ภาษี'];
  } catch { /* fallback */ }

  return (
    <div
      ref={listRef}
      className="mt-1 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
      role="listbox"
      aria-label="Search results"
    >
      {!hasResults ? (
        /* === Empty State === */
        <div className="px-5 py-6 text-center">
          <div className="mb-2 text-sm text-gray-500">
            {tSearch('noResults', { query })}
          </div>
          <div className="text-xs text-gray-400">
            {tSearch('noResultsHint')}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <span
                key={s}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* === Service Results === */}
          {services.length > 0 && (
            <div>
              <div className="border-b border-gray-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {tSearch('services')}
              </div>
              {services.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={item.slug}
                    data-search-index={idx}
                    role="option"
                    aria-selected={isActive}
                    className={`group border-b border-gray-50 last:border-b-0 transition-colors ${
                      isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 px-4 py-3"
                      onClick={() => onSelect?.()}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-900 break-words [word-break:keep-all]">
                            <HighlightedText text={item.title} query={query} />
                          </span>
                          <CategoryTag categorySlug={item.categorySlug} />
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1 break-words">
                          <HighlightedText
                            text={item.summary.substring(0, 100)}
                            query={query}
                          />
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors">
                        →
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* === Article Results === */}
          {articles.length > 0 && (
            <div>
              <div className="border-b border-gray-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {tSearch('articles')}
              </div>
              {articles.map((item, artIdx) => {
                const globalIdx = services.length + artIdx;
                const isActive = activeIndex === globalIdx;
                return (
                  <div
                    key={item.slug}
                    data-search-index={globalIdx}
                    role="option"
                    aria-selected={isActive}
                    className={`group border-b border-gray-50 last:border-b-0 transition-colors ${
                      isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 px-4 py-3"
                      onClick={() => onSelect?.()}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-gray-900 break-words [word-break:keep-all]">
                            <HighlightedText text={item.title} query={query} />
                          </span>
                          <CategoryTag categorySlug={item.categorySlug as string} />
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1 break-words">
                          <HighlightedText
                            text={item.summary.substring(0, 100)}
                            query={query}
                          />
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors">
                        →
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* === "View all results" footer === */}
          {totalCount > MAX_DROPDOWN_RESULTS && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="flex items-center justify-center gap-2 border-t border-gray-100 px-4 py-3 text-sm font-medium text-[#A70909] hover:bg-red-50/50 transition-colors"
              onClick={() => onSelect?.()}
            >
              <span>🔍</span>
              <span>{tSearch('viewAll', { query })}</span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default memo(SearchDropdown);
