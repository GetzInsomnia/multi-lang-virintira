import { COMPANY } from '@/data/company';
import { JsonLd } from '@/components/common/JsonLd';
import { absoluteUrl } from '@/config/site';

type Props = {
  locale: string;
};

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${COMPANY.address.latitude},${COMPANY.address.longitude}`;

export function BusinessJsonLd({ locale }: Props) {
  const localizedUrl = absoluteUrl(`/${locale}`);

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${localizedUrl}#organization`,
    name: COMPANY.legalNameTh,
    legalName: COMPANY.legalNameTh,
    alternateName: COMPANY.legalNameEn,
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
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.district,
      addressRegion: COMPANY.address.province,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.address.latitude,
      longitude: COMPANY.address.longitude,
    },
    areaServed: COMPANY.areaServed.map((name) => ({ '@type': 'Country', name })),
    hasMap: MAP_URL,
    openingHoursSpecification: COMPANY.businessHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
  } as const;

  return <JsonLd id="business-jsonld" data={data} />;
}
