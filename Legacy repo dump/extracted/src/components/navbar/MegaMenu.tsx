'use client'

import CustomLink from '@/components/CustomLink'

const sections = [
  {
    title: 'จดทะเบียน',
    items: [
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
    title: 'แก้ไขข้อมูลนิติบุคคล',
    items: [
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
    title: 'บัญชีและตรวจสอบ',
    items: [
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
    title: 'ขอใบอนุญาต',
    items: [
      { label: 'ประกอบกิจการท่องเที่ยว', href: '/under-construction' },
      { label: 'อ.ย.', href: '/under-construction' },
      { label: 'วีซ่าและใบอนุญาตทำงาน', href: '/under-construction' },
    ],
  },
  {
    title: 'การตลาดออนไลน์',
    items: [
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
]

export default function MegaMenu() {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold text-[#A70909] mb-2">{section.title}</h4>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.label}>
                <CustomLink
                  href="/under-construction"
                  section={section.title}
                  item={item.label}
                  className="text-gray-700 hover:text-[#A70909] transition"
                >
                  {item.label}
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

