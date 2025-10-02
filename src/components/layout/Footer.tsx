"use client";

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { SVGProps } from 'react';

import { COMPANY } from '@/data/company';
import { Link } from '@/i18n/routing';

export type FooterLink = { label: string; href: string };

export type FooterData = {
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    line: string;
  };
  quickLinks: FooterLink[];
  legal: string;
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

type IconProps = SVGProps<SVGSVGElement>;

function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function LineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z" />
    </svg>
  );
}

function TiktokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );
}

function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
    </svg>
  );
}

function splitQuickLinks(links: FooterLink[]) {
  const midpoint = Math.ceil(links.length / 2);
  return [links.slice(0, midpoint), links.slice(midpoint)] as const;
}

function renderFooterLink(link: FooterLink) {
  const href = resolveHref(link.href);
  if (link.href.startsWith('#') || isExternalHref(href)) {
    return (
      <a className="hover:underline text-[#A70909] font-medium" href={href}>
        {link.label}
      </a>
    );
  }

  return (
    <Link className="hover:underline text-[#A70909] font-medium" href={href} prefetch>
      {link.label}
    </Link>
  );
}

export function Footer({ data }: { data: FooterData }) {
  const pathname = usePathname();
  const year = new Date().getFullYear().toString();

  const [primaryQuickLinks, secondaryQuickLinks] = splitQuickLinks(data.quickLinks);
  const contactLinks = [
    {
      label: data.contact.phone.replace('{phone}', COMPANY.phoneDisplay),
      href: `tel:${COMPANY.phone}`,
    },
    {
      label: data.contact.email.replace('{email}', COMPANY.email),
      href: `mailto:${COMPANY.email}`,
    },
    {
      label: data.contact.line,
      href: COMPANY.socials.line,
      external: true,
    },
  ];

  const handleLogoClick = () => {
    if (typeof window === 'undefined') return;

    if (pathname === '/') {
      window.location.hash = HERO_SECTION_ID;
      const target = document.getElementById(HERO_SECTION_ID);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${HERO_SECTION_ID}`;
    }
  };

  return (
    <footer className="snap-start bg-[#F9F9F9] text-gray-700 text-sm">
      <div className="hidden lg:grid max-w-[1600px] mx-auto px-4 py-10 grid-cols-4 gap-y-12 gap-x-10">
        <button
          type="button"
          className="flex flex-col items-center justify-center text-center h-full cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
          <span className="mt-2 font-bold text-[#A70909] text-2xl">
            {COMPANY.brand.toUpperCase()}
          </span>
        </button>
        <div className="flex flex-col justify-center h-full text-left max-w-md px-2">
          <span className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
            {COMPANY.legalNameEn}
          </span>
          <div className="space-y-1">
            <p>Tax ID: {COMPANY.taxId}</p>
            <p>{COMPANY.address.streetAddress}</p>
            <p>
              {COMPANY.address.subDistrict} {COMPANY.address.district}
            </p>
            <p>
              {COMPANY.address.province} {COMPANY.address.postalCode}
            </p>
            <p>{COMPANY.phoneDisplay}</p>
            <p>{COMPANY.email}</p>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-center h-full gap-6 px-2">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              {primaryQuickLinks.map((link) => (
                <div key={link.label}>{renderFooterLink(link)}</div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A70909] font-medium">Contact</span>
              <div className="ml-3 mt-1 space-y-1 text-sm">
                {secondaryQuickLinks.map((link) => (
                  <div key={link.label}>{renderFooterLink(link)}</div>
                ))}
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[#A70909] block hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex justify-center h-full px-2">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Call Virintira"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
              <a
                href={COMPANY.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on TikTok"
              >
                <TiktokIcon className="h-5 w-5 text-white" />
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Email Virintira"
              >
                <EnvelopeIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={COMPANY.socials.line}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on LINE"
              >
                <LineIcon className="h-7 w-7 text-white" />
              </a>
              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
                aria-label="Virintira on Facebook"
              >
                <FacebookIcon className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex lg:hidden flex-col gap-10 max-w-[1600px] mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            type="button"
            className="cursor-pointer flex flex-col items-start px-2"
            onClick={handleLogoClick}
          >
            <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
            <span className="mt-2 font-bold text-[#A70909] text-2xl">
              {COMPANY.brand.toUpperCase()}
            </span>
          </button>
          <div className="text-left px-2">
            <span className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
              {COMPANY.legalNameEn}
            </span>
            <div className="space-y-1">
              <p>Tax ID: {COMPANY.taxId}</p>
              <p>{COMPANY.address.streetAddress}</p>
              <p>
                {COMPANY.address.subDistrict} {COMPANY.address.district}
              </p>
              <p>
                {COMPANY.address.province} {COMPANY.address.postalCode}
              </p>
              <p>{COMPANY.phoneDisplay}</p>
              <p>{COMPANY.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-10 px-2 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col gap-2 min-w-[140px]">
            {primaryQuickLinks.map((link) => (
              <div key={link.label}>{renderFooterLink(link)}</div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#A70909] font-medium">Contact</span>
            <div className="ml-3 mt-1 space-y-1 text-sm">
              {secondaryQuickLinks.map((link) => (
                <div key={link.label}>{renderFooterLink(link)}</div>
              ))}
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-[#A70909] block hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap px-2">
          <a
            href={`tel:${COMPANY.phone}`}
            className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Call Virintira"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href={COMPANY.socials.line}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on LINE"
          >
            <LineIcon className="h-7 w-7 text-white" />
          </a>
          <a
            href={COMPANY.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on TikTok"
          >
            <TiktokIcon className="h-5 w-5 text-white" />
          </a>
          <a
            href={COMPANY.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on Facebook"
          >
            <FacebookIcon className="h-5 w-5 text-white" />
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Email Virintira"
          >
            <EnvelopeIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-10 max-w-[1600px] mx-auto px-4 py-10 pt-20">
        <button
          type="button"
          className="flex flex-col items-center justify-center text-center mt-6 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image src="/logo.png" alt={`${COMPANY.brand} logo`} width={120} height={120} />
          <span className="mt-2 font-bold text-[#A70909] text-2xl">
            {COMPANY.brand.toUpperCase()}
          </span>
        </button>

        <div className="indent-5 text-left px-2">
          <span className="font-semibold text-lg text-[#A70909] block mb-4 whitespace-nowrap">
            {COMPANY.legalNameEn}
          </span>
          <div className="space-y-1">
            <p>Tax ID: {COMPANY.taxId}</p>
            <p>{COMPANY.address.streetAddress}</p>
            <p>
              {COMPANY.address.subDistrict} {COMPANY.address.district}
            </p>
            <p>
              {COMPANY.address.province} {COMPANY.address.postalCode}
            </p>
            <p>{COMPANY.phoneDisplay}</p>
            <p>{COMPANY.email}</p>
          </div>
        </div>

        <div className="flex justify-center gap-10 px-2">
          <div className="flex flex-col gap-2">
            {primaryQuickLinks.map((link) => (
              <div key={link.label}>{renderFooterLink(link)}</div>
            ))}
            {secondaryQuickLinks.map((link) => (
              <div key={link.label}>{renderFooterLink(link)}</div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#A70909] font-medium">Contact</span>
            <div className="ml-3 mt-1 space-y-1 text-sm">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-[#A70909] block hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href={`tel:${COMPANY.phone}`}
            className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Call Virintira"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href={COMPANY.socials.line}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on LINE"
          >
            <LineIcon className="h-7 w-7 text-white" />
          </a>
          <a
            href={COMPANY.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on TikTok"
          >
            <TiktokIcon className="h-5 w-5 text-white" />
          </a>
          <a
            href={COMPANY.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Virintira on Facebook"
          >
            <FacebookIcon className="h-5 w-5 text-white" />
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-white bg-[#A70909] rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:opacity-80"
            aria-label="Email Virintira"
          >
            <EnvelopeIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 text-sm text-gray-500">
        {data.legal.replace('{year}', year)}
      </div>
    </footer>
  );
}

export default Footer;
