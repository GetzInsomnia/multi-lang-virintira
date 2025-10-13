export const COMPANY = {
  brand: 'Virintira',
  brandMark: 'ViRINTIRA',
  legalNameTh: 'บริษัท วีรินทร์ทิรา จำกัด (สำนักงานใหญ่)',
  legalNameEn: 'Virintira Co., Ltd. (Head Quarter)',
  taxId: '0105562068366',
  phone: '+66928825556',
  phoneDisplay: '092-882-5556',
  email: 'virintirabusiness@gmail.com',
  geo: {
    latitude: 13.832931,
    longitude: 100.728633,
  },
  addressTh: {
    streetAddress: '222/172 ถนนสามวา',
    subDistrict: 'แขวงบางชัน',
    district: 'เขตคลองสามวา',
    province: 'กรุงเทพมหานคร',
    postalCode: '10510',
    country: 'TH',
  },
  addressEn: {
    streetAddress: '222/172 Sam Wa Rd.,',
    subDistrict: 'Bang Chan Subdistrict,',
    district: 'Khlong Sam Wa District,',
    province: 'Bangkok,',
    postalCode: '10510',
    country: 'TH',
  },
  socials: {
    facebook: 'https://www.facebook.com/AccountbyVirintira',
    line: 'https://lin.ee/LNIp36f',
    tiktok: 'https://www.tiktok.com/@virintiraa',
  },
  businessHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: ['Thailand'],
};

export function getLocalizedAddress(locale?: string) {
  const thaiAddress = COMPANY.addressTh;
  const englishAddress = COMPANY.addressEn ?? thaiAddress;
  const useThai = (locale ?? 'th').toLowerCase().startsWith('th');
  return useThai ? thaiAddress : { ...thaiAddress, ...englishAddress };
}

export const company = {
  legalName: 'Virintira Co., Ltd.',
  brandName: 'ViRINTIRA',
  phone: '+66-92-882-5556',
  email: 'virintirabusiness@gmail.com',
  address: {
    street: '222/172 Sam Wa Rd., Bang Chan Subdistrict, Khlong Sam Wa District,',
    city: 'Bangkok',
    country: 'TH',
  },
  openingHours: ['Mo-Fr 09:00-18:00'],
} as const;
