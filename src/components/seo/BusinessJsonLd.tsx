import { COMPANY } from '@/data/company';
import { JsonLd } from '@/components/common/JsonLd';
import { absoluteUrl } from '@/config/site';

export function BusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: COMPANY.legalNameTh,
    legalName: COMPANY.legalNameTh,
    alternateName: COMPANY.legalNameEn,
    url: absoluteUrl('/'),
    email: COMPANY.email,
    telephone: COMPANY.phone,
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
    openingHoursSpecification: COMPANY.businessHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
  };

  return <JsonLd id="business-jsonld" data={data} />;
}
