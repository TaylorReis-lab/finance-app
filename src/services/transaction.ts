// import api from './api'
// import { Transaction } from '@/types/transaction'

// export const TransactionService = {
//   async getAll(): Promise<Transaction[]> {
//     const response = await api.get('/transactions')
//     return response.data
//   },
  
//   async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
//     const response = await api.post('/transactions', transaction)
//     return response.data
//   },
  
//   async delete(id: string): Promise<void> {
//     await api.delete(`/transactions/${id}`)
//   },
  
//   async update(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
//     const response = await api.put(`/transactions/${id}`, transaction)
//     return response.data
//   }
// // 