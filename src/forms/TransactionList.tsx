import { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material'
import { Transaction } from '@/types/transaction'
import { formatCurrency, formatDate } from '@/utils/formatters'
import useTransactions from '@/hooks/useTransactions'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
}

export const TransactionList = ({
  transactions,
  onEdit
}: TransactionListProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState<keyof Transaction>('date')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const { deleteTransaction } = useTransactions()

  const handleSort = (property: keyof Transaction) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      await deleteTransaction(id)
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1
    return 0
  })

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Data
                </TableSortLabel>
              </TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleSort('category')}
                >
                  Categoria
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'amount'}
                  direction={orderBy === 'amount' ? order : 'asc'}
                  onClick={() => handleSort('amount')}
                >
                  Valor
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {transaction.receiptUrl && (
                        <Tooltip title="Comprovante anexado">
                          <ReceiptIcon color="action" sx={{ mr: 1 }} />
                        </Tooltip>
                      )}
                      {transaction.description}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.category}
                      size="small"
                      color={
                        transaction.type === 'income' ? 'success' : 'error'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color:
                        transaction.type === 'income'
                          ? 'success.main'
                          : 'error.main',
                      fontWeight: 500
                    }}
                  >
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(transaction)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage="Linhas por página:"
      />
    </Paper>
  )
}
