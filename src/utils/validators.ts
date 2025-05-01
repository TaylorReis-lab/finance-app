export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validateTransaction = (transaction: {
  amount: number
  date: string
  description: string
}): string | null => {
  if (!transaction.amount || transaction.amount <= 0) {
    return 'Amount must be greater than 0'
  }
  if (!transaction.date) {
    return 'Date is required'
  }
  if (!transaction.description || transaction.description.trim().length < 3) {
    return 'Description must be at least 3 characters'
  }
  return null
}
