import type { ComponentProps } from 'react';

import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

export function CustomLink({ className = '', href, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full border border-virintira-primary px-5 py-2 text-sm font-semibold text-virintira-primary transition-colors duration-300 ease-in-out hover:bg-virintira-primary hover:text-white focus-visible:ring-2 focus-visible:ring-virintira-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
      prefetch
      href={typeof href === 'string' ? normalizeInternalHref(href) : href}
      {...props}
    />
  );
}
