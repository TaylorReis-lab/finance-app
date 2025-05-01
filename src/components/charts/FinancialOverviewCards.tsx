import { Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const OverviewCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  flex: 1,
  minWidth: 200,
}))

export const FinancialOverviewCards = () => {
  return (
    <Stack direction="row" spacing={3} flexWrap="wrap">
      <OverviewCard>
        <Stack direction="row" alignItems="center" spacing={2}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Total Balance
            </Typography>
            <Typography variant="h5">$12,345.67</Typography>
          </div>
        </Stack>
      </OverviewCard>
      
      <OverviewCard>
        <Stack direction="row" alignItems="center" spacing={2}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Income
            </Typography>
            <Typography variant="h5" color="success.main">
              $8,765.43
            </Typography>
          </div>
        </Stack>
      </OverviewCard>
      
      <OverviewCard>
        <Stack direction="row" alignItems="center" spacing={2}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Expenses
            </Typography>
            <Typography variant="h5" color="error.main">
              $4,567.89
            </Typography>
          </div>
        </Stack>
      </OverviewCard>
    </Stack>
  )
}