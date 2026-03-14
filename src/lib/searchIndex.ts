/**
 * Client-side search index for services.
 * Builds a flat array of searchable entries from the services config
 * and the current locale's translations.
 */

import { servicesConfig, type CategorySlug, type ServiceSlug } from '@/config/services';

export type SearchResultType = 'service' | 'article';

export type SearchResultItem = {
  type: SearchResultType;
  slug: string;
  categorySlug: CategorySlug | 'general';
  title: string;
  summary: string;
  href: string;
};

/**
 * Build searchable service entries from translations.
 * @param tServices — next-intl translator for `services` namespace
 * @param tCategories — next-intl translator for `services.categories` namespace (category labels)
 */
export function buildServiceSearchIndex(
  tServices: (key: string) => string,
): SearchResultItem[] {
  return servicesConfig.categories.flatMap((category) =>
    category.items.map((item) => {
      const baseKey = `items.${item.serviceSlug}`;
      const title = String(tServices(`${baseKey}.title`) || '');
      const summary = String(tServices(`${baseKey}.summary`) || '');

      return {
        type: 'service' as const,
        slug: item.serviceSlug,
        categorySlug: item.categorySlug,
        title,
        summary,
        href: `/services/${item.categorySlug}/${item.serviceSlug}`,
      };
    }),
  );
}

/**
 * Simple fuzzy search: case-insensitive substring match on title and summary.
 * Returns results ranked by match quality:
 *   1. Exact title match
 *   2. Title starts with query
 *   3. Title contains query
 *   4. Summary contains query
 */
export function searchItems(
  items: SearchResultItem[],
  query: string,
): SearchResultItem[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();

  type Scored = { item: SearchResultItem; score: number };

  const scored: Scored[] = [];

  for (const item of items) {
    const titleLower = item.title.toLowerCase();
    const summaryLower = item.summary.toLowerCase();

    let score = 0;

    if (titleLower === q) {
      score = 100;
    } else if (titleLower.startsWith(q)) {
      score = 80;
    } else if (titleLower.includes(q)) {
      score = 60;
    } else if (summaryLower.includes(q)) {
      score = 40;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  // Sort by score desc, then by title alphabetically
  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.map((s) => s.item);
}

/**
 * Smart allocation: pick N results from services and articles
 * with the specified max total.
 */
export function allocateResults(
  services: SearchResultItem[],
  articles: SearchResultItem[],
  maxTotal: number = 4,
): { services: SearchResultItem[]; articles: SearchResultItem[] } {
  const sCount = services.length;
  const aCount = articles.length;

  if (sCount + aCount <= maxTotal) {
    return { services, articles };
  }

  // Default: prefer 3 services + 1 article
  let sShow = Math.min(sCount, 3);
  let aShow = Math.min(aCount, maxTotal - sShow);

  // If services < 3, give remaining slots to articles
  if (sCount < 3) {
    sShow = sCount;
    aShow = Math.min(aCount, maxTotal - sShow);
  }

  // If no articles, all slots go to services
  if (aCount === 0) {
    sShow = Math.min(sCount, maxTotal);
    aShow = 0;
  }

  // If no services, all slots go to articles
  if (sCount === 0) {
    sShow = 0;
    aShow = Math.min(aCount, maxTotal);
  }

  return {
    services: services.slice(0, sShow),
    articles: articles.slice(0, aShow),
  };
}

/**
 * Highlight matching text within a string.
 * Returns an array of { text, highlight } segments for rendering.
 */
export function highlightMatches(
  text: string,
  query: string,
): { text: string; highlight: boolean }[] {
  if (!query.trim()) return [{ text, highlight: false }];

  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlight: regex.test(part),
    }));
}
