import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { i18n } from './config';
import { loadMessages, resolveLocale } from './loadMessages';

export default getRequestConfig(async ({ requestLocale }) => {
  const candidate = (await requestLocale) ?? i18n.defaultLocale;
  const resolved = resolveLocale(candidate);
  const messages = await loadMessages(resolved);

  return {
    locale: resolved,
    messages: messages as unknown as AbstractIntlMessages,
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
    localePrefix: 'always' as const,
  };
});
