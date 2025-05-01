import { CircularProgress, Box } from '@mui/material'

interface LoadingProps {
  fullScreen?: boolean
}

const Loading = ({ fullScreen = false }: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={fullScreen ? '100vh' : 'auto'}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading