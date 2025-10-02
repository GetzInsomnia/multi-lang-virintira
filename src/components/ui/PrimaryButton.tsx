import type { ButtonHTMLAttributes } from 'react';

export function PrimaryButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full bg-virintira-primary px-6 py-3 text-sm font-semibold text-white shadow transition-colors duration-200 ease-in-out hover:bg-virintira-primary-dark focus-visible:ring-2 focus-visible:ring-virintira-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
      {...props}
    />
  );
}
