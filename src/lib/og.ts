export type OgOptions = {
  title: string;
  subtitle?: string;
};

export function buildOgText({ title, subtitle }: OgOptions) {
  const t = (title ?? "").trim();
  const s = (subtitle ?? "").trim();
  return s ? `${t} — ${s}` : t;
}

export { createOgImage, OG_IMAGE_SIZE } from "./og-image";
