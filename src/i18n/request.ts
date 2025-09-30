import { i18n } from './config';

export default function getRequestConfig() {
  return {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    localePrefix: 'always' as const,
  };
}
