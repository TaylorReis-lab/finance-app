import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from 'recharts'
import { TrendData } from '@/types/chart'
import { formatCurrency } from '@/utils/formatters'
import styles from './ChartStyles.module.css'

interface LineChartProps {
  data: TrendData[]
  showBrush?: boolean
}

export const LineChartComponent = ({
  data,
  showBrush = true
}: LineChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className={styles.tooltip}>
          <p>
            <strong>{data.date}</strong>
          </p>
          <p style={{ color: '#10B981' }}>
            Receita: {formatCurrency(data.income)}
          </p>
          <p style={{ color: '#EF4444' }}>
            Despesa: {formatCurrency(data.expense)}
          </p>
          <p style={{ color: '#3B82F6' }}>
            Saldo: {formatCurrency(data.balance)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          onMouseMove={state =>
            setActiveIndex(state.activeTooltipIndex || null)
          }
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={value => new Date(value).toLocaleDateString('pt-BR')}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={value =>
              formatCurrency(value as number).replace('$', '')
            }
            width={90}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#8884d8" />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: activeIndex === null ? 3 : 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: activeIndex === null ? 3 : 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: activeIndex === null ? 4 : 0 }}
            activeDot={{ r: 8 }}
          />
          {showBrush && (
            <Brush
              dataKey="date"
              height={30}
              stroke="#8884d8"
              tickFormatter={value =>
                new Date(value).toLocaleDateString('pt-BR')
              }
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
