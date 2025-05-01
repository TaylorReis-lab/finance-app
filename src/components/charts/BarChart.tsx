import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { FinancialData } from '@/types/chart'
import { formatCurrency } from '@/utils/formatters'
import styles from './ChartStyles.module.css'
interface BarChartProps {
  data: FinancialData[]
  timeframe: 'monthly' | 'weekly'
}

export const BarChartComponent = ({ data, timeframe }: BarChartProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      name:
        timeframe === 'monthly'
          ? new Date(item.date).toLocaleString('default', { month: 'short' })
          : `Semana ${getWeek(new Date(item.date))}`
    }))
  }, [data, timeframe])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className={styles.tooltip}>
          <p>
            <strong>{data.name}</strong>
          </p>
          <p>Receitas: {formatCurrency(data.income)}</p>
          <p>Despesas: {formatCurrency(data.expenses)}</p>
          <p>Saldo: {formatCurrency(data.balance)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          onMouseMove={state =>
            setActiveIndex(state.activeTooltipIndex || null)
          }
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={value =>
              formatCurrency(value as number).replace('$', '')
            }
            width={90}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="income"
            fill="#10B981"
            radius={[4, 4, 0, 0]}
            onMouseEnter={() => setActiveIndex(null)}
          />
          <Bar
            dataKey="expenses"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            onMouseEnter={() => setActiveIndex(null)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
