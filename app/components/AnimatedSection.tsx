'use client'

import { ReactNode } from 'react'

interface AnimatedSectionProps {
  id: string
  children: ReactNode
  isActive: boolean
  visibilityRatio: number
  className?: string
}

export const AnimatedSection = ({ 
  id, 
  children, 
  isActive, 
  visibilityRatio, 
  className = '' 
}: AnimatedSectionProps) => {
  // Calculate scale and opacity based on visibility
  const scale = isActive ? 1 : 0.95 + (visibilityRatio * 0.05)
  const opacity = isActive ? 1 : 0.7 + (visibilityRatio * 0.3)
  const blur = isActive ? 0 : Math.max(0, 2 - (visibilityRatio * 2))
  
  return (
    <section 
      id={id}
      className={`min-h-screen transition-all duration-700 ease-out ${className}`}
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter'
      }}
    >
      {children}
    </section>
  )
}
