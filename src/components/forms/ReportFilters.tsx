import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider  
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { subMonths } from 'date-fns'

interface ReportFiltersProps {
  onFilter: (filters: {
    period: string
    startDate: Date | null
    endDate: Date | null
    category: string
  }) => void
  categories: string[]
}

export const ReportFilters = ({ onFilter, categories }: ReportFiltersProps) => {
  const [period, setPeriod] = useState('last30')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handlePeriodChange = (value: string) => {
    setPeriod(value)
    let newStartDate = null
    let newEndDate = new Date()

    switch (value) {
      case 'last30':
        newStartDate = subMonths(new Date(), 1)
        break
      case 'last90':
        newStartDate = subMonths(new Date(), 3)
        break
      case 'thisYear':
        newStartDate = new Date(new Date().getFullYear(), 0, 1)
        break
      case 'custom':
        // Mantém as datas customizadas
        return
      default:
        break
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const handleSubmit = () => {
    onFilter({
      period,
      startDate,
      endDate,
      category: selectedCategory
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filtros do Relatório
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={period}
              label="Período"
              onChange={e => handlePeriodChange(e.target.value)}
            >
              <MenuItem value="last30">Últimos 30 dias</MenuItem>
              <MenuItem value="last90">Últimos 90 dias</MenuItem>
              <MenuItem value="thisYear">Este ano</MenuItem>
              <MenuItem value="custom">Personalizado</MenuItem>
            </Select>
          </FormControl>

          {period === 'custom' && (
            <>
              <DatePicker
                label="Data inicial"
                value={startDate}
                onChange={newValue => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
              <DatePicker
                label="Data final"
                value={endDate}
                onChange={newValue => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </>
          )}

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Categoria</InputLabel>
            <Select
              value={selectedCategory}
              label="Categoria"
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">Todas</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={period === 'custom' && (!startDate || !endDate)}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  )
}