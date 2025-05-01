import { useChartData } from './useChartData'

export const useTrendData = () => {
  const { trendData, loading, error, refetch } = useChartData()
  
  return {
    data: trendData,
    loading,
    error,
    refetch
  }
}