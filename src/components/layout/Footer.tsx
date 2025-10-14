// src/components/layout/Footer.tsx
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

import { COMPANY, getLocalizedAddress } from '@/data/company';
import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

// ใช้ react-icons แบบเดียวกับ SocialFloating
import {
  FaPhoneAlt,
  FaLine,
  FaTiktok,
  FaFacebookF,
  FaEnvelope,
} from 'react-icons/fa';

export type FooterLink = { label: string; href: string };

export type FooterData = {
  tagline: string;
  description: string;
  contact: { phone: string; email: string; line: string };
  quickLinks: FooterLink[];
  legal: string;
  sections?: { services?: string };
  services?: {
    registration?: string;
    editRegistration?: string;
    accountAndAudit?: string;
    applyLicense?: string;
    marketing?: string;
  };
};

const externalPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

function resolveHref(rawHref: string) {
  const href = rawHref.trim();
  if (!href) return '#';
  if (href.startsWith('#')) return href;
  if (externalPattern.test(href)) return href;
  return href.startsWith('/') ? href : `/${href}`;
}
function isExternalHref(href: string) {
  return externalPattern.test(href) && !href.startsWith('/');
}

const HERO_SECTION_ID = 'herosection';

function renderFooterLink(link: FooterLink, extraClassName = '') {
  const href = resolveHref(link.href);
  const className = `text-[#A70909] hover:underline ${extraClassName}`.trim();
  if (link.href.startsWith('#') || isExternalHref(href)) {
    return <a className={className} href={href}>{link.label}</a>;
  }
  return (
    <Link className={className} href={normalizeInternalHref(href)} prefetch>
      {link.label}
    </Link>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const pathname = usePathname();
  const t = useTranslations('layout.footer');
  const locale = useLocale();
  const isThai = (locale || '').toLowerCase().startsWith('th');
  const year = new Date().getFullYear().toString();

  // ข้อมูลบริษัทตามภาษา
  const legalName = isThai ? COMPANY.legalNameTh : COMPANY.legalNameEn;
  const address = getLocalizedAddress(locale);

  // บรรทัดแสดงที่อยู่ = 2 บรรทัดคงที่
  const addressLine1 = address.streetAddress;
  const addressLine2 = `${address.subDistrict} ${address.district}${isThai ? ' ' : ', '}${address.province} ${address.postalCode}`;

  const quickLinks = Array.isArray(data.quickLinks) ? data.quickLinks : [];
  const mainQuickLinks = quickLinks.slice(0, 3);

  const serviceKeys = ['registration','editRegistration','accountAndAudit','applyLicense','marketing'] as const;
  const serviceLinks = serviceKeys.map((key, index) => {
    const fallbackLabel = quickLinks[3 + index]?.label ?? '';
    const label = t(`services.${key}`, { defaultMessage: fallbackLabel });
    const matchedLink = quickLinks.find((item) => item.label === label);
    return { label, href: matchedLink?.href ?? quickLinks[3 + index]?.href ?? '#' };
  });

  const servicesHeading = t('sections.services', {
    defaultMessage: data.sections?.services ?? 'บริการ',
  });

  // สีสืบทอด และแดงเมื่อ hover (ไม่ขีดเส้นใต้)
  const poweredByNode = (
    <a
      href="https://techbiz-solution.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-inherit hover:text-[#A70909] hover:no-underline transition-colors"
    >
      Powered by Techbiz Solution Co., Ltd.
    </a>
  );

  const legalTemplate = (data.legal ?? '').replace('{year}', year);
  const [legalPrefix, legalSuffix = ''] = legalTemplate.split('{poweredBy}');

  const handleLogoClick = () => {
    if (typeof window === 'undefined') return;
    if (pathname === '/') {
      window.location.hash = HERO_SECTION_ID;
      const target = document.getElementById(HERO_SECTION_ID);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = `/#${HERO_SECTION_ID}`;
    }
  };

  // เมนูฟุตเตอร์: ใช้ขนาด/น้ำหนักเดียวกัน + ไม่ตัดขึ้นบรรทัด
  const linkClass = 'text-[15px] font-normal whitespace-nowrap';

  return (
    <footer className="snap-start bg-[#F9F9F9] text-gray-700">
      {/* Desktop */}
      <div className="hidden lg:grid max-w-[1600px] mx-auto px-4 py-10 grid-cols-4 gap-y-16 gap-x-12 xl:gap-x-14 2xl:gap-x-16">
        {/* โลโก้ */}
        <button
          type="button"
          className="min-w-0 flex flex-col items-center justify-center text-center h-full cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
          <span className="mt-3 font-bold text-[#A70909] text-[clamp(22px,1.8vw,28px)] lg:text-2xl">
            {COMPANY.brandMark ?? COMPANY.brand}
          </span>
        </button>

        {/* ข้อมูลบริษัท (คงขนาดเดิม) */}
        <div className="min-w-0 flex flex-col justify-center h-full text-left max-w-[36ch] px-2 space-y-4">
          <span className="font-semibold text-lg text-[#A70909] block whitespace-nowrap">
            {legalName}
          </span>
          <div className="space-y-1 text-[14px] xl:text-[15px] leading-[1.4]">
            <p className="text-gray-700">Tax ID: {COMPANY.taxId}</p>
            <p className="text-gray-700">{addressLine1}</p>
            <p className="text-gray-700">{addressLine2}</p>
            <p className="text-gray-700">{COMPANY.phoneDisplay}</p>
            <p className="text-gray-700">{COMPANY.email}</p>
          </div>
        </div>

        {/* เมนู */}
        <div className="min-w-0 flex flex-col justify-center h-full px-2 lg:pl-6">
          <div className="flex gap-8 text-left">
            <div className="flex flex-col gap-3">
              {mainQuickLinks.map((link) => (
                <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {/* น้ำหนักปกติ */}
              <span className="text-[#A70909] font-normal text-[15px]">{servicesHeading}</span>
              <div className="ml-3 mt-1 space-y-1">
                {serviceLinks.map((link) => (
                  <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* โซเชียล — ใช้ react-icons และสัดส่วนเดียวกับ SocialFloating */}
        <div className="min-w-0 hidden lg:flex justify-center h-full px-2">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Call Virintira"
              >
                <FaPhoneAlt className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on TikTok"
              >
                <FaTiktok className="w-5 h-5 text-white" />
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Email Virintira"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={COMPANY.socials.line}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#06C755] rounded-full w-11 h-11 p-1 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on LINE"
              >
                <FaLine className="w-8 h-8 text-white" />
              </a>
              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet */}
      <div className="hidden sm:flex lg:hidden flex-col gap-12 max-w-[1600px] mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            type="button"
            className="cursor-pointer flex flex-col items-start px-2"
            onClick={handleLogoClick}
          >
            <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
            <span className="mt-3 font-bold text-[#A70909] text-[clamp(22px,2.6vw,26px)]">
              {COMPANY.brandMark ?? COMPANY.brand}
            </span>
          </button>
          <div className="text-left px-2 max-w-[38ch] min-w-0">
            <span className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
              {legalName}
            </span>
            <div className="space-y-1.5 text-[14px] leading-[1.4]">
              <p>Tax ID: {COMPANY.taxId}</p>
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
              <p>{COMPANY.phoneDisplay}</p>
              <p>{COMPANY.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-12 px-2 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col gap-3">
            {mainQuickLinks.map((link) => (
              <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#A70909] font-normal text-[clamp(15px,2.2vw,18px)]">
              {servicesHeading}
            </span>
            <div className="ml-3 mt-1 space-y-2 text-[14px]">
              {serviceLinks.map((link) => (
                <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ไอคอน tablet ใช้สัดส่วนเดียวกับ desktop */}
        <div className="flex justify-center gap-4 flex-wrap px-2">
          <a href={`tel:${COMPANY.phone}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Call Virintira">
            <FaPhoneAlt className="w-5 h-5" />
          </a>
          <a href={COMPANY.socials.line} target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 p-1 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on LINE">
            <FaLine className="w-8 h-8 text-white" />
          </a>
          <a href={COMPANY.socials.tiktok} target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on TikTok">
            <FaTiktok className="w-5 h-5 text-white" />
          </a>
          <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on Facebook">
            <FaFacebookF className="w-5 h-5 text-white" />
          </a>
          <a href={`mailto:${COMPANY.email}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Email Virintira">
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col gap-12 max-w-[1600px] mx-auto px-4 py-10 pt-20">
        <button
          type="button"
          className="flex flex-col items-center justify-center text-center mt-6 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
          <span className="mt-3 font-bold text-[#A70909] text-[clamp(22px,8vw,26px)]">
            {COMPANY.brandMark ?? COMPANY.brand}
          </span>
        </button>

        <div className="indent-5 text-left px-2 max-w-[40ch] min-w-0">
          <span className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
            {legalName}
          </span>
          <div className="space-y-1.5 text-[14px] leading-[1.45]">
            <p>Tax ID: {COMPANY.taxId}</p>
            <p>{addressLine1}</p>
            <p>{addressLine2}</p>
            <p>{COMPANY.phoneDisplay}</p>
            <p>{COMPANY.email}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href={`tel:${COMPANY.phone}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Call Virintira">
            <FaPhoneAlt className="w-5 h-5" />
          </a>
          <a href={COMPANY.socials.line} target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 p-1 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on LINE">
            <FaLine className="w-8 h-8 text-white" />
          </a>
          <a href={COMPANY.socials.tiktok} target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on TikTok">
            <FaTiktok className="w-5 h-5 text-white" />
          </a>
          <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on Facebook">
            <FaFacebookF className="w-5 h-5 text-white" />
          </a>
          <a href={`mailto:${COMPANY.email}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Email Virintira">
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="text-center py-4 border-t border-gray-200 text-gray-500 text-[clamp(12px,1.4vw,14px)]">
        <span className="mr-1">
          {legalPrefix.replace(/\|\s*$/, '').trim()}
        </span>
        {/* โชว์ | เฉพาะหน้าจอ ≥ 640px */}
        <span className="hidden sm:inline mx-1">|</span>
        {/* จอเล็กบังคับขึ้นบรรทัดใหม่ก่อน Powered by */}
        <br className="sm:hidden" />
        {poweredByNode}
        {legalSuffix}
      </div>
    </footer>
  );
}
