import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ReportFilters from '../../components/forms/ReportFilters'

const Reports = () => {
  const [filters, setFilters] = useState({
    period: 'last30',
    startDate: null,
    endDate: null,
    category: 'all'
  })

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>
      <ReportFilters onFilter={setFilters} categories={['Alimentação', 'Transporte', 'Moradia']} />
    </Box>
  )
}

export default Reports