import { useChartData } from './useChartData'
import { useMemo } from 'react'

export const useCategoryData = (type: 'income' | 'expense') => {
  const { getCategoryData, loading, error, refetch } = useChartData()

  const data = useMemo(() => getCategoryData(type), [getCategoryData, type])

  return {
    data,
    loading,
    error,
    refetch
  }
}
