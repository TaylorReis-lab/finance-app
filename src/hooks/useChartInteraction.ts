import { useState, useCallback } from 'react'

export const useChartInteraction = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent, index: number) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
    setActiveIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  return {
    activeIndex,
    tooltipPos,
    handleMouseMove,
    handleMouseLeave,
    isActive: (index: number) => activeIndex === index || activeIndex === null
  }
}