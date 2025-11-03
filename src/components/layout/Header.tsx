'use client';
import type { NavbarData } from '@/components/navbar/types';
import Navbar from '@/components/navbar/Navbar';
import NavbarFontGate from './NavbarFontGate';

export default function Header({ data }: { data: NavbarData }) {
  return (
    <NavbarFontGate>
      <Navbar data={data} />
    </NavbarFontGate>
  );
}
