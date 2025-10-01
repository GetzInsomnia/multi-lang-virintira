'use client'

import { FaChevronLeft } from 'react-icons/fa'

export default function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[#A70909] text-xl hover:opacity-80 transition"
      aria-label="Back"
    >
      <FaChevronLeft />
    </button>
  )
}

