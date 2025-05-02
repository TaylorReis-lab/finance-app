import { Box, Typography } from '@mui/material'
import {ImportForm} from '../../components/forms/ImportForm'

const Import = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Importar Dados
      </Typography>
      <ImportForm />
    </Box>
  )
}

export default Import