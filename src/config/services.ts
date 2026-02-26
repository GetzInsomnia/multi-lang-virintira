export const CATEGORY_SLUGS = [
  'registrations',
  'corporate-changes',
  'accounting-audit',
  'licensing',
  'digital-marketing',
] as const;

export const SERVICE_SLUGS = [
  'company-limited',
  'limited-partnership',
  'foundation',
  'association',
  'commercial-shop',
  'employer-sso',
  'vat-registration',
  'company-name',
  'company-seal',
  'directors',
  'signing-authority',
  'shareholders',
  'capital',
  'address',
  'objectives',
  'dissolution',
  'monthly-bookkeeping',
  'monthly-tax',
  'close-financial',
  'personal-accounts',
  'audit',
  'tax-planning',
  'foreign-tax-id',
  'tourism-licence',
  'thai-fda',
  'visa-work-permit',
  'boi-promotion',
  'foreign-business',
  'website-build',
  'facebook-page',
  'line-oa',
  'tiktok',
  'youtube',
  'video-production',
  'paid-ads',
  'ai-solutions',
  'odoo-erp',
  'custom-software',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceConfigItem = {
  serviceSlug: ServiceSlug;
  categorySlug: CategorySlug;
  isPopular?: boolean;
  imagePath?: string;
  order?: number;
};

export type ServiceCategoryConfig = {
  categorySlug: CategorySlug;
  items: ServiceConfigItem[];
  order?: number;
  imagePath: string;
};

export type ServicesConfig = {
  categories: ServiceCategoryConfig[];
};

export const servicesConfig: ServicesConfig = {
  categories: [
    {
      categorySlug: 'registrations',
      order: 1,
      imagePath: '/services/registration.webp',
      items: [
        {
          serviceSlug: 'company-limited',
          categorySlug: 'registrations',
          isPopular: true,
          imagePath: '/services/registration.webp',
          order: 1,
        },
        { serviceSlug: 'limited-partnership', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 2 },
        { serviceSlug: 'foundation', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 3 },
        { serviceSlug: 'association', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 4 },
        { serviceSlug: 'commercial-shop', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 5 },
        { serviceSlug: 'employer-sso', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 6 },
        { serviceSlug: 'vat-registration', categorySlug: 'registrations', isPopular: false, imagePath: '', order: 7 },
      ],
    },
    {
      categorySlug: 'corporate-changes',
      order: 2,
      imagePath: '/services/edit-info.webp',
      items: [
        {
          serviceSlug: 'company-name',
          categorySlug: 'corporate-changes',
          isPopular: true,
          imagePath: '/services/edit-info.webp',
          order: 1,
        },
        { serviceSlug: 'company-seal', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 2 },
        { serviceSlug: 'directors', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 3 },
        { serviceSlug: 'signing-authority', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 4 },
        { serviceSlug: 'shareholders', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 5 },
        { serviceSlug: 'capital', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 6 },
        { serviceSlug: 'address', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 7 },
        { serviceSlug: 'objectives', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 8 },
        { serviceSlug: 'dissolution', categorySlug: 'corporate-changes', isPopular: false, imagePath: '', order: 9 },
      ],
    },
    {
      categorySlug: 'accounting-audit',
      order: 3,
      imagePath: '/services/accounting.webp',
      items: [
        {
          serviceSlug: 'monthly-bookkeeping',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/accounting.webp',
          order: 1,
        },
        { serviceSlug: 'monthly-tax', categorySlug: 'accounting-audit', isPopular: false, imagePath: '', order: 2 },
        {
          serviceSlug: 'close-financial',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/close-financial.webp',
          order: 3,
        },
        { serviceSlug: 'personal-accounts', categorySlug: 'accounting-audit', isPopular: false, imagePath: '', order: 4 },
        { serviceSlug: 'audit', categorySlug: 'accounting-audit', isPopular: false, imagePath: '', order: 5 },
        {
          serviceSlug: 'tax-planning',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/tax.webp',
          order: 6,
        },
        { serviceSlug: 'foreign-tax-id', categorySlug: 'accounting-audit', isPopular: false, imagePath: '', order: 7 },
      ],
    },
    {
      categorySlug: 'licensing',
      order: 4,
      imagePath: '/services/close-financial.webp',
      items: [
        { serviceSlug: 'tourism-licence', categorySlug: 'licensing', isPopular: false, imagePath: '', order: 1 },
        { serviceSlug: 'thai-fda', categorySlug: 'licensing', isPopular: false, imagePath: '', order: 2 },
        { serviceSlug: 'visa-work-permit', categorySlug: 'licensing', isPopular: false, imagePath: '', order: 3 },
        { serviceSlug: 'boi-promotion', categorySlug: 'licensing', isPopular: false, imagePath: '', order: 4 },
        { serviceSlug: 'foreign-business', categorySlug: 'licensing', isPopular: false, imagePath: '', order: 5 },
      ],
    },
    {
      categorySlug: 'digital-marketing',
      order: 5,
      imagePath: '/services/tax.webp',
      items: [
        { serviceSlug: 'website-build', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 1 },
        { serviceSlug: 'facebook-page', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 2 },
        { serviceSlug: 'line-oa', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 3 },
        { serviceSlug: 'tiktok', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 4 },
        { serviceSlug: 'youtube', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 5 },
        { serviceSlug: 'video-production', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 6 },
        { serviceSlug: 'paid-ads', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 7 },
        { serviceSlug: 'ai-solutions', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 8 },
        { serviceSlug: 'odoo-erp', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 9 },
        { serviceSlug: 'custom-software', categorySlug: 'digital-marketing', isPopular: false, imagePath: '', order: 10 },
      ],
    },
  ],
};

export type ServiceCardItem = {
  serviceSlug: ServiceSlug;
  categorySlug: CategorySlug;
  imagePath: string;
  title: string;
  description: string;
};

export type ServicesTranslator = (key: string) => string;

export function buildPopularServicesForLocale(
  _locale: string,
  tServices: ServicesTranslator
): ServiceCardItem[] {
  const popularItems = servicesConfig.categories
    .flatMap((category) => category.items)
    .filter((item) => item.isPopular)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 5);

  return popularItems.map((item) => {
    const baseKey = `items.${item.serviceSlug}`;
    const title = tServices(`${baseKey}.title`);
    const summary = tServices(`${baseKey}.summary`);

    return {
      serviceSlug: item.serviceSlug,
      categorySlug: item.categorySlug,
      imagePath: item.imagePath ?? '',
      title: String(title),
      description: String(summary),
    };
  });
}
