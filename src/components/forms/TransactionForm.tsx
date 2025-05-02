import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import Grid from '@material-ui/core/Grid'
import { DateField } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Transaction } from '../../types/transaction'
import { validateTransaction } from '../../utils/validators'
import useTransactions from '../../hooks/useTransactions'
import { formatCurrency } from '../../utils/formatters'
import { formatISO } from 'date-fns'

// Definição de categorias
const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Salário',
  'Investimentos',
  'Outros'
]

// Interface para o componente com a propriedade onSuccess
interface TransactionFormProps {
  onSuccess: () => void;  // Adicionando a propriedade onSuccess
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Transaction>()
  const { addTransaction } = useTransactions()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: Transaction) => {
    setIsSubmitting(true)
    try {
      const validationError = validateTransaction(data)
      if (validationError) {
        throw new Error(validationError)
      }

      // Adiciona a transação
      await addTransaction({
        ...data,
        amount:
          data.type === 'expense'
            ? -Math.abs(data.amount)
            : Math.abs(data.amount)
      })
      reset()  // Reseta o formulário após o envio
      onSuccess()  // Chama a função onSuccess após a transação ser adicionada com sucesso
    } catch (error) {
      console.error('Error adding transaction:', error)
    } finally {
      setIsSubmitting(false)  // Finaliza o estado de submissão
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Adicionar Transação
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Descrição */}
            <Grid item xs={12} md={6}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: 'Descrição é obrigatória' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            {/* Data */}
            <Grid item xs={12} md={6}>
              <Controller
                name="date"
                control={control}
                defaultValue={formatISO(new Date())}
                render={({ field, fieldState: { error } }) => (
                  <DateField
                    label="Data"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(newValue: Date | null) => {
                      field.onChange(newValue ? formatISO(newValue) : '')
                    }}
                    slots={{
                      textField: (params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Tipo (Despesa ou Receita) */}
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                defaultValue="expense"
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="expense" control={<Radio />} label="Despesa" />
                    <FormControlLabel value="income" control={<Radio />} label="Receita" />
                  </RadioGroup>
                )}
              />
            </Grid>

            {/* Valor */}
            <Grid item xs={12} md={6}>
              <Controller
                name="amount"
                control={control}
                defaultValue={0}
                rules={{
                  required: 'Valor é obrigatório',
                  min: { value: 0.01, message: 'Valor deve ser positivo' }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valor"
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>
                    }}
                    onChange={(e) => {
                      const formatted = formatCurrency(Number(e.target.value))
                      field.onChange(formatted)
                    }}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            {/* Categoria */}
            <Grid item xs={12} md={6}>
              <Controller
                name="category"
                control={control}
                defaultValue="Outros"
                render={({ field }) => (
                  <TextField select label="Categoria" fullWidth {...field}>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Botão de envio */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Salvando...' : 'Adicionar Transação'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  )
}
