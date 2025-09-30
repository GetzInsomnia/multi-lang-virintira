import createMiddleware from 'next-intl/middleware';
import { i18n } from './src/i18n/config';
import { localePrefix } from './src/i18n/routing';

export default createMiddleware({
  locales: Array.from(i18n.locales),
  defaultLocale: i18n.defaultLocale,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
