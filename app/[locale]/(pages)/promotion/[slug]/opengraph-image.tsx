import { createOgImage, OG_IMAGE_SIZE } from '@/lib/og';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';

export const runtime = 'edge';
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const promo = messages.promotions?.items?.[params.slug];
  const title = promo?.title ?? params.slug;
  const subtitle = messages.promotions?.ui?.drawerTitle;
  return createOgImage({ title, subtitle });
}
