import React from 'react'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  url: "https://virintira.com/",
  name: "Virintira Accounting Office",
  address: {
    "@type": "PostalAddress",
    streetAddress: "222/172 ถนนสามวา แขวงบางชัน",
    addressLocality: "เขตคลองสามวา กรุงเทพมหานคร",
    postalCode: "10510",
    addressCountry: "TH",
  },
  telephone: "+66928825556",
  sameAs: [
    "https://www.facebook.com/AccountbyVirintira/",
    "https://www.tiktok.com/@virintiraa",
    "https://lin.ee/AbavzHa",
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

