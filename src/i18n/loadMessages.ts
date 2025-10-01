import { i18n, type Locale } from "./config";

type Messages = Record<string, any>;

const MESSAGE_LOADERS = {
  th: () => import("@/messages/th.json"),
  en: () => import("@/messages/en.json"),
  fr: () => import("@/messages/fr.json"),
  de: () => import("@/messages/de.json"),
  nl: () => import("@/messages/nl.json"),
  it: () => import("@/messages/it.json"),
  "zh-Hans": () => import("@/messages/zh-Hans.json"),
  "zh-Hant": () => import("@/messages/zh-Hant.json"),
  ja: () => import("@/messages/ja.json"),
  ko: () => import("@/messages/ko.json"),
  ms: () => import("@/messages/ms.json"),
  ta: () => import("@/messages/ta.json"),
  hi: () => import("@/messages/hi.json"),
  ar: () => import("@/messages/ar.json"),
  fa: () => import("@/messages/fa.json"),
  he: () => import("@/messages/he.json"),
} as const satisfies Record<Locale, () => Promise<{ default: Messages }>>;

export function resolveLocale(locale: string): Locale {
  const normalized = locale?.toString() || i18n.defaultLocale;
  const matched = i18n.locales.find(
    (supported) => supported.toLowerCase() === normalized.toLowerCase(),
  ) as Locale | undefined;

  return matched ?? i18n.defaultLocale;
}

export async function loadMessages(locale: Locale | string): Promise<Messages> {
  const resolved = resolveLocale(locale.toString());
  const loader = MESSAGE_LOADERS[resolved] ?? MESSAGE_LOADERS[i18n.defaultLocale];
  return (await loader()).default;
}
