// src/components/charts/ChartStyles.ts
import { Theme } from '@mui/material/styles'

export const getBarChartStyle = (theme: Theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
  },
  bars: {
    fill: theme.palette.primary.main,
    '&:hover': {
      fill: theme.palette.primary.dark,
    },
  },
  axis: {
    stroke: theme.palette.custom.lightGray,
    strokeWidth: 1,
  },
  axisLabel: {
    fontSize: 12,
    fill: theme.palette.text.secondary,
  },
  grid: {
    stroke: theme.palette.custom.lightGray,
    strokeDasharray: '3 3',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.custom.lightGray}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
})

export const pieChartColors = [
  '#6366F1', // primary
  '#10B981', // secondary
  '#3B82F6', // info
  '#F59E0B', // warning
  '#EF4444', // error
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
]