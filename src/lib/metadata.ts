import type { Metadata } from "next";
import { i18n } from "@/i18n/config";
import { absoluteUrl, siteConfig } from "@/config/site";

export function baseMetadata({
  title,
  description,
  alternates,
}: {
  title: string;
  description: string;
  alternates?: Metadata["alternates"];
}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildLocaleAlternates(pathname: string) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const entries: Array<[string, string]> = i18n.locales.map((locale) => [
    locale,
    absoluteUrl(`/${locale}${normalizedPath === '/' ? '' : normalizedPath}`),
  ]);
  entries.push([
    'x-default',
    absoluteUrl(`/${i18n.defaultLocale}${normalizedPath === '/' ? '' : normalizedPath}`),
  ]);
  return Object.fromEntries(entries);
}
