import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import styles from './Dashboard.module.css'

import { FinancialOverviewCards } from '@/components/charts/FinancialOverviewCards'
import MonthlySummaryChart from '@/components/charts/MonthlySummaryChart'

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Finexa: Painel Financeiro
      </Typography>

      <Grid container spacing={3}>
        <div className={styles.gridContainer}>
          <FinancialOverviewCards />
        </div>

        <div className={styles.gridContainer}>
          <MonthlySummaryChart />
        </div>

      </Grid>
    </Container>
  )
}

export default Dashboard
