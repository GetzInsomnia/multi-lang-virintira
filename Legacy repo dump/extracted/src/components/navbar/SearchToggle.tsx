'use client'

import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // ปิดเมื่อคลิกนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      console.log('Searching for:', query)
      setIsOpen(false)
    } else {
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleToggle = () => {
    if (isOpen && query.trim()) {
      handleSearch()
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <div className="relative" ref={wrapperRef}>
      {/* ปุ่มแว่นขยาย */}
      <button
        onClick={handleToggle}
        className={`text-[#A70909] hover:opacity-80 transition flex items-center justify-center h-8 w-8 absolute right-0 top-1/2 -translate-y-1/2 lg:static lg:translate-y-0 z-20`}
      >
        <FaSearch className="w-4 h-4" />
      </button>

      {/* แถบค้นหา - PC */}
      <div
        className={`absolute -right-1 top-1/2 -translate-y-1/2 h-8 bg-white shadow-md rounded-md pl-3 pr-10 flex items-center transition-all duration-300 ease-in-out 
          ${isOpen ? 'opacity-100 w-64 pointer-events-auto' : 'opacity-0 w-0 pointer-events-none'} 
          hidden lg:flex`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ค้นหา..."
          className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-400"
        />
        <button onClick={handleSearch} className="absolute right-3 text-[#A70909]">
          <FaSearch className="w-4 h-4" />
        </button>
      </div>

      {/* แถบค้นหา - Mobile */}
      <div
        className={`fixed top-[55px] left-0 w-full px-4 py-2 bg-white shadow-md rounded-md transition-all duration-300 ease-in-out lg:hidden 
          ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ค้นหา..."
            className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-400"
          />
          <button onClick={handleSearch} className="text-[#A70909]">
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

