'use client'

import { useEffect, useState } from 'react'
import { FaLine, FaTiktok, FaFacebookF, FaPhoneAlt, FaEnvelope, FaChevronLeft } from 'react-icons/fa'

export default function SocialFloating({ menuOpen = false }: { menuOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimating(false)
    }, 400)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 1024
  if (!isClient || (menuOpen && isMobile)) return null

  return (
    <div className={`fixed bottom-6 ${isOpen ? 'right-5' : 'right-0'} z-50 transition-all duration-300`}>
      {isOpen ? (
        <div
          className={`flex flex-col items-center space-y-3 origin-bottom transition-all duration-500 ${isAnimating ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
        >
          <a href="tel:+66928825556" className="text-white bg-[#A70909] rounded-full p-2.5 lg:p-3 shadow-md hover:opacity-80">
            <FaPhoneAlt className="w-5 h-5 lg:w-7 lg:h-7" />
          </a>
          <a href="https://lin.ee/AbavzHa" target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full p-2 lg:p-2.5 shadow-md hover:opacity-80">
            <FaLine className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </a>
          <a href="https://www.tiktok.com/@virintiraa" target="_blank" rel="noopener noreferrer" className="bg-black rounded-full p-2.5 lg:p-3 shadow-md hover:opacity-80">
            <FaTiktok className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
          </a>
          <a href="https://www.facebook.com/AccountbyVirintira/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full p-2.5 lg:p-3 shadow-md hover:opacity-80">
            <FaFacebookF className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
          </a>
          <a href="mailto:Virintirabusiness@gmail.com" className="text-white bg-[#A70909] rounded-full p-2.5 lg:p-3 shadow-md hover:opacity-80">
            <FaEnvelope className="w-5 h-5 lg:w-7 lg:h-7" />
          </a>
          <button
            onClick={handleClose}
            className="text-sm lg:text-base font-semibold text-[#A70909] bg-transparent border-2 border-[#A70909] rounded-full px-1 py-0.05 lg:px-1.5 lg:py-0.25 shadow-sm hover:bg-[#A70909] hover:text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="bg-[#A70909] text-white px-1 py-2 lg:px-2 lg:py-3 rounded-l-md text-[10px] lg:text-xs font-[900] leading-[10px] text-center shadow-lg shadow-black/20 hover:bg-[#C9341F]"

        >
          <div className="flex flex-col items-center space-y-0.5 lg:space-y-1.5">
            {"contact".split('').map((c, i) => (
              <span key={`c-${i}`}>{c}</span>
            ))}
            <div className="h-2" />
            {"us".split('').map((c, i) => (
              <span key={`u-${i}`}>{c}</span>
            ))}
            <div className="mt-1 text-xs lg:text-sm">
              <FaChevronLeft />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

