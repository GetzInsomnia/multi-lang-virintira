'use client'

import { useEffect, useState } from 'react'

export default function TypewriterText({
  text,
  speed = 80,
  className = '',
}: {
  text: string
  speed?: number
  className?: string
}) {
  const [subIndex, setSubIndex] = useState(0)

  useEffect(() => {
    if (subIndex < text.length) {
      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [subIndex, text, speed])

  return (
    <h2 className={`text-lg lg:text-2xl text-[#A70909] leading-relaxed ${className}`}>
      {text.substring(0, subIndex)}
      <span className="inline-block w-[1ch] animate-pulse">|</span>
    </h2>
  )
}

