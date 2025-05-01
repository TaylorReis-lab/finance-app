import { Transaction } from '@/types/transaction';

export interface FinancialData {
  date: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

export interface TrendData {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export interface ChartHookResponse<T> {
  data: T
  loading: boolean
  error: string | null
  refetch: () => void
}

export interface ExcelParserHook {
  parseExcel: (file: File) => Promise<Transaction[]>
  isParsing: boolean
  parseError: string | null
  resetError: () => void
}

export interface ChartInteractionHook {
  activeIndex: number | null
  tooltipPos: { x: number; y: number }
  handleMouseMove: (e: React.MouseEvent, index: number) => void
  handleMouseLeave: () => void
  isActive: (index: number) => boolean
}

export interface ResponsiveChartHook {
  dimensions: { width: number; height: number }
  setContainerRef: (ref: HTMLDivElement | null) => void
}