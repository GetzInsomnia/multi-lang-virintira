import type { Metadata } from 'next'
import UnderConstructionContent from './UnderConstructionContent'

export const generateMetadata = (): Metadata => ({
  title: 'หน้ากำลังพัฒนา',
  alternates: { canonical: 'https://virintira.com/under-construction' },
})

export default function UnderConstructionPage() {
  return <UnderConstructionContent />
}

