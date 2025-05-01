import { Typography } from '@mui/material'
import TransactionList from '@/components/forms/TransactionList'
import TransactionForm from '@/components/forms/TransactionForm'

const Transactions = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <TransactionForm />
      <TransactionList />
    </div>
  )
}

export default Transactions