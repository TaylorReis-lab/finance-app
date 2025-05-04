import { Suspense } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import {FinancialOverviewCards} from '../../components/charts/FinancialOverviewCards'
import MonthlySummaryChart from '../../components/charts/MonthlySummaryChart'

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      
      <Suspense fallback={<CircularProgress />}>
        <FinancialOverviewCards />
        <MonthlySummaryChart />
      </Suspense>
    </Box>
  )
}

export default Dashboard