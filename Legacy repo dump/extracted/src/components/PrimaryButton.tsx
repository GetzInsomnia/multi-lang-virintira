'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
}

export default function PrimaryButton({ children, href, ...props }: PrimaryButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="inline-block px-6 py-2 text-white bg-[#A70909] rounded-full text-sm font-medium hover:bg-[#C9341F] transition"
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      {...props}
      className="px-6 py-2 text-white bg-[#A70909] rounded-full text-sm font-medium hover:bg-[#C9341F] transition"
    >
      {children}
    </button>
  )
}

