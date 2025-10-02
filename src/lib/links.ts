import { i18n, type Locale } from '@/i18n/config';

const EXTERNAL_PATTERN = /^(?:[a-zA-Z][a-zA-Z+.-]*:|\/\/)/;

export function normalizeInternalHref(href: string): string {
  if (!href) {
    return '#';
  }

  const trimmed = href.trim();
  if (!trimmed || trimmed === '#') {
    return trimmed || '#';
  }

  if (trimmed.startsWith('#') || EXTERNAL_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const sanitized = withLeadingSlash.replace(/\/+/g, '/');

  const segments = sanitized.split('/').filter(Boolean);
  const supportedLocales = i18n.locales as readonly Locale[];
  if (segments.length > 0 && supportedLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  const normalized = `/${segments.join('/')}`;
  return normalized === '/' ? '/' : normalized.replace(/\/+/g, '/');
}

export function isExternalHref(href: string): boolean {
  return EXTERNAL_PATTERN.test(href);
}
