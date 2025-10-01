'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import MobileMenuView from './MobileMenuView'

interface MenuItem {
  label: string
  href?: string
  subItems?: MenuItem[]
}

const mainMenu: MenuItem[] = [
  {
    label: 'โปรโมชั่น 🔥',
    href: '/promotion',
  },
  {
    label: 'บริการ',
    href: '/under-construction',
    subItems: [
      {
        label: 'จดทะเบียน',
        href: '/under-construction',
        subItems: [
          { label: 'บริษัทจำกัด', href: '/under-construction' },
          { label: 'ห้างหุ้นส่วนจำกัด', href: '/under-construction' },
          { label: 'มูลนิธิ', href: '/under-construction' },
          { label: 'สมาคม', href: '/under-construction' },
          { label: 'ทะเบียนพาณิชย์ร้านค้า', href: '/under-construction' },
          { label: 'ขึ้นทะเบียนนายจ้าง', href: '/under-construction' },
          { label: 'ภาษีมูลค่าเพิ่ม', href: '/under-construction' },
        ],
      },
      {
        label: 'แก้ไขข้อมูลนิติบุคคล',
        href: '/under-construction',
        subItems: [
          { label: 'ชื่อนิติบุคคล', href: '/under-construction' },
          { label: 'ตรายาง', href: '/under-construction' },
          { label: 'ข้อมูลกรรมการ', href: '/under-construction' },
          { label: 'อำนาจลงนาม', href: '/under-construction' },
          { label: 'ผู้ถือหุ้น', href: '/under-construction' },
          { label: 'สัดส่วนหุ้น', href: '/under-construction' },
          { label: 'เพิ่ม/ลดทุน', href: '/under-construction' },
          { label: 'ย้ายที่ตั้ง', href: '/under-construction' },
          { label: 'วัตถุประสงค์', href: '/under-construction' },
          { label: 'เลิกกิจการ', href: '/under-construction' },
        ],
      },
      {
        label: 'บัญชีและตรวจสอบ',
        href: '/under-construction',
        subItems: [
          { label: 'บัญชีนิติบุคคล', href: '/under-construction' },
          { label: 'ภาษีรายเดือน', href: '/under-construction' },
          { label: 'งบประจำปี', href: '/under-construction' },
          { label: 'บัญชีบุคคลธรรมดา', href: '/under-construction' },
          { label: 'ตรวจสอบบัญชี', href: '/under-construction' },
          { label: 'วางแผนภาษี', href: '/under-construction' },
          { label: 'ขอเลขผู้เสียภาษีชาวต่างชาติ', href: '/under-construction' },
        ],
      },
      {
        label: 'ขอใบอนุญาต',
        href: '/under-construction',
        subItems: [
          { label: 'ประกอบกิจการท่องเที่ยว', href: '/under-construction' },
          { label: 'อ.ย.', href: '/under-construction' },
          { label: 'วีซ่าและใบอนุญาตทำงาน', href: '/under-construction' },
        ],
      },
      {
        label: 'การตลาดออนไลน์',
        href: '/under-construction',
        subItems: [
          { label: 'ทำเว็บไซต์', href: '/under-construction' },
          { label: 'FaceBook Page', href: '/under-construction' },
          { label: 'Line OA', href: '/under-construction' },
          { label: 'TikTok', href: '/under-construction' },
          { label: 'YouTube', href: '/under-construction' },
          { label: 'Video Production', href: '/under-construction' },
          { label: 'ยิงแอด', href: '/under-construction' },
          { label: 'ระบบ Ai', href: '/under-construction' },
          { label: 'Odoo ERP', href: '/under-construction' },
          { label: 'เขียนโปรแกรมต่างๆ', href: '/under-construction' },
        ],
      },
    ],
  },
  {
    label: 'ดาวน์โหลดเอกสาร',
    href: '/under-construction',
  },
  {
    label: 'ติดต่อเรา',
    href: '/under-construction',
  },
]

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [stack, setStack] = useState<{ title: string; items: MenuItem[] }[]>([
    { title: 'ViRINTIRA', items: mainMenu },
  ])

  const menuRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  const handleBack = () => {
    setStack((prev) => prev.slice(0, -1))
  }

  const handleSelectSubMenu = (items: MenuItem[], title: string) => {
    setStack((prev) => [...prev, { title, items }])
  }

  useEffect(() => {
    if (!isOpen) {
      setStack([{ title: 'ViRINTIRA', items: mainMenu }])
    }
  }, [isOpen])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="relative w-full h-full overflow-hidden">
        {stack.map((view, index) => (
          <MobileMenuView
            key={`${index}-${view.title}`}
            title={view.title}
            items={view.items}
            index={index}
            current={stack.length - 1}
            onBack={index > 0 ? handleBack : undefined}
            onSelectSubMenu={handleSelectSubMenu}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  )
}

