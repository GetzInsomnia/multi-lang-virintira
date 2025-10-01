import type { Metadata } from 'next';
import './globals.css';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
