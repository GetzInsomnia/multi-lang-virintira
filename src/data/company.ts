export const COMPANY = {
  brand: 'Virintira',
  legalNameTh: 'บริษัท วีรินทร์ทิรา จำกัด',
  legalNameEn: 'Virintira Company Limited',
  taxId: '0105562068366',
  phone: '+66928825556',
  phoneDisplay: '092-882-5556',
  email: 'virintirabusiness@gmail.com',
  address: {
    streetAddress: '222/172 ถนนสามวา',
    subDistrict: 'แขวงบางชัน',
    district: 'เขตคลองสามวา',
    province: 'กรุงเทพมหานคร',
    postalCode: '10510',
    country: 'TH',
    latitude: 13.821764,
    longitude: 100.724048,
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

export const company = {
  legalName: 'Virintira Accounting Co., Ltd.',
  brandName: 'Virintira Accounting',
  phone: '+66-00-000-0000',
  email: 'hello@example.com',
  address: {
    street: '',
    city: 'Bangkok',
    country: 'TH',
  },
  openingHours: ['Mo-Fr 09:00-18:00'],
} as const;
