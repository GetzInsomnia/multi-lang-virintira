'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MousePointerClick, MessageSquare, FileText, CheckCircle } from 'lucide-react'
import { ConsultationButtons } from '@/components/common/ConsultationButtons'
import { useTranslations } from 'next-intl'

export type ProcessStep = {
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  heading?: string
  steps?: ProcessStep[]
}

export function HowItWorksSection({ heading, steps: propSteps }: HowItWorksSectionProps) {
  const t = useTranslations('home.process')
  const tHome = useTranslations('home')
  const tLayout = useTranslations('layout')
  const [mobileIndex, setMobileIndex] = useState(0)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [hasStartedHighlight, setHasStartedHighlight] = useState(false)

  // Shadow Config: "Darker, spread 1"
  // Example: shadow-[0_8px_20px_1px_rgba(...,0.5)]
  const steps = [
    {
      icon: <MousePointerClick className="w-10 h-10 lg:w-12 lg:h-12 text-[#A70909]" />,
      title: t('steps.0.title'),
      description: t('steps.0.description'),
      // Purple
      shadowClass: 'shadow-[0_8px_25px_1px_rgba(139,92,246,0.25)]',
      activeShadow: 'shadow-[0_12px_35px_1px_rgba(139,92,246,0.4)]',
      borderColor: 'border-[#8b5cf6]'
    },
    {
      icon: <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-[#A70909]" />,
      title: t('steps.1.title'),
      description: t('steps.1.description'),
      // Green
      shadowClass: 'shadow-[0_8px_25px_1px_rgba(6,199,85,0.25)]',
      activeShadow: 'shadow-[0_12px_35px_1px_rgba(6,199,85,0.4)]',
      borderColor: 'border-[#06C755]'
    },
    {
      icon: <FileText className="w-10 h-10 lg:w-12 lg:h-12 text-[#A70909]" />,
      title: t('steps.2.title'),
      description: t('steps.2.description'),
      // Blue - made specifically stronger/darker
      shadowClass: 'shadow-[0_8px_25px_1px_rgba(59,130,246,0.35)]',
      activeShadow: 'shadow-[0_12px_35px_1px_rgba(59,130,246,0.5)]',
      borderColor: 'border-[#3b82f6]'
    },
    {
      icon: <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-[#A70909]" />,
      title: t('steps.3.title'),
      description: t('steps.3.description'),
      // Red
      shadowClass: 'shadow-[0_8px_25px_1px_rgba(167,9,9,0.25)]',
      activeShadow: 'shadow-[0_12px_35px_1px_rgba(167,9,9,0.4)]',
      borderColor: 'border-[#A70909]'
    }
  ]

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
    // Wait for cards to stagger in (0.1s * 4 = 0.4s) + buffer
    const delayBeforeStart = screenWidth < 640 ? 500 : 1000

    const startTimer = setTimeout(() => {
      setHasStartedHighlight(true)
    }, delayBeforeStart)

    return () => clearTimeout(startTimer)
  }, [isInView])

  useEffect(() => {
    if (!hasStartedHighlight) return

    // Mobile Timer: 2.5s (Fast, fluid)
    const mobileTimer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % steps.length)
    }, 2500)

    // Desktop Timer: 2.5s (Faster, synchronized with Mobile)
    const desktopTimer = setInterval(() => {
      setDesktopIndex((prev) => (prev + 1) % steps.length)
    }, 2500)

    return () => {
      clearInterval(mobileTimer)
      clearInterval(desktopTimer)
    }
  }, [hasStartedHighlight, steps.length])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100dvh-var(--header-height))] snap-start bg-[#fff4f4] flex flex-col justify-start pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden"
      style={{ minHeight: 'calc(100dvh - var(--header-height))' }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center relative z-10">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#A70909] mb-16 md:mb-24">
          {t('heading')}
        </h2>

        {/* 
            MOBILE LAYOUT (Grid 2 Cols: Timeline | Content) 
            Guarantees alignment of line and icon.
        */}
        <div className="relative mb-20 w-full px-4 md:px-8 lg:hidden">
          <div className="grid grid-cols-[5rem_1fr] auto-rows-auto">
            {steps.map((step, index) => {
              // Direct "isActive" calculation, no isVisible toggle to prevent flickering
              const isActive = hasStartedHighlight && mobileIndex === index;
              const isLast = index === steps.length - 1;

              return (
                <div key={`mobile-step-${index}`} className="contents group">
                  {/* Column 1: Timeline (Icon + Line) */}
                  <div className="relative flex flex-col items-center">
                    {/* Icon Container (Fixed Size) */}
                    <div className="relative z-20 flex-none h-20 w-20">
                      <div
                        className={`
                                            w-full h-full rounded-full bg-white flex items-center justify-center border border-gray-100 relative transition-transform duration-500
                                            ${isActive ? 'scale-110' : 'scale-100'}
                                            ${/* Removed shadow from icon as requested */ ''}
                                        `}
                      >
                        {step.icon}
                      </div>

                      {/* Red Ring - THICKER & TIGHTER per request 
                                        -inset-[3px] aligns tight. border-[5px].
                                    */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute -inset-[3px] rounded-full border-[5px] border-[#A70909] z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Connecting Line (Stretches to bottom of cell) */}
                    {!isLast && (
                      <div className="w-1 bg-[#A70909]/10 flex-grow relative my-2 z-0">
                        {/* Traveling Beam - FADES OUT before reaching end */}
                        {isActive && (
                          <motion.div
                            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#A70909] to-transparent opacity-80"
                            initial={{ top: '0%', opacity: 0 }}
                            animate={{
                              top: ['0%', '100%'],   // Travel FULL height
                              opacity: [1, 1]        // Stay visible until switch
                            }}
                            transition={{ duration: 2.5, ease: "linear" }} // Sync exactly with interval
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Column 2: Content (with bottom padding for spacing) */}
                  <motion.div
                    className="pb-12 pl-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`
                                        p-6 rounded-2xl transition-all duration-500 h-full flex flex-col justify-center
                                        border border-transparent
                                        ${isActive
                          ? `bg-white border-[#A70909]/20 transform scale-[1.02] ${step.activeShadow}`
                          : `bg-white/60 ${step.shadowClass}`
                        }
                                    `}
                    >
                      <h3 className="text-xl font-bold mb-2 text-balance leading-tight text-[#A70909]">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm text-balance">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 
            DESKTOP LAYOUT (Horizontal) 
            Re-engineered to match Mobile Physics (Traveling Beam + Pulsing Ring)
        */}
        <div className="relative mb-20 w-full px-8 hidden lg:block">
          {/* Connector Track - Background Only */}
          <div className="absolute top-12 left-0 right-0 h-1 -translate-y-1/2 z-0">
            {[0, 1, 2].map(i => (
              <div key={`track-${i}`} className="absolute h-full bg-[#A70909]/5"
                style={{
                  left: `calc(${12.5 + (i * 25)}% + 3rem)`, // 3rem = 48px offset from center
                  width: `calc(25% - 6rem)`                 // Gap between icons
                }}
              />
            ))}
          </div>

          {/* Active Beam Layer - Projectile Physics */}
          <div className="absolute top-12 left-0 right-0 h-1 -translate-y-1/2 z-0 overflow-hidden pointer-events-none">
            {[0, 1, 2].map(i => {
              const isActive = hasStartedHighlight && desktopIndex === i;
              return (
                <div key={`beam-${i}`} className="absolute h-full"
                  style={{
                    left: `calc(${12.5 + (i * 25)}% + 3rem)`,
                    width: `calc(25% - 6rem)`
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#A70909] to-transparent opacity-80"
                      initial={{ left: '-20%', opacity: 0 }}
                      animate={{
                        left: ['0%', '90%'], // Stop slightly early = "Soft Landing"
                        opacity: [0, 1, 1, 0] // Fade out at the very end
                      }}
                      transition={{
                        duration: 2.5,
                        ease: "linear",
                        times: [0, 0.1, 0.8, 1] // Fade out starting at 80% to be safe
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-4 gap-x-8 z-10 w-full">
            {steps.map((step, index) => {
              const isActive = hasStartedHighlight && desktopIndex === index;
              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center group h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Icon */}
                  <div className="relative flex-shrink-0 z-20 mb-8">
                    <div
                      className={`
                                    w-24 h-24 rounded-full bg-white flex items-center justify-center border border-gray-100 relative z-20 transition-all duration-500
                                    ${isActive ? 'scale-110' : 'scale-100'}
                                    ${/* No shadow on icon */ ''}
                                `}
                    >
                      {step.icon}

                      {/* Red Ring - Lifecycle Sync (Round 11 - Hyper Snap)
                          1. Delay 0.1s: Almost instant. Catch the very start of the scale up.
                          2. Duration 0.2s (Exit): Fade out extremely fast to prevent any lingering feeling.
                          3. Structural: Still inside the scaling container for perfect physics sync.
                      */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute -inset-[5px] rounded-full border-[5px] border-[#A70909] z-10 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: isActive ? 0.3 : 0.2, // fast on enter, faster on exit
                              ease: "easeInOut",
                              delay: isActive ? 0.1 : 0 // almost instant
                            }}
                          />
                        )}
                      </AnimatePresence>


                    </div>


                  </div>

                  {/* Content */}
                  <div className="w-full text-center flex-1 flex flex-col">
                    <div
                      className={`
                                    p-8 rounded-2xl transition-all duration-500 flex flex-col justify-center relative flex-1 h-full
                                    border border-transparent
                                    ${isActive
                          ? `bg-white border-[#A70909]/20 transform scale-[1.02] ${step.activeShadow}`
                          : `bg-white/60 ${step.shadowClass}`
                        }
                                `}
                    >
                      <h3 className="text-xl font-bold mb-3 text-balance leading-tight text-[#A70909]">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base text-balance mt-auto">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>


      </div>
    </section>
  )
}
