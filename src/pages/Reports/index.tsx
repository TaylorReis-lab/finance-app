import { Box, Typography } from '@mui/material'
import { ReportFilters } from '@/components/forms/ReportFilters'

const Reports = () => {
  const handleFilter = (filters: {
    period: string
    startDate: Date | null
    endDate: Date | null
    category: string
  }) => {
    console.log('Filtros aplicados:', filters)
    // Faça algo com os filtros aqui
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>
      <ReportFilters onFilter={handleFilter} categories={['Alimentação', 'Transporte', 'Moradia']} />
    </Box>
  )
}

export default Reports