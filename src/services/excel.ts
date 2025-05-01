import * as XLSX from 'xlsx'

interface ExcelTransaction {
  Date: string
  Description: string
  Amount: number
  Category: string
}

export const processExcelFile = async (file: File): Promise<ExcelTransaction[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const jsonData = XLSX.utils.sheet_to_json<ExcelTransaction>(workbook.Sheets[workbook.SheetNames[0]])
        resolve(jsonData)
      } catch (error) {
        reject(new Error('Failed to process Excel file'))
      }
    }
    
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsArrayBuffer(file)
  })
}