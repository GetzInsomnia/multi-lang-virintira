export const i18n = {
  defaultLocale: 'th',
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
    'hi',
    'ar',
    'fa',
    'he'
  ] as const,
};

export type Locale = (typeof i18n)['locales'][number];
