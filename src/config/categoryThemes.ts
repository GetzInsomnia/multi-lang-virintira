import type { CategorySlug } from './services';

export type CategoryTheme = {
  /** Primary accent color hex */
  accent: string;
  /** Lighter accent for gradients / via color */
  accentLight: string;
  /** Tailwind bg class for tinted section (Benefits) */
  tintBg: string;
  /** Tailwind bg class for icon containers (normal state) */
  iconBg: string;
  /** Tailwind text class for icons / accent text */
  iconText: string;
  /** Tailwind border class for hero section */
  heroBorder: string;
  /** Tailwind hover border class for feature cards */
  hoverBorder: string;
  /** CSS rgba for orb blur (hero decorative) */
  orbColor: string;
  /** CSS rgba for step circle shadow */
  stepShadow: string;
  /** SVG fill color for hero decoration */
  svgFill: string;
  /** Benefits section heading text color class */
  benefitsHeading: string;
};

export const CATEGORY_THEMES: Record<CategorySlug, CategoryTheme> = {
  'registrations': {
    accent: '#A70909',
    accentLight: '#ff4e50',
    tintBg: 'bg-[#FFF5F5]',
    iconBg: 'bg-red-50',
    iconText: 'text-[#A70909]',
    heroBorder: 'border-red-50',
    hoverBorder: 'hover:border-red-200',
    orbColor: 'rgba(167,9,9,0.06)',
    stepShadow: 'rgba(167,9,9,0.4)',
    svgFill: '#A70909',
    benefitsHeading: 'text-[#A70909]',
  },
  'corporate-changes': {
    accent: '#B45309',
    accentLight: '#F59E0B',
    tintBg: 'bg-[#FFFBEB]',
    iconBg: 'bg-amber-50',
    iconText: 'text-[#B45309]',
    heroBorder: 'border-amber-50',
    hoverBorder: 'hover:border-amber-200',
    orbColor: 'rgba(180,83,9,0.06)',
    stepShadow: 'rgba(180,83,9,0.4)',
    svgFill: '#B45309',
    benefitsHeading: 'text-[#B45309]',
  },
  'accounting-audit': {
    accent: '#1D4ED8',
    accentLight: '#60A5FA',
    tintBg: 'bg-[#EFF6FF]',
    iconBg: 'bg-blue-50',
    iconText: 'text-[#1D4ED8]',
    heroBorder: 'border-blue-50',
    hoverBorder: 'hover:border-blue-200',
    orbColor: 'rgba(29,78,216,0.06)',
    stepShadow: 'rgba(29,78,216,0.4)',
    svgFill: '#1D4ED8',
    benefitsHeading: 'text-[#1D4ED8]',
  },
  'licensing': {
    accent: '#047857',
    accentLight: '#34D399',
    tintBg: 'bg-[#ECFDF5]',
    iconBg: 'bg-emerald-50',
    iconText: 'text-[#047857]',
    heroBorder: 'border-emerald-50',
    hoverBorder: 'hover:border-emerald-200',
    orbColor: 'rgba(4,120,87,0.06)',
    stepShadow: 'rgba(4,120,87,0.4)',
    svgFill: '#047857',
    benefitsHeading: 'text-[#047857]',
  },
  'digital-marketing': {
    accent: '#7C3AED',
    accentLight: '#A78BFA',
    tintBg: 'bg-[#F5F3FF]',
    iconBg: 'bg-violet-50',
    iconText: 'text-[#7C3AED]',
    heroBorder: 'border-violet-50',
    hoverBorder: 'hover:border-violet-200',
    orbColor: 'rgba(124,58,237,0.06)',
    stepShadow: 'rgba(124,58,237,0.4)',
    svgFill: '#7C3AED',
    benefitsHeading: 'text-[#7C3AED]',
  },
};

/** Fallback to registrations (brand red) if category not found */
export function getCategoryTheme(categorySlug: string): CategoryTheme {
  return CATEGORY_THEMES[categorySlug as CategorySlug] ?? CATEGORY_THEMES['registrations'];
}
