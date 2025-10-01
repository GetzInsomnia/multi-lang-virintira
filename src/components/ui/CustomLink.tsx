import type { ComponentProps } from 'react';

import { Link } from '@/i18n/routing';

export function CustomLink({ className = '', ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full border border-virintira-primary px-5 py-2 text-sm font-semibold text-virintira-primary transition hover:bg-virintira-primary hover:text-white ${className}`}
      prefetch
      {...props}
    />
  );
}
