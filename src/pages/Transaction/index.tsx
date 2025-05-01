import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import {TransactionForm} from '@/components/forms/TransactionForm'
import {TransactionList} from '@/components/forms/TransactionList'
import { Transaction } from '@/types/transaction'

const Transactions = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTransactionAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transações
      </Typography>
      <TransactionForm onSuccess={handleTransactionAdded} />
      <TransactionList key={refreshKey} transactions={[]} onEdit={function (transaction: Transaction): void {
              throw new Error('Function not implemented.')
          } } />
    </Box>
  )
}

export default Transactions