import { useEffect, useMemo, useState } from 'react'
import { users } from '../mocks/users'
import transactionService from '../services/transactionService'
import transferService from '../services/transferService'
import userService from '../services/userService'
import walletService from '../services/walletService'
import {
  getStoredTransactions,
  getStoredUser,
  setStoredTransactions,
  setStoredUser,
} from '../utils/storage'
import { sortNewestFirst } from '../utils/transactions'
import { validateTransfer } from '../utils/validation'

function getResponseData(response) {
  return response?.data ?? response
}

function getBalanceValue(response) {
  const data = getResponseData(response)

  if (typeof data === 'number') {
    return data
  }

  return data?.balance ?? data?.amount ?? 0
}

function getTransactionsValue(response) {
  const data = getResponseData(response)

  if (Array.isArray(data)) {
    return data
  }

  return data?.transactions ?? data?.items ?? data?.data ?? []
}

function getUserValue(response) {
  const data = getResponseData(response)

  return data?.user ?? data
}

function getResponseMessage(response, fallback) {
  return response?.message || response?.data?.message || fallback
}

function normalizeTransaction(transaction) {
  return {
    ...transaction,
    amount: Number(transaction.amount) || 0,
    createdAt: transaction.createdAt || transaction.created_at || transaction.date || new Date().toISOString(),
    id: String(transaction.id || transaction.identifier || transaction.transaction_id || transaction.reference || ''),
    type: transaction.type || transaction.transaction_type || 'Transfer',
  }
}

function useWallet() {
  const [currentUser, setCurrentUser] = useState(() => getStoredUser())
  const [transactions, setTransactions] = useState(() => getStoredTransactions())
  const [formValues, setFormValues] = useState({
    amount: '',
    recipientId: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function refreshWalletData(user = currentUser) {
    const [balanceResponse, transactionResponse] = await Promise.all([
      walletService.getBalance(),
      transactionService.getTransactions(),
    ])
    const balance = getBalanceValue(balanceResponse)
    const nextUser = {
      ...user,
      balance,
    }
    const nextTransactions = getTransactionsValue(transactionResponse).map(normalizeTransaction)

    setStoredUser(nextUser)
    setStoredTransactions(nextTransactions)
    setCurrentUser(nextUser)
    setTransactions(nextTransactions)

    return nextUser
  }

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      setIsLoading(true)

      try {
        const [userResponse, balanceResponse, transactionResponse] = await Promise.all([
          userService.getAuthenticatedUser(),
          walletService.getBalance(),
          transactionService.getTransactions(),
        ])
        const balance = getBalanceValue(balanceResponse)
        const user = {
          ...getUserValue(userResponse),
          balance,
        }
        const nextTransactions = getTransactionsValue(transactionResponse).map(normalizeTransaction)

        if (!isMounted) {
          return
        }

        setStoredUser(user)
        setStoredTransactions(nextTransactions)
        setCurrentUser(user)
        setTransactions(nextTransactions)
      } catch {
        if (isMounted) {
          setStatusMessage({
            text: 'Unable to load dashboard data. Please try again.',
            type: 'error',
          })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const availableRecipients = useMemo(() => {
    return users.filter((user) => user.id !== currentUser?.id)
  }, [currentUser?.id])

  const currentUserTransactions = useMemo(() => {
    return sortNewestFirst(transactions)
  }, [transactions])


  const updateTransferField = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
    setStatusMessage(null)
  }

  const submitTransfer = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      setStatusMessage({
        text: 'Please sign in again before making a transfer.',
        type: 'error',
      })
      return
    }

    const nextErrors = validateTransfer({
      amount: formValues.amount,
      currentBalance: currentUser.balance,
      recipientId: formValues.recipientId,
      userId: currentUser.id,
    })

    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage({
        text: 'Please fix the highlighted fields.',
        type: 'error',
      })
      return
    }

    const recipient = users.find((user) => user.id === Number(formValues.recipientId))

    if (!recipient) {
      setStatusMessage({
        text: 'Selected recipient was not found.',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await transferService.createTransfer({
        receiver_id: Number(formValues.recipientId),
        amount: Number(formValues.amount),
      })

      await refreshWalletData(currentUser)
      setFormValues({
        amount: '',
        recipientId: '',
      })
      setStatusMessage({
        text: getResponseMessage(response, `Transfer to ${recipient.name} was successful.`),
        type: 'success',
      })
    } catch (error) {
      const message = getResponseMessage(
        error.response?.data,
        'Unable to complete transfer. Please try again.'
      )

      setStatusMessage({
        text: message,
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    availableRecipients,
    currentUser,
    formErrors,
    formValues,
    isLoading,
    isSubmitting,
    statusMessage,
    submitTransfer,
    transactions: currentUserTransactions,
    updateTransferField,
  }
}

export default useWallet
