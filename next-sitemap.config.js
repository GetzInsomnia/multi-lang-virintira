const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.virintira.com';
const locales = [
  'th',
  'en',
  'fr',
  'de',
  'nl',
  'it',
  'zh-Hant',
  'zh-Hans',
  'ja',
  'ko',
  'ms',
  'ta',
  'hi',
  'ar',
  'fa',
  'he'
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  i18n: {
    defaultLocale: 'th',
    locales,
  },
  alternateRefs: [
    ...locales.map((locale) => ({
      href: `${siteUrl.replace(/\/$/, '')}/${locale}`,
      hreflang: locale,
    })),
    { href: `${siteUrl.replace(/\/$/, '')}/th`, hreflang: 'x-default' },
  ],
};
