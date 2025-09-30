const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.virintira.com';

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, '');
}

export function absoluteUrl(path = '/') {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export const siteConfig = {
  name: 'Virintira',
  url: getBaseUrl(),
  ogImage: '/api/og',
};
