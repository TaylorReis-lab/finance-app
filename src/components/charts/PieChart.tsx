import { useState, useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { CategoryData } from '@/types/chart'
import styles from './ChartStyles.module.css'

const COLORS = [
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
  '#F59E0B',
  '#10B981',
  '#3B82F6'
]

interface PieChartProps {
  data: CategoryData[]
  type: 'income' | 'expense'
}

export const PieChartComponent = ({ data, type }: PieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredData = useMemo(() => {
    return data
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  }, [data])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value, percentage } = payload[0].payload
      return (
        <div className={styles.tooltip}>
          <p>
            <strong>{name}</strong>
          </p>
          <p>
            Valor:{' '}
            {value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
          <p>Percentual: {percentage}%</p>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>
        {type === 'income'
          ? 'Distribuição de Receitas'
          : 'Distribuição de Despesas'}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationDuration={500}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {filteredData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={activeIndex === index ? 2 : 1}
                opacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.6
                }
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry: any, index) => (
              <span style={{ color: '#333', fontSize: '12px' }}>
                {filteredData[index].name}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
