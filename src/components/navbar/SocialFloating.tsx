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

  const isMobile = isClient && typeof window !== 'undefined' && window.innerWidth < 1024;
  if (!isClient || (menuOpen && isMobile)) return null;

  return (
    <div
      className={[
        'fixed bottom-6 z-50 transition-all duration-300',
        isOpen ? 'right-5' : 'right-0',
        'lg:bottom-7 xl:bottom-8',
      ].join(' ')}
    >
      {isOpen ? (
        <div
          className={[
            'flex flex-col items-center origin-bottom transition-all duration-500',
            isAnimating ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100',
            'space-y-3 lg:space-y-2 xl:space-y-2.5',
          ].join(' ')}
        >
          {/* โทร */}
          <a
            href="tel:+66928825556"
            className={[
              'text-white rounded-full shadow-md',
              'bg-[#A70909] hover:bg-[#C71A1A] active:bg-[#8E0707]',
              'p-2.5 lg:p-2 xl:p-2.5',
            ].join(' ')}
            aria-label="Call Virintira"
          >
            <FaPhoneAlt className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* LINE */}
          <a
            href="https://lin.ee/AbavzHa"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'rounded-full shadow-md',
              'bg-[#06C755] hover:bg-[#19DB66] active:bg-[#05B94B]',
              'p-1.5 lg:p-1 xl:p-1.5',
            ].join(' ')}
            aria-label="Virintira on LINE"
          >
            <FaLine className="w-7 h-7 text-white lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@virintiraa"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'rounded-full shadow-md',
              'bg-[#000000] hover:bg-[#1A1A1A] active:bg-[#0D0D0D]',
              'p-2.5 lg:p-2 xl:p-2.5',
            ].join(' ')}
            aria-label="Virintira on TikTok"
          >
            <FaTiktok className="w-5 h-5 text-white lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/AccountbyVirintira/"
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'rounded-full shadow-md',
              'bg-[#1877F2] hover:bg-[#2B86FF] active:bg-[#1568D6]',
              'p-2.5 lg:p-2 xl:p-2.5',
            ].join(' ')}
            aria-label="Virintira on Facebook"
          >
            <FaFacebookF className="w-5 h-5 text-white lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* Email */}
          <a
            href="mailto:Virintirabusiness@gmail.com"
            className={[
              'text-white rounded-full shadow-md',
              'bg-[#A70909] hover:bg-[#C71A1A] active:bg-[#8E0707]',
              'p-2.5 lg:p-2 xl:p-2.5',
            ].join(' ')}
            aria-label="Email Virintira"
          >
            <FaEnvelope className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
          </a>

          {/* ปุ่มปิด (X) — ปกติพื้นขาว/ตัวแดง; hover กลับสี */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className={[
              'flex items-center justify-center rounded-full transition-colors duration-200 shadow-md',
              'bg-white text-[#A70909] border border-[#A70909]/20',
              'hover:bg-[#A70909] hover:text-white',
              'active:bg-[#8E0707] active:text-white',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A70909]/40',
              'h-9 w-9 lg:h-8 lg:w-8 xl:h-9 xl:w-9',
            ].join(' ')}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden />
          </button>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className={[
            'bg-[#A70909] text-white rounded-l-md text-center shadow-lg shadow-black/20',
            'hover:bg-[#C71A1A] active:bg-[#8E0707]',
            'px-1 py-2 text-[10px] leading-[10px] font-[900]',
            'md:px-1 md:py-2 md:text-[10px] md:leading-[12px]',
            'lg:px-1.5 lg:py-2 lg:text-[10px] lg:leading-[12px]',
          ].join(' ')}
        >
          <div className={['flex flex-col items-center', 'space-y-0.5 lg:space-y-0.5 xl:space-y-1'].join(' ')}>
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
