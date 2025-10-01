# Migration Notes

## HTML `lang` handling
- The root `<html>` element now lives in `app/[locale]/layout.tsx`, ensuring each localized route renders with the correct `lang` attribute.
- `app/layout.tsx` only provides shared metadata and global styles.

## Locale-aware fonts
- Fonts are provisioned with `next/font/google` inside `app/[locale]/layout.tsx` and exposed through CSS custom properties.
- `styles/globals.css` defines per-locale `font-family` stacks and RTL direction via `html[lang="*"]` selectors.
- Remove any legacy body-level font overrides when migrating custom components.

## Fluid typography
- Headings and primary body copy now use `clamp()`-based Tailwind arbitrary values (e.g. `text-[clamp(...)]`) for smoother scaling across breakpoints.
- Reuse these patterns when introducing new sections to maintain responsive consistency.

## Open Graph assets and binaries
- Static OG image binaries in `public/` have been removed; dynamic `opengraph-image.tsx` routes provide previews.
- Future assets must avoid committing binary files; prefer SVG or generated imagery.
