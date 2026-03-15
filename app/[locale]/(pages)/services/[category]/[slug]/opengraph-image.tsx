import { createOgImage, OG_IMAGE_SIZE } from '@/lib/og';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';
import { servicesConfig } from '@/config/services';

export const runtime = 'edge';
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return servicesConfig.categories.flatMap((cat) =>
    cat.items.map((item) => ({ category: cat.categorySlug, slug: item.serviceSlug }))
  );
}

export default async function Image({ params }: { params: { locale: string; category: string; slug: string } }) {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const serviceTitle = messages.services?.items?.[params.slug]?.title ?? params.slug;
  const summary = messages.services?.items?.[params.slug]?.summary;
  return createOgImage({ title: serviceTitle, subtitle: summary });
}
