'use client'

import { useEffect } from 'react'

export default function ScrollToHero() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    const handleHashChange = () => {
      if (window.location.hash === '#herosection') {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          const target = document.getElementById('herosection')
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        }, 50)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      if (timeout) clearTimeout(timeout)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return null
}

