import { createOgImage, OG_IMAGE_SIZE } from '@/lib/og';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { servicesConfig } from '@/config/services';

export const runtime = 'edge';
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return servicesConfig.categories.map((cat) => ({ category: cat.categorySlug }));
}

export default async function Image({ params }: { params: { locale: string; category: string } }) {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const categoryTitle = messages.services?.categories?.[params.category]?.title ?? params.category;
  const siteTitle = messages.metadata?.services?.title ?? 'Services';
  return createOgImage({ title: categoryTitle, subtitle: siteTitle });
}
