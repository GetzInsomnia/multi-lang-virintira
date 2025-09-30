import { createOgImage, OG_IMAGE_SIZE } from '@/lib/og';
import { loadMessages, resolveLocale } from '@/i18n/loadMessages';

export const runtime = 'edge';
export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const messages = (await loadMessages(locale)) as any;
  const meta = messages.metadata.promotion as { title: string; description: string };
  return createOgImage({ title: meta.title, subtitle: meta.description });
}
