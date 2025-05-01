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
  Radio,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants
} from '@mui/material'
import Grid from '@material-ui/core/Grid'
import { DateField } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Transaction } from '@/types/transaction'
import { validateTransaction } from '@/utils/validators'
import useTransactions from '@/hooks/useTransactions'
import { formatCurrency } from '@/utils/formatters'
import { formatISO } from 'date-fns'
import { JSX } from 'react/jsx-runtime'

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

export const TransactionForm = () => {
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

      await addTransaction({
        ...data,
        amount:
          data.type === 'expense'
            ? -Math.abs(data.amount)
            : Math.abs(data.amount)
      })
      reset()
    } catch (error) {
      console.error('Error adding transaction:', error)
    } finally {
      setIsSubmitting(false)
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
                      textField: (
                        params: JSX.IntrinsicAttributes & {
                          variant?: TextFieldVariants | undefined
                        } & Omit<
                            | OutlinedTextFieldProps
                            | FilledTextFieldProps
                            | StandardTextFieldProps,
                            'variant'
                          >
                      ) => (
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

            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                defaultValue="expense"
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="expense"
                      control={<Radio />}
                      label="Despesa"
                    />
                    <FormControlLabel
                      value="income"
                      control={<Radio />}
                      label="Receita"
                    />
                  </RadioGroup>
                )}
              />
            </Grid>

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
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      )
                    }}
                    onChange={e => {
                      const formatted = formatCurrency(Number(e.target.value))
                      field.onChange(formatted)
                    }}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="category"
                control={control}
                defaultValue="Outros"
                render={({ field }) => (
                  <TextField select label="Categoria" fullWidth {...field}>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

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
