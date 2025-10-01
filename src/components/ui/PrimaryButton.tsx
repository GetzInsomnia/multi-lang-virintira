import type { ButtonHTMLAttributes } from 'react';

export function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-virintira-primary-dark ${className}`}
      {...props}
    />
  );
}
