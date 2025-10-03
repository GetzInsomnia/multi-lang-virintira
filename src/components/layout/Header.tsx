import type { NavbarData } from '@/components/navbar/types';

import Navbar from '../navbar/Navbar';

export default function Header({ data }: { data: NavbarData }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white shadow-header [--nav-h:72px]">
      <Navbar data={data} />
    </header>
  );
}
