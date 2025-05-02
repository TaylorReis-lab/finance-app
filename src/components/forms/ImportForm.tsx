import { useState } from 'react'
import {
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material'
import { Upload as UploadIcon, Close as CloseIcon } from '@mui/icons-material'
import { useExcelParser } from '../../hooks/useExcelParser'
import useTransactions from '../../hooks/useTransactions'

export const ImportForm = () => {
  const { parseExcel, isParsing, parseError, resetError } = useExcelParser()
  const { addBulkTransactions } = useTransactions()
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      resetError()
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    try {
      const transactions = await parseExcel(file)
      await addBulkTransactions(transactions)
      setFile(null)
      // Reset file input
      const fileInput = document.getElementById(
        'excel-upload'
      ) as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Import error:', error)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Importar Transações
      </Typography>

      {parseError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <IconButton size="small" color="inherit" onClick={resetError}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {parseError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button component="label" variant="outlined" startIcon={<UploadIcon />}>
          Selecionar Arquivo
          <input
            id="excel-upload"
            type="file"
            hidden
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
          />
        </Button>

        <Typography variant="body2">
          {file ? file.name : 'Nenhum arquivo selecionado'}
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Formatos suportados: .xlsx, .xls, .csv
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estrutura esperada: Data, Descrição, Valor, Categoria
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!file || isParsing}
        startIcon={isParsing ? <CircularProgress size={20} /> : null}
        sx={{ mt: 3 }}
      >
        {isParsing ? 'Processando...' : 'Importar Transações'}
      </Button>
    </Paper>
  )
}
