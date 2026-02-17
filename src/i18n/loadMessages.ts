import { i18n, type Locale } from "./config";

export type Messages = Record<string, unknown>;

type Loader = () => Promise<{ default: Messages }>;

const MESSAGE_LOADERS: Record<Locale, Loader> = {
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
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function mergeMessages<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown> | undefined,
): T {
  if (!override) {
    return base;
  }

  const output: Record<string, unknown> = { ...base };

  for (const [key, overrideValue] of Object.entries(override)) {
    const baseValue = output[key];

    if (Array.isArray(baseValue) || Array.isArray(overrideValue)) {
      output[key] = Array.isArray(overrideValue)
        ? overrideValue
        : Array.isArray(baseValue)
          ? baseValue
          : [];
      continue;
    }

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      output[key] = mergeMessages(
        baseValue as Record<string, unknown>,
        overrideValue,
      );
      continue;
    }

    if (overrideValue !== undefined) {
      output[key] = overrideValue;
    }
  }

  return output as T;
}

async function importMessages(locale: Locale): Promise<Messages> {
  const loader = MESSAGE_LOADERS[locale] ?? MESSAGE_LOADERS[i18n.defaultLocale];
  return (await loader()).default;
}

export function resolveLocale(locale: string): Locale {
  const normalized = locale?.toString() || i18n.defaultLocale;
  const matched = i18n.locales.find(
    (supported) => supported.toLowerCase() === normalized.toLowerCase(),
  ) as Locale | undefined;

  return matched ?? i18n.defaultLocale;
}

export async function loadMessages(locale: Locale | string): Promise<Messages> {
  const resolved = resolveLocale(locale.toString());

  const thai = await importMessages("th");
  if (resolved === "th") {
    return thai;
  }

  const english = mergeMessages({ ...thai }, await importMessages("en"));
  if (resolved === "en") {
    return english;
  }

  const specific = await importMessages(resolved);
  return mergeMessages(english, specific);
}
