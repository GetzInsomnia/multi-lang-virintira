import type { NavbarData } from '@/components/navbar/types';

import Navbar from '../navbar/Navbar';

export default function Header({ data }: { data: NavbarData }) {
  return <Navbar data={data} />;
}
