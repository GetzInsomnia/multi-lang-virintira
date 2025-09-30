import { i18n } from '@/i18n/config';
import { absoluteUrl } from '@/config/site';

export function buildLocaleAlternates(pathname: string) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const entries = i18n.locales.map((locale) => [
    locale,
    absoluteUrl(`/${locale}${normalizedPath === '/' ? '' : normalizedPath}`),
  ] as const);
  entries.push([
    'x-default',
    absoluteUrl(`/${i18n.defaultLocale}${normalizedPath === '/' ? '' : normalizedPath}`),
  ]);
  return Object.fromEntries(entries);
}
