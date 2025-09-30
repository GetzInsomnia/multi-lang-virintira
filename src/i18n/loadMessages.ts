import { i18n, type Locale } from "./config";

export function resolveLocale(locale: string): Locale {
  const normalized = locale?.toString() || i18n.defaultLocale;
  const matched = i18n.locales.find(
    (supported) => supported.toLowerCase() === normalized.toLowerCase(),
  ) as Locale | undefined;

  return matched ?? i18n.defaultLocale;
}

export async function loadMessages(locale: Locale | string) {
  const resolved = resolveLocale(locale.toString());
  return (await import(`../messages/${resolved}.json`)).default;
}
