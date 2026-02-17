export const i18n = {
  defaultLocale: 'th' as const,
  locales: [
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
    'hi'
  ] as const,
};

export type Locale = (typeof i18n)['locales'][number];
