import type { Metadata } from 'next';
import './globals.css';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFEFE] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
