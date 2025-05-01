export interface Transaction {
  type: string;
  receiptUrl: any;
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface Category {
  id: string
  name: string
  color: string
}
