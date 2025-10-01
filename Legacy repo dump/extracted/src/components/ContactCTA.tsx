'use client'

import { useState, useRef, useEffect } from 'react'
// Framer Motion was replaced with simple CSS transitions for smoother mobile performance
import { FaPhoneAlt, FaLine } from 'react-icons/fa'

type ContactCTAProps = {
  onExpandChange?: (expanded: boolean) => void
}

export default function ContactCTA({ onExpandChange }: ContactCTAProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  // ✅ แจ้งผลหลัง state เปลี่ยน
  useEffect(() => {
    onExpandChange?.(isOpen)
  }, [isOpen, onExpandChange])

  return (
    <div className="relative h-12 w-full flex justify-center items-center" ref={containerRef}>
      <div
        className={`absolute top-0 sm:inset-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <a
          href="tel:0928825556"
          className="flex items-center justify-center gap-2 px-4 h-10 border-2 border-[#A70909] rounded-full text-[#A70909] font-medium text-sm hover:bg-[#A70909] hover:text-white transition-all duration-200 w-[190px]"
        >
          <FaPhoneAlt className="text-base" /> โทร 092-882-5556
        </a>
        <a
          href="https://lin.ee/TBe5njP"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-10 px-4 rounded-full bg-[#06C755] text-white text-sm font-medium transition-all duration-200 hover:brightness-110 w-[190px]"
        >
          <FaLine className="text-2xl mr-2" /> แชทเลย!
        </a>
      </div>
      <button
        className={`px-6 py-2 text-white bg-[#A70909] rounded-full text-base font-medium hover:bg-[#C9341F] transition transform ${isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        onClick={() => setIsOpen(true)}
      >
        ขอคำปรึกษาฟรี
      </button>
    </div>
  )
}

