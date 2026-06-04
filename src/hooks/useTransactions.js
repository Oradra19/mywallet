import { useEffect, useMemo, useState } from 'react'

function useTransactions(transactions = [], pageSize = 5) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize))

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize

    return transactions.slice(startIndex, startIndex + pageSize)
  }, [currentPage, pageSize, transactions])

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

  return {
    currentPage,
    goToNextPage: () => setCurrentPage((page) => Math.min(page + 1, totalPages)),
    goToPreviousPage: () => setCurrentPage((page) => Math.max(page - 1, 1)),
    pageSize,
    paginatedTransactions,
    totalItems: transactions.length,
    totalPages,
  }
}

export default useTransactions
