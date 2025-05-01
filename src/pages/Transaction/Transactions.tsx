import { Typography } from '@mui/material'
import {TransactionList} from '../../components/forms/TransactionList'
import { TransactionForm } from '../../components/forms/TransactionForm'
import { Transaction } from '@/types/transaction'

const Transactions = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <TransactionForm />
      <TransactionList transactions={[]} onEdit={function (transaction: Transaction): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}

export default Transactions