import { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import { 
  MonthlySummaryChart, 
  ExpensePieChart, 
  RecentTransactions,
  FinancialOverviewCards
} from '../components/charts'
import { fetchDashboardData } from '../services/api'

/* This code snippet is a TypeScript React component for a financial dashboard.
Here's a breakdown of what it does: */
interface DashboardData {
  monthlySummary: Array<{ month: string; income: number; expense: number }>
  categories: Array<{ name: string; value: number }>
  recentTransactions: Array<Transaction>
  totals: { income: number; expense: number; balance: number }
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData()
        setData(response.data)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <MonthlySummaryChart data={data?.monthlySummary || []} />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <ExpensePieChart data={data?.categories || []} />
      </Grid>
      
      <Grid item xs={12}>
        <FinancialOverviewCards 
          income={data?.totals.income || 0} 
          expense={data?.totals.expense || 0} 
          balance={data?.totals.balance || 0} 
        />
      </Grid>
      
      <Grid item xs={12}>
        <RecentTransactions transactions={data?.recentTransactions || []} />
      </Grid>
    </Grid>
  )
}