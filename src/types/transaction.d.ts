export interface Transaction {
  type: string;
  receiptUrl: any;
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  receiptUrl?: string 
}

interface Category {
  id: string
  name: string
  color: string
}

interface TransactionHook {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>
  refetch: () => Promise<void>
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}