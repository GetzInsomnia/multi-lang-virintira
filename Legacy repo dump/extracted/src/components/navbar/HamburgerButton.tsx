'use client'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerButton({ isOpen, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden text-2xl text-[#A70909] hover:text-black transition"
      aria-label="Toggle menu"
    >
      {isOpen ? '✕' : '☰'}
    </button>
  )
}

