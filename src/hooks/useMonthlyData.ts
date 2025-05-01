import { useChartData } from './useChartData'

export const useMonthlyData = () => {
  const { monthlyData, loading, error, refetch } = useChartData()
  
  return {
    data: monthlyData,
    loading,
    error,
    refetch
  }
}
