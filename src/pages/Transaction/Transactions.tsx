import { useState } from 'react'
import { Typography } from '@mui/material'
import { TransactionList } from '../../components/forms/TransactionList'
import { TransactionForm } from '../../components/forms/TransactionForm'
import { Transaction } from '@/types/transaction'

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const handleTransactionAdded = () => {
    // Lógica para atualizar a lista de transações
    // Exemplo: você pode chamar um serviço ou atualizar o estado de alguma forma
    setTransactions(prev => [...prev /* nova transação */])
  }

  const handleEditTransaction = (transaction: Transaction) => {
    // Implemente a lógica de edição de transação aqui
    console.log('Edit transaction:', transaction)
  }

  return (
    <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      {/* Passando onSuccess para o TransactionForm */}
      <TransactionForm onSuccess={handleTransactionAdded} />

      {/* Passando a lista de transações para o TransactionList */}
      <TransactionList
        transactions={transactions}
        onEdit={handleEditTransaction}
      />
    </div>
  )
}

export default Transactions
