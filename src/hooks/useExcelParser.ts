import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Transaction } from '@/types/transaction'

export const useExcelParser = () => {
  const [isParsing, setIsParsing] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)

  const parseExcel = async (file: File): Promise<Transaction[]> => {
    setIsParsing(true)
    setParseError(null)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData =
            XLSX.utils.sheet_to_json<Record<string, any>>(firstSheet)

          const transactions: Transaction[] = jsonData.map((row, index) => {
            // Validação básica dos campos
            if (!row.Date || !row.Description || !row.Amount) {
              throw new Error(
                `Linha ${index + 2}: Campos obrigatórios faltando`
              )
            }

            return {
              id: `imported-${index}-${Date.now()}`,
              date: new Date(row.Date).toISOString(),
              description: row.Description,
              amount: Number(row.Amount),
              category: row.Category || 'Outros',
              type: row.Amount > 0 ? 'income' : 'expense'
            }
          })

          resolve(transactions)
        } catch (error) {
          setParseError(
            error instanceof Error ? error.message : 'Erro desconhecido'
          )
          reject(error)
        } finally {
          setIsParsing(false)
        }
      }

      reader.onerror = () => {
        setParseError('Falha ao ler o arquivo')
        setIsParsing(false)
        reject(new Error('Falha ao ler o arquivo'))
      }

      reader.readAsArrayBuffer(file)
    })
  }

  return {
    parseExcel,
    isParsing,
    parseError,
    resetError: () => setParseError(null)
  }
}
