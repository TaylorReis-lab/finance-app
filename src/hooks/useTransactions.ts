import { useState, useEffect } from 'react'
import api from '@/services/api'
import { Transaction } from '@/types/transaction'

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await api.get('/transactions')
      setTransactions(response.data)
    } catch (err) {
      setError('Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const response = await api.post('/transactions', transaction)
      setTransactions([...transactions, response.data])
    } catch (err) {
      setError('Failed to add transaction')
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`)
      setTransactions(transactions.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete transaction')
    }
  }

  const updateTransaction = async (
    id: string,
    updates: Partial<Transaction>
  ) => {
    try {
      const response = await api.put(`/transactions/${id}`, updates)
      setTransactions(
        transactions.map(t => (t.id === id ? { ...t, ...response.data } : t))
      )
    } catch (err) {
      setError('Failed to update transaction')
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    refetch: fetchTransactions
  }
}

export default useTransactions
