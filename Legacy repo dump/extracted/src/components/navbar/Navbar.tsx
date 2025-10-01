'use client'

import Image from 'next/image'
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react'
import { usePathname } from 'next/navigation'
import MegaMenu from './MegaMenu'
import LanguageSwitcher from './LanguageSwitcher'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import SearchToggle from './SearchToggle'
import SocialFloating from './SocialFloating'
import CustomLink from '@/components/CustomLink'
import { FaFire } from 'react-icons/fa'

export default function Navbar() {
  const [isHoveringMenu, setIsHoveringMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hideTimer = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const DEFAULT_HEADER_HEIGHT = 72

  const handleCloseMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    setIsHoveringMenu(true)
  }

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => {
      setIsHoveringMenu(false)
    }, 150)
  }

  // ✅ ปิด MegaMenu อัตโนมัติเมื่อเปลี่ยน path
  useEffect(() => {
    setIsHoveringMenu(false)
  }, [pathname])

  // ✅ ปิด MegaMenu อัตโนมัติเมื่อใช้ CustomLink navigation (pathname เดิม)
  useEffect(() => {
    const handleCustomNavigate = () => setIsHoveringMenu(false)
    window.addEventListener('custom:navigate', handleCustomNavigate)
    return () => window.removeEventListener('custom:navigate', handleCustomNavigate)
  }, [])

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

  useLayoutEffect(() => {
    const setHeight = () => {
      const header = headerRef.current
      if (!header) return
      const height = header.offsetHeight
      const root = document.documentElement
      const current = parseFloat(
        getComputedStyle(root).getPropertyValue('--header-height')
      )
      if (height !== DEFAULT_HEADER_HEIGHT || current !== DEFAULT_HEADER_HEIGHT) {
        if (height !== current) {
          root.style.setProperty('--header-height', `${height}px`)
        }
      }
    }

    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 bg-[#FFFEFE]"
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* โลโก้ + ชื่อ */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt="Virintira Logo" width={40} height={40} />
          <span className="text-xl font-bold text-[#A70909]">ViRINTIRA</span>
        </div>

        {/* เมนูหลัก */}
        <nav className="hidden lg:flex items-center space-x-6">
          {/* 🔥 โปรโมชั่น */}
          <CustomLink
            href="/promotion"
            section="Navbar"
            item="โปรโมชั่น"
            className="flex items-center gap-1 font-medium text-black hover:text-[#A70909] transition relative
              after:content-[''] after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-[7px]
              after:bg-[#A70909] after:rounded-t-full after:scale-x-0 hover:after:scale-x-120 after:origin-middle after:transition-transform"
          >
            <FaFire className="text-[#A70909] animate-bounce" />
            โปรโมชั่น
          </CustomLink>

          {/* 🧾 บริการ (เมก้าเมนู) */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <span className={`relative transition  
              after:content-[''] after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-[7px]
              after:bg-[#A70909] after:rounded-t-full
              after:transition-transform after:origin-middle
              ${isHoveringMenu ? 'text-[#A70909] after:scale-x-120' : 'text-black after:scale-x-0'}`}>
              บริการ
            </span>

            {isHoveringMenu && (
              <div
                className="fixed top-[var(--header-height)] left-0 w-full z-40 bg-white border-t border-gray-200 shadow-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-5 gap-6 text-sm">
                  <MegaMenu />
                </div>
              </div>
            )}
          </div>

          {/* 📄 ดาวน์โหลดเอกสาร */}
          <CustomLink
            href="/under-construction"
            section="Navbar"
            item="ดาวน์โหลดเอกสาร"
            className="relative text-black hover:text-[#A70909] transition
              after:content-[''] after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-[7px]
              after:bg-[#A70909] after:rounded-t-full
              after:scale-x-0 hover:after:scale-x-120 after:origin-middle after:transition-transform"
          >
            ดาวน์โหลดเอกสาร
          </CustomLink>

          {/* ☎️ ติดต่อเรา */}
          <CustomLink
            href="/under-construction"
            section="Navbar"
            item="ติดต่อเรา"
            className="relative text-black hover:text-[#A70909] transition
              after:content-[''] after:absolute after:bottom-[-24px] after:left-0 after:w-full after:h-[7px]
              after:bg-[#A70909] after:rounded-t-full
              after:scale-x-0 hover:after:scale-x-120 after:origin-middle after:transition-transform"
          >
            ติดต่อเรา
          </CustomLink>
        </nav>

        {/* เมนูมือถือ */}
        <div className="flex items-center space-x-2 lg:hidden">
          <SearchToggle />
          <LanguageSwitcher />
          <HamburgerButton
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>

        {/* LanguageSwitcher PC */}
        <div className="hidden lg:flex items-center space-x-4">
          <SearchToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={handleCloseMenu} />
      <SocialFloating menuOpen={mobileMenuOpen} />
    </header>
  )
}

