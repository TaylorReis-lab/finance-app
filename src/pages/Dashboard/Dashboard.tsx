import { Grid, Typography } from '@mui/material'
import FinancialOverviewCards from '@/components/charts/FinancialOverviewCards'
import MonthlySummaryChart from '@/components/charts/MonthlySummaryChart'
import ExpensePieChart from '@/components/charts/ExpensePieChart'
import RecentTransactions from '@/components/charts/RecentTransactions'

const Dashboard = () => {
  return (
    <Grid container spacing={3} p={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Financial Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <FinancialOverviewCards />
      </Grid>
      
      <Grid item xs={12} md={8}>
        <MonthlySummaryChart />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <ExpensePieChart />
      </Grid>
      
      <Grid item xs={12}>
        <RecentTransactions />
      </Grid>
    </Grid>
  )
}

export default Dashboard