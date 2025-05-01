import { useState, useEffect, useMemo, useCallback } from 'react'
import api from '@/services/api'
import { FinancialData, CategoryData, TrendData } from '@/types/chart'
import { format, subMonths, eachDayOfInterval, isSameMonth } from 'date-fns'

export const useChartData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rawData, setRawData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await api.get('/transactions')
        setRawData(response.data)
      } catch (err) {
        setError('Failed to fetch chart data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const processMonthlyData = useMemo((): FinancialData[] => {
    if (!rawData.length) return []

    const last6Months = Array.from({ length: 6 }, (_, i) =>
      subMonths(new Date(), i)
    ).reverse()

    return last6Months.map(month => {
      const monthTransactions = rawData.filter(t =>
        isSameMonth(new Date(t.date), month)
      )

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        date: month.toISOString(),
        income,
        expenses,
        balance: income - expenses
      }
    })
  }, [rawData])

  const processCategoryData = useCallback(
    (type: 'income' | 'expense'): CategoryData[] => {
      const filtered = rawData.filter(t => t.type === type)
      const total = filtered.reduce((sum, t) => sum + t.amount, 0)

      const byCategory = filtered.reduce((acc, t) => {
        if (!acc[t.category]) {
          acc[t.category] = 0
        }
        acc[t.category] += t.amount
        return acc
      }, {} as Record<string, number>)

      return Object.entries(byCategory as Record<string, number>)
        .map(([name, value]) => ({
          name,
          value,
          percentage: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0
        }))
        .sort((a, b) => b.value - a.value)
    },
    [rawData]
  )

  const processTrendData = useMemo((): TrendData[] => {
    if (!rawData.length) return []

    const last30Days = eachDayOfInterval({
      start: subMonths(new Date(), 1),
      end: new Date()
    })

    return last30Days.map(day => {
      const dayTransactions = rawData.filter(
        t =>
          format(new Date(t.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      )

      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        date: day.toISOString(),
        income,
        expense,
        balance: income - expense
      }
    })
  }, [rawData])

  return {
    loading,
    error,
    monthlyData: processMonthlyData,
    getCategoryData: processCategoryData,
    trendData: processTrendData,
    refetch: () => setLoading(true) // Dispara novo fetch
  }
}
