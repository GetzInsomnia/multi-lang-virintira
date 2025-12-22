export const CATEGORY_SLUGS = [
  'registrations',
  'corporate-changes',
  'accounting-audit',
  'licensing',
  'digital-marketing',
] as const;

export const SERVICE_SLUGS = [
  'registration',
  'edit-info',
  'monthly-bookkeeping',
  'close-financial',
  'tax-planning',
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
};

export type ServicesConfig = {
  categories: ServiceCategoryConfig[];
};

export const servicesConfig: ServicesConfig = {
  categories: [
    {
      categorySlug: 'registrations',
      order: 1,
      items: [
        {
          serviceSlug: 'registration',
          categorySlug: 'registrations',
          isPopular: true,
          imagePath: '/services/registration.webp',
          order: 1,
        },
      ],
    },
    {
      categorySlug: 'corporate-changes',
      order: 2,
      items: [
        {
          serviceSlug: 'edit-info',
          categorySlug: 'corporate-changes',
          isPopular: true,
          imagePath: '/services/edit-info.webp',
          order: 2,
        },
      ],
    },
    {
      categorySlug: 'accounting-audit',
      order: 3,
      items: [
        {
          serviceSlug: 'monthly-bookkeeping',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/accounting.webp',
          order: 3,
        },
        {
          serviceSlug: 'close-financial',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/close-financial.webp',
          order: 4,
        },
        {
          serviceSlug: 'tax-planning',
          categorySlug: 'accounting-audit',
          isPopular: true,
          imagePath: '/services/tax.webp',
          order: 5,
        },
      ],
    },
    {
      categorySlug: 'licensing',
      order: 4,
      items: [],
    },
    {
      categorySlug: 'digital-marketing',
      order: 5,
      items: [],
    },
  ],
};

export type ServiceCardItem = {
  serviceSlug: ServiceSlug;
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
    const baseKey = `services.items.${item.serviceSlug}`;
    const title = tServices(`${baseKey}.title`);
    const summary = tServices(`${baseKey}.summary`);

    return {
      serviceSlug: item.serviceSlug,
      imagePath: item.imagePath ?? '',
      title,
      description: summary,
    };
  });
}
