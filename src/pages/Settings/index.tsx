import { Box, Typography, TextField, Button } from '@mui/material'

const Settings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configurações
      </Typography>
      <Box component="form" sx={{ maxWidth: 500 }}>
        <TextField
          label="Nome do Usuário"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
        />
        <Button variant="contained" sx={{ mt: 2 }}>
          Salvar Configurações
        </Button>
      </Box>
    </Box>
  )
}

export default Settings