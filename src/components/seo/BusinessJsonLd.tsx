import { COMPANY, getLocalizedAddress } from '@/data/company';
import { JsonLd } from '@/components/common/JsonLd';
import { absoluteUrl } from '@/config/site';

type Props = {
  locale: string;
};

export function BusinessJsonLd({ locale }: Props) {
  const localizedUrl = absoluteUrl(`/${locale}`);
  const address = getLocalizedAddress(locale);
  const { latitude, longitude } = COMPANY.geo ?? {};
  const hasGeo = typeof latitude === 'number' && typeof longitude === 'number';
  const mapUrl = hasGeo
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : undefined;
  const useThai = (locale ?? 'th').toLowerCase().startsWith('th');
  const name = useThai ? COMPANY.legalNameTh : COMPANY.legalNameEn;
  const legalName = name;
  const alternateName = useThai ? COMPANY.legalNameEn : COMPANY.legalNameTh;

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${localizedUrl}#organization`,
    name,
    legalName,
    alternateName,
    url: localizedUrl,
    logo: absoluteUrl('/logo.svg'),
    image: absoluteUrl('/logo.svg'),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    priceRange: '฿฿',
    sameAs: [
      COMPANY.socials.facebook,
      COMPANY.socials.line,
      COMPANY.socials.tiktok,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.district,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: COMPANY.areaServed.map((name) => ({ '@type': 'Country', name })),
    openingHoursSpecification: COMPANY.businessHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    ...(hasGeo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude,
        longitude,
      },
      hasMap: mapUrl,
    }),
  } as const;

  return <JsonLd id="business-jsonld" data={data} />;
}
