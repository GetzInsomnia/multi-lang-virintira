"use client";

import Navbar from '@/components/navbar/Navbar';
import type { NavbarData } from '@/components/navbar/types';

export default function LocaleNavbar({ data }: { data: NavbarData }) {
  return <Navbar data={data} />;
}
