'use client'

import { useEffect, useState, useCallback } from 'react'

interface SectionInfo {
  id: string
  element: HTMLElement
  isVisible: boolean
  visibilityRatio: number
}

export const useScrollAnimation = (sectionIds: string[]) => {
  const [sections, setSections] = useState<SectionInfo[]>([])
  const [activeSection, setActiveSection] = useState<string>('')

  const updateSections = useCallback(() => {
    const newSections: SectionInfo[] = []
    let maxRatio = 0
    let mostVisibleId = ''

    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementHeight = rect.height
        
        // Calculate visibility ratio
        const visibleTop = Math.max(0, -rect.top)
        const visibleBottom = Math.min(elementHeight, windowHeight - rect.top)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visibilityRatio = visibleHeight / Math.min(elementHeight, windowHeight)
        
        newSections.push({
          id,
          element,
          isVisible: visibilityRatio > 0.1,
          visibilityRatio
        })

        // Find the most visible section
        if (visibilityRatio > maxRatio) {
          maxRatio = visibilityRatio
          mostVisibleId = id
        }
      }
    })

    setSections(newSections)
    setActiveSection(mostVisibleId)
  }, [sectionIds])

  useEffect(() => {
    // Initial check
    updateSections()

    // Add scroll listener with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateSections()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateSections, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateSections)
    }
  }, [updateSections])

  return {
    sections,
    activeSection,
    isSectionActive: (id: string) => activeSection === id,
    getSectionVisibility: (id: string) => {
      const section = sections.find(s => s.id === id)
      return section?.visibilityRatio || 0
    }
  }
}
