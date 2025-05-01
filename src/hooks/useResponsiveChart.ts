import { useState, useEffect } from 'react'

export const useResponsiveChart = (defaultDimensions = { width: 600, height: 400 }) => {
  const [dimensions, setDimensions] = useState(defaultDimensions)
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef) return

    const updateDimensions = () => {
      if (containerRef) {
        setDimensions({
          width: containerRef.offsetWidth,
          height: Math.min(containerRef.offsetWidth * 0.66, 500)
        })
      }
    }

    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef)

    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return {
    dimensions,
    setContainerRef
  }
}