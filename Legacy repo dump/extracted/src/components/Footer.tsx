'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaPhoneAlt,
  FaLine,
  FaTiktok,
  FaFacebookF,
  FaEnvelope,
} from 'react-icons/fa'

export default function Footer() {
  const pathname = usePathname()
  const handleLogoClick = () => {
    if (pathname === '/') {
      window.location.hash = 'herosection' // update hash for direct links
      const target = document.getElementById('herosection')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      window.location.href = '/#herosection'
    }
  }

  return (
    <footer className="snap-start bg-[#F9F9F9] text-gray-700 text-sm">
      {/* Layout for large screen (desktop) */}
      <div className="hidden lg:grid max-w-[1600px] mx-auto px-4 py-10 grid-cols-4 gap-y-12 gap-x-10">
        {/* โลโก้และชื่อ */}
        <div
          className="flex flex-col items-center justify-center text-center h-full cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt="Virintira Logo" width={120} height={120} />
          <span className="mt-2 font-bold text-[#A70909] text-2xl">ViRINTIRA</span>
        </div>

        {/* ที่อยู่บริษัท */}
        <div className="flex flex-col justify-center h-full text-left max-w-md px-2">
          <Link href="/under-construction" className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
            บริษัท วีรินทร์ทิรา จำกัด (สำนักงานใหญ่)
          </Link>
          <div className="space-y-1">
            <p>Tax ID: 0105568020174</p>
            <p>222/172 ถนนสามวา แขวงบางชัน</p>
            <p>เขตคลองสามวา กรุงเทพมหานคร 10510</p>
            <p>092-882-5556</p>
            <p>virintirabusiness@gmail.com</p>
          </div>
        </div>

        {/* เมนูลิงก์ */}
        <div className="ml-auto flex flex-col justify-center h-full gap-6 px-2">
          <div className="flex gap-6">
            {/* ฝั่งซ้าย */}
            <div className="flex flex-col gap-2">
              <Link href="/promotion" className="hover:underline text-[#A70909] font-medium">โปรโมชั่น</Link>
              <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ดาวน์โหลดเอกสาร</Link>
              <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ติดต่อเรา</Link>
            </div>

            {/* ฝั่งขวา */}
            <div className="flex flex-col gap-1">
              <span className="text-[#A70909] font-medium">บริการ</span>
              <div className="ml-3 mt-1 space-y-1 text-sm">
                <Link href="/under-construction" className="text-[#A70909] block hover:underline">จดทะเบียน</Link>
                <Link href="/under-construction" className="text-[#A70909] block hover:underline">แก้ไขข้อมูลนิติบุคคล</Link>
                <Link href="/under-construction" className="text-[#A70909] block hover:underline">บัญชีและตรวจสอบ</Link>
                <Link href="/under-construction" className="text-[#A70909] block hover:underline">ขอใบอนุญาต</Link>
                <Link href="/under-construction" className="text-[#A70909] block hover:underline">การตลาดออนไลน์</Link>
              </div>
            </div>
          </div>
        </div>

        {/* โซเชียลไอค่อน (เฉพาะหน้าจอพีซี) */}
        <div className="hidden lg:flex justify-center h-full px-2">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2"> {/* ซ้าย */}
              <a href="tel:+66928825556" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
                <FaPhoneAlt className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@virintiraa" target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
                <FaTiktok className="w-5 h-5 text-white" />
              </a>
              <a href="mailto:Virintirabusiness@gmail.com" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col gap-2"> {/* ขวา */}
              <a href="https://lin.ee/AbavzHa" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
                <FaLine className="w-7 h-7 text-white" />
              </a>
              <a href="https://www.facebook.com/AccountbyVirintira/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Layout for tablet */}
      <div className="hidden sm:flex lg:hidden flex-col gap-10 max-w-[1600px] mx-auto px-4 py-10">
        {/* โลโก้และที่อยู่บริษัทในแถวเดียว */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="cursor-pointer flex flex-col items-start px-2" onClick={handleLogoClick}>
            <Image src="/logo.png" alt="Virintira Logo" width={120} height={120} />
            <span className="mt-2 font-bold text-[#A70909] text-2xl">ViRINTIRA</span>
          </div>
          <div className="text-left px-2">
            <Link href="/under-construction" className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
              บริษัท วีรินทร์ทิรา จำกัด (สำนักงานใหญ่)
            </Link>
            <div className="space-y-1">
              <p>Tax ID: 0105568020174</p>
              <p>222/172 ถนนสามวา แขวงบางชัน</p>
              <p>เขตคลองสามวา กรุงเทพมหานคร 10510</p>
              <p>092-882-5556</p>
              <p>virintirabusiness@gmail.com</p>
            </div>
          </div>
        </div>

        {/* เมนูลิงก์ */}
        <div className="flex justify-center gap-10 px-2">
          <div className="flex flex-col gap-2">
            <Link href="/promotion" className="hover:underline text-[#A70909] font-medium">โปรโมชั่น</Link>
            <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ดาวน์โหลดเอกสาร</Link>
            <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ติดต่อเรา</Link>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#A70909] font-medium">บริการ</span>
            <div className="ml-3 mt-1 space-y-1 text-sm">
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">จดทะเบียน</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">แก้ไขข้อมูลนิติบุคคล</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">บัญชีและตรวจสอบ</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">ขอใบอนุญาต</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">การตลาดออนไลน์</Link>
            </div>
          </div>
        </div>

        {/* โซเชียลไอค่อน */}
        <div className="flex justify-center gap-4 flex-wrap px-2">
          <a href="tel:+66928825556" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaPhoneAlt className="w-5 h-5" />
          </a>
          <a href="https://lin.ee/AbavzHa" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaLine className="w-7 h-7 text-white" />
          </a>
          <a href="https://www.tiktok.com/@virintiraa" target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaTiktok className="w-5 h-5 text-white" />
          </a>
          <a href="https://www.facebook.com/AccountbyVirintira/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaFacebookF className="w-5 h-5 text-white" />
          </a>
          <a href="mailto:Virintirabusiness@gmail.com" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Layout for mobile */}
      <div className="sm:hidden flex flex-col gap-10 max-w-[1600px] mx-auto px-4 py-10 pt-20">
        {/* โลโก้และชื่อ */}
        <div className="flex flex-col items-center justify-center text-center mt-6 cursor-pointer" onClick={handleLogoClick}>
          <Image src="/logo.png" alt="Virintira Logo" width={120} height={120} />
          <span className="mt-2 font-bold text-[#A70909] text-2xl">ViRINTIRA</span>
        </div>

        {/* ที่อยู่บริษัท */}
        <div className="indent-5 text-left px-2">
          <Link href="/under-construction" className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
            บริษัท วีรินทร์ทิรา จำกัด (สำนักงานใหญ่)
          </Link>
          <div className="space-y-1">
            <p>Tax ID: 0105568020174</p>
            <p>222/172 ถนนสามวา แขวงบางชัน</p>
            <p>เขตคลองสามวา กรุงเทพมหานคร 10510</p>
            <p>092-882-5556</p>
            <p>virintirabusiness@gmail.com</p>
          </div>
        </div>

        {/* เมนูลิงก์ */}
        <div className="flex justify-center gap-10 px-2">
          <div className="flex flex-col gap-2">
            <Link href="/promotion" className="hover:underline text-[#A70909] font-medium">โปรโมชั่น</Link>
            <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ดาวน์โหลดเอกสาร</Link>
            <Link href="/under-construction" className="hover:underline text-[#A70909] font-medium">ติดต่อเรา</Link>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#A70909] font-medium">บริการ</span>
            <div className="ml-3 mt-1 space-y-1 text-sm">
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">จดทะเบียน</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">แก้ไขข้อมูลนิติบุคคล</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">บัญชีและตรวจสอบ</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">ขอใบอนุญาต</Link>
              <Link href="/under-construction" className="text-[#A70909] block hover:underline">การตลาดออนไลน์</Link>
            </div>
          </div>
        </div>

        {/* โซเชียลไอค่อน */}
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="tel:+66928825556" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaPhoneAlt className="w-5 h-5" />
          </a>
          <a href="https://lin.ee/AbavzHa" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaLine className="w-7 h-7 text-white" />
          </a>
          <a href="https://www.tiktok.com/@virintiraa" target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaTiktok className="w-5 h-5 text-white" />
          </a>
          <a href="https://www.facebook.com/AccountbyVirintira/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaFacebookF className="w-5 h-5 text-white" />
          </a>
          <a href="mailto:Virintirabusiness@gmail.com" className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80">
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 text-sm text-gray-500">
        © 2025 Virintira Co. Ltd. All rights reserved.
      </div>
    </footer>
  )
}


