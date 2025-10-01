'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface CustomLinkProps extends React.ComponentProps<typeof Link> {
  query?: Record<string, string>
  section?: string
  item?: string
  onClick?: () => void
}

export default function CustomLink({
  href,
  query,
  section,
  item,
  onClick,
  children,
  ...rest
}: CustomLinkProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClick) onClick()

    const path = typeof href === 'string' ? href : href.pathname || '/'

    const finalQuery = {
      ...(query || {}),
      ...(section && { section }),
      ...(item && { item }),
    }

    const qs =
      Object.keys(finalQuery).length > 0
        ? '?' + new URLSearchParams(finalQuery).toString()
        : ''

    window.dispatchEvent(new CustomEvent('custom:navigate'))

    startTransition(() => {
      router.push(path + qs)
    })
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-disabled={isPending}
      {...rest}
    >
      {children}
    </Link>
  )
}

