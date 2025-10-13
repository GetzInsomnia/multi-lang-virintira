'use client';

import { useEffect, useState } from 'react';
import {
  FaLine,
  FaTiktok,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronLeft,
} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SocialFloating({ menuOpen = false }: { menuOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 350);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 350);
  };

  // มือถือซ่อนเมื่อเมนูหลักเปิด
  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 1024;
  if (!isClient || (menuOpen && isMobile)) return null;

  return (
    <div
      className={[
        'fixed bottom-6 z-50 transition-all duration-300',
        isOpen ? 'right-5' : 'right-0',
        // เดสก์ท็อป: ขยับขึ้นเล็กน้อยให้ลอยสวยขึ้นนิดเดียว
        'lg:bottom-7 xl:bottom-8',
      ].join(' ')}
    >
      {isOpen ? (
        <div
          className={[
            'flex flex-col items-center origin-bottom transition-all duration-500',
            isAnimating ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
            // เดสก์ท็อป: ลดช่องไฟให้กระทัดรัด
            'space-y-3 lg:space-y-2 xl:space-y-2.5',
          ].join(' ')}
        >
          {/* โทร */}
          <a
            href="tel:+66928825556"
            className={[
              'text-white bg-[#A70909] rounded-full shadow-md hover:opacity-80',
              // เบส: ขนาดเล็กพอเหมาะ, เดสก์ท็อปไม่ต้องขยาย
              'p-2.5',
              'lg:p-2 xl:p-2.5',
            ].join(' ')}
          >
            <FaPhoneAlt className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* LINE */}
          <a
            href="https://lin.ee/AbavzHa"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'bg-[#06C755] rounded-full shadow-md hover:opacity-80',
              'p-1',
              'lg:p-1 xl:p-1',
            ].join(' ')}
          >
            <FaLine className="w-8 h-8 text-white lg:w-7.5 lg:h-7.5 xl:w-9 xl:h-9" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@virintiraa"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'bg-black rounded-full shadow-md hover:opacity-80',
              'p-2.5',
              'lg:p-2 xl:p-2.5',
            ].join(' ')}
          >
            <FaTiktok className="w-5 h-5 text-white lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/AccountbyVirintira/"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'bg-[#1877F2] rounded-full shadow-md hover:opacity-80',
              'p-2.5',
              'lg:p-2 xl:p-2.5',
            ].join(' ')}
          >
            <FaFacebookF className="w-5 h-5 text-white lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* Email */}
          <a
            href="mailto:Virintirabusiness@gmail.com"
            className={[
              'text-white bg-[#A70909] rounded-full shadow-md hover:opacity-80',
              'p-2.5',
              'lg:p-2 xl:p-2.5',
            ].join(' ')}
          >
            <FaEnvelope className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* ปุ่มปิด (X) — ย่อที่เดสก์ท็อป */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className={[
              'flex items-center justify-center rounded-full transition-colors duration-200',
              'bg-[#A70909]/10 text-[#A70909] hover:bg-[#A70909] hover:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40',
              'h-9 w-9',
              'lg:h-8 lg:w-8 xl:h-9 xl:w-9',
            ].join(' ')}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden />
          </button>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className={[
            'bg-[#A70909] text-white rounded-l-md text-center shadow-lg shadow-black/20 hover:bg-[#C9341F]',
            'px-1 py-2 text-[10px] leading-[10px] font-[900]',
            'md:px-1 md:py-2 md:text-[10px] md:leading-[12px]',
            'lg:px-1.5 lg:py-2 lg:text-[10px] lg:leading-[12px]',
          ].join(' ')}
        >
          <div
            className={[
              'flex flex-col items-center',
              // ลดช่องไฟแนวตั้งที่เดสก์ท็อป
              'space-y-0.5',
              'lg:space-y-0.5 xl:space-y-1',
            ].join(' ')}
          >
            {'contact'.split('').map((c, i) => (
              <span key={`c-${i}`}>{c}</span>
            ))}
            <div className="h-2 lg:h-1.5 xl:h-2" />
            {'us'.split('').map((c, i) => (
              <span key={`u-${i}`}>{c}</span>
            ))}
            <div className="mt-1 text-xs lg:text-[10px] xl:text-xs">
              <FaChevronLeft />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
