# multi-lang-virintira

A multilingual marketing site for Virintira built with the Next.js 14 App Router. The application uses [`next-intl`](https://next-intl-docs.vercel.app/) to deliver 16 locales, server-rendered marketing pages, structured data, and code-generated Open Graph images.

## Requirements

- Node.js 18 or newer

## Installation

Install dependencies before running any scripts:

```bash
npm install
```

## Environment variables

The following variables configure analytics and absolute URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://www.virintira.com
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

`NEXT_PUBLIC_SITE_URL` is used by metadata helpers and the sitemap generator to create absolute links. `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_GTM_ID` enable Google Analytics 4 and Google Tag Manager via the consent-aware `AnalyticsManager` component. Leave the analytics variables unset if you do not want the scripts to load.

## Supported locales

The site is localised into the following locales (default locale **th**). Missing strings fall back to English and then Thai to avoid runtime holes:

- `th`
- `en`
- `fr`
- `de`
- `nl`
- `it`
- `zh-Hant`
- `zh-Hans`
- `ja`
- `ko`
- `ms`
- `ta`
- `hi`
- `ar`
- `fa`
- `he`

## Development

Start a development server with hot reload:

```bash
npm run dev
```

## Linting

Run ESLint to check code quality:

```bash
npm run lint
```

`npm run lint` expects a `.eslintrc.json` file that extends `next/core-web-vitals` in the project root.

## Production

Build the optimised application and start it in production mode:

```bash
npm run build
npm start
```

## Sitemap

After each build, the [`postbuild`](package.json) script runs [`next-sitemap`](https://github.com/iamvishnusankar/next-sitemap) to generate `sitemap.xml` and `robots.txt`. When you add or remove pages, regenerate these files with:

```bash
npm run build && npm run postbuild
```

You can also run just the postbuild step manually:

```bash
npm run postbuild
```

## Locale detection

[middleware.ts](middleware.ts) uses `next-intl` middleware to inspect the `Accept-Language` header. Requests without a locale prefix are redirected to `/${locale}` where `locale` is one of the supported locales above (falling back to `/th` when no match is found). All App Router routes live under `/[locale]/…` and the middleware keeps the prefix consistent for crawlers and sitemap generation.

## License

This project is licensed under the [MIT License](LICENSE).
