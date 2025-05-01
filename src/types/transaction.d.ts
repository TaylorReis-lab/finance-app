interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

interface Category {
  id: string
  name: string
  color: string
}
