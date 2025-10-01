'use client'

import { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import CustomLink from '@/components/CustomLink'

interface MobileMenuViewProps {
  title: string
  items: {
    label: string
    href?: string
    onClick?: () => void
    subItems?: MobileMenuViewProps['items']
  }[]
  onBack?: () => void
  onSelectSubMenu?: (items: MobileMenuViewProps['items'], title: string) => void
  onClose: () => void
  index: number
  current: number
}

export default function MobileMenuView({
  title,
  items,
  onBack,
  onSelectSubMenu,
  onClose,
  index,
  current,
}: MobileMenuViewProps) {
  const [enter, setEnter] = useState(false)

  useEffect(() => {
    if (index === current) {
      requestAnimationFrame(() => setEnter(true))
    } else {
      setEnter(false)
    }
  }, [current, index])

  const offset = enter ? 0 : 100

  return (
    <div
      className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(${offset}%)` }}
    >
      <div className="bg-white w-full h-full p-6 z-50">
        <div className="flex items-center justify-between mb-4">
          {onBack ? (
            <button onClick={onBack} className="text-[#A70909] text-xl">
              <FaChevronLeft />
            </button>
          ) : (
            <div />
          )}
          <h2 className="text-lg font-semibold text-[#A70909]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#A70909] text-2xl font-[1000]"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-4" role="menu" aria-label={title}>
          {items.map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <button
                  onClick={() => onSelectSubMenu?.(item.subItems!, item.label)}
                  className="text-left w-full text-black hover:text-[#A70909] transition font-medium text-base"
                >
                  {item.label}
                </button>
              ) : (
                <CustomLink
                  href={item.href || '#'}
                  query={{ section: title, item: item.label }}
                  onClick={onClose}
                  className="text-black hover:text-[#A70909] transition font-medium text-base block"
                >
                  {item.label.includes('โปรโมชั่น') ? (
                    <>
                      โปรโมชั่น <span className="inline-block animate-bounce">🔥</span>
                    </>
                  ) : (
                    item.label
                  )}
                </CustomLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

