'use client'

import CustomLink from '@/components/CustomLink'

interface BorderRevealButtonProps {
  href: string
  children: React.ReactNode
  section?: string
  item?: string
  query?: Record<string, string>
  className?: string
}

export default function BorderRevealButton({
  href,
  children,
  section,
  item,
  query,
  className = '',
}: BorderRevealButtonProps) {
  return (
    <CustomLink
      href={href}
      section={section}
      item={item}
      query={query}
      className={`relative inline-block px-5 py-2 border-2 border-[#A70909] text-[#A70909] font-semibold overflow-hidden transition-all duration-300 hover:text-white group rounded-full ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 w-0 h-full bg-[#A70909] transition-all duration-300 group-hover:w-full z-0"></span>
    </CustomLink>
  )
}

