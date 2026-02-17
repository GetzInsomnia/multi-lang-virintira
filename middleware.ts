import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { i18n } from './src/i18n/config';
import { localePrefix } from './src/i18n/routing';

const intlMiddleware = createMiddleware({
  locales: Array.from(i18n.locales),
  defaultLocale: i18n.defaultLocale,
  localePrefix,
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
