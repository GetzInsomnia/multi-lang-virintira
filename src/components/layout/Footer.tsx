// src/components/layout/Footer.tsx
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

import { COMPANY, getLocalizedAddress } from '@/data/company';
import { Link } from '@/i18n/routing';
import { normalizeInternalHref } from '@/lib/links';

import { FaPhoneAlt, FaLine, FaTiktok, FaFacebookF, FaEnvelope } from 'react-icons/fa';

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

  // ข้อมูลบริษัท
  const legalName = isThai ? COMPANY.legalNameTh : COMPANY.legalNameEn;
  const address = getLocalizedAddress(locale);

  // บรรทัดที่อยู่
  const addressLine1 = `${address.streetAddress}${isThai ? ' ' : ', '}${address.subDistrict}`;
  const addressLine2 = `${address.district}${isThai ? ' ' : ', '}${address.province} ${address.postalCode}`;

  const quickLinks = Array.isArray(data.quickLinks) ? data.quickLinks : [];
  const mainQuickLinks = quickLinks.slice(0, 3);

  const serviceKeys = ['registration', 'editRegistration', 'accountAndAudit', 'applyLicense', 'marketing'] as const;
  const serviceLinks = serviceKeys.map((key, index) => {
    const fallbackLabel = quickLinks[3 + index]?.label ?? '';
    const label = t(`services.${key}`, { defaultMessage: fallbackLabel });
    const matchedLink = quickLinks.find((item) => item.label === label);
    return { label, href: matchedLink?.href ?? quickLinks[3 + index]?.href ?? '#' };
  });

  const servicesHeading = t('sections.services', {
    defaultMessage: data.sections?.services ?? 'บริการ',
  });

  const poweredByNode = (
    <a href="https://techbiz-solution.com/" target="_blank" rel="noopener noreferrer"
       className="text-inherit hover:text-[#A70909] hover:no-underline transition-colors">
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

  const linkClass = 'text-[15px] font-normal whitespace-nowrap';

  // ===== Sub-components =====
  const CompanyInfo = () => (
    <div className="min-w-0 text-left max-w-[36ch] space-y-4">
      {/* Clamp brand sizing at <=466/380/340px to prevent footer overflow while preserving baseline styling */}
      <span
        className={[
          'block font-semibold text-[#A70909]',
          'text-lg',
          'max-w-full',
          'whitespace-nowrap',
          'max-[466px]:text-[clamp(15px,4.8vw,17px)]',
          'max-[380px]:text-[clamp(14px,5.2vw,16px)]',
          'max-[340px]:whitespace-normal',
          'max-[340px]:[overflow-wrap:anywhere]',
        ].join(' ')}
      >
        {legalName}
      </span>
      <div className="space-y-1 text-[13px] xl:text-[14px] leading-[1.4]">
        <p className="text-gray-700">Tax ID: {COMPANY.taxId}</p>
        <p className="text-gray-700">{addressLine1}</p>
        <p className="text-gray-700">{addressLine2}</p>
        <p className="text-gray-700">{isThai ? COMPANY.phoneDisplayTh : COMPANY.phoneDisplayEn}</p>
        <p className="text-gray-700">{COMPANY.email}</p>
      </div>
    </div>
  );

  const MenuLinks = () => (
    <div className="min-w-0">
      <div className="flex gap-8">
        <div className="flex flex-col gap-3">
          {mainQuickLinks.map((link) => (
            <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#A70909] font-normal text-[15px]">{servicesHeading}</span>
          <div className="ml-3 mt-1 space-y-1">
            {serviceLinks.map((link) => (
              <div key={link.label}>{renderFooterLink(link, linkClass)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // แถวเดียวแนวนอน (ใช้สำหรับ <1024)
  const SocialIconsRow = () => (
    <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6">
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
  );

  // 2 คอลัมน์แนวตั้ง (ใช้สำหรับ ≥1024)
  const SocialIconsCols = () => (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        <a href={`tel:${COMPANY.phone}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Call Virintira">
          <FaPhoneAlt className="w-5 h-5" />
        </a>
        <a href={COMPANY.socials.tiktok} target="_blank" rel="noopener noreferrer" className="bg-black rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on TikTok">
          <FaTiktok className="w-5 h-5 text-white" />
        </a>
        <a href={`mailto:${COMPANY.email}`} className="text-white bg-[#A70909] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Email Virintira">
          <FaEnvelope className="w-5 h-5" />
        </a>
      </div>
      <div className="flex flex-col gap-2">
        <a href={COMPANY.socials.line} target="_blank" rel="noopener noreferrer" className="bg-[#06C755] rounded-full w-11 h-11 p-1 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on LINE">
          <FaLine className="w-8 h-8 text-white" />
        </a>
        <a href={COMPANY.socials.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] rounded-full w-11 h-11 p-2.5 flex items-center justify-center shadow-md hover:opacity-80" aria-label="Virintira on Facebook">
          <FaFacebookF className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  );

  const LogoBlock = () => (
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
  );

  return (
    <footer className="snap-start bg-[#F9F9F9] text-gray-700">
      {/* ≥1245px: 4 คอลัมน์ */}
      <div className="hidden min-[1245px]:grid max-w-[1600px] mx-auto px-4 py-10 grid-cols-4 gap-y-16 gap-x-12 xl:gap-x-14 2xl:gap-x-16">
        <LogoBlock />
        <CompanyInfo />
        <MenuLinks />
        <div className="flex items-center justify-center">
          <SocialIconsCols />
        </div>
      </div>

      {/* 1024–1244px: 3 ส่วนแนวนอน (ซ่อนโลโก้) */}
      <div className="hidden lg:flex min-[1245px]:hidden w-full px-4 py-10">
        <div className="mx-auto max-w-[1200px] w-full flex items-start justify-center gap-16 lg:gap-20 xl:gap-24">
          <CompanyInfo />
          <MenuLinks />
          <div className="pt-2">
            <SocialIconsCols />
          </div>
        </div>
      </div>

      {/* 768–1023px: 2 แถว (บน 2 คอลัมน์, ล่างโซเชียลแนวนอน) */}
      <div className="hidden md:grid lg:hidden w-full px-4 py-10 gap-y-10">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 gap-10">
          <CompanyInfo />
          <MenuLinks />
        </div>
        <div className="w-full flex justify-center">
          <SocialIconsRow />
        </div>
      </div>

      {/* <768px: 2 ส่วน — ข้อมูลบริษัท (บล็อกกึ่งกลาง, ข้อความชิดซ้าย) + โซเชียลแนวนอน */}
      <div className="md:hidden w-full px-4 py-10">
        <div className="mx-auto flex flex-col items-center gap-10">
          {/* Centered container; apply a small logical start padding on very small screens to bias content right without overflow */}
          <div className="w-full max-w-[42ch] px-6 mx-auto">
            <div className="max-[466px]:[padding-inline-start:0.75rem]">
              <CompanyInfo />
            </div>
          </div>
          <SocialIconsRow />
        </div>
      </div>

      {/* Legal */}
      <div className="text-center py-4 border-t border-gray-200 text-gray-500 text-[clamp(12px,1.4vw,14px)]">
        <span className="mr-1">{(legalPrefix || '').replace(/\|\s*$/, '').trim()}</span>
        <span className="hidden sm:inline mx-1">|</span>
        <br className="sm:hidden" />
        {poweredByNode}
        {legalSuffix}
      </div>
    </footer>
  );
}
