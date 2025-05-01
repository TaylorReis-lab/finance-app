// import { Button, Typography, Box } from '@mui/material'
// import { Upload as UploadIcon } from '@mui/icons-material'

// interface FileUploadProps {
//   accept: string
//   onFileChange: (file: File) => void
//   id: string
// }

// export const FileUpload = ({ accept, onFileChange, id }: FileUploadProps) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileChange(e.target.files[0])
//     }
//   }

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       <Button
//         component="label"
//         variant="outlined"
//         startIcon={<UploadIcon />}
//       >
//         Selecionar Arquivo
//         <input
//           id={id}
//           type="file"
//           hidden
//           accept={accept}
//           onChange={handleChange}
//         />
//       </Button>
//       <Typography variant="body2">
//         {document.querySelector(`#${id}`)?.value?.split('\\').pop() || 'Nenhum arquivo selecionado'}
//       </Typography>
//     </Box>
//   )
// }