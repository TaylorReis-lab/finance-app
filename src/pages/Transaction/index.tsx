import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { TransactionForm } from '../../components/forms/TransactionForm'
import { TransactionList } from '../../components/forms/TransactionList'
import { Transaction } from '@/types/transaction'
import useTransactions from '../../hooks/useTransactions'

const Transactions = () => {
  const [refreshKey, setRefreshKey] = useState(0)
  const { transactions, loading, error } = useTransactions()

  const handleTransactionAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    // Implemente a lógica de edição aqui
    console.log('Editar transação:', transaction)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transações
      </Typography>

      <TransactionForm onSuccess={handleTransactionAdded} />

      {loading ? (
        <Typography>Carregando transações...</Typography>
      ) : error ? (
        <Typography color="error">
          Erro ao carregar transações: {error}
        </Typography>
      ) : (
        <TransactionList
          key={refreshKey}
          transactions={transactions}
          onEdit={handleEditTransaction}
        />
      )}
    </Box>
  )
}

export default Transactions
