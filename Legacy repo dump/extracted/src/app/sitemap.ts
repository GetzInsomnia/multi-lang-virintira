import { MetadataRoute } from 'next'

// Temporary sitemap; it will expand as new pages appear.

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://virintira.com/',
      lastModified: new Date(),
    },
    {
      url: 'https://virintira.com/promotion',
      lastModified: new Date(),
    },
    {
      url: 'https://virintira.com/under-construction',
      lastModified: new Date(),
    },
  ]
}

