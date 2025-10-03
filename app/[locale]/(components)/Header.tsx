import type { NavbarData } from './types';

import Navbar from './Navbar';

export default function Header({ data }: { data: NavbarData }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-virintira-border bg-white/80 shadow-header backdrop-blur [--nav-h:72px]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center px-5 sm:px-6 lg:px-8">
        <Navbar data={data} />
      </div>
    </header>
  );
}
