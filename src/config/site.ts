const DEFAULT_SITE_URL = 'https://www.virintira-acc.example';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

const DEFAULT_SITE_CONFIG = {
  name: 'Virintira Accounting',
  url: DEFAULT_SITE_URL,
  phone: '+66-00-000-0000',
  email: 'hello@example.com',
  address: 'Bangkok, Thailand',
  social: {
    facebook: 'https://www.facebook.com/...',
    tiktok: 'https://www.tiktok.com/@...',
    line: 'https://line.me/R/ti/p/...',
  },
} as const;

function getBaseUrl() {
  return SITE_URL.replace(/\/$/, '');
}

export function absoluteUrl(path = '/') {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export const siteConfig = {
  ...DEFAULT_SITE_CONFIG,
  name: 'Virintira Accounting',
  url: getBaseUrl(),
  ogImage: '/api/og',
} as const;
