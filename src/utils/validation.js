export function validateTransfer({ amount, currentBalance, recipientId, userId }) {
  const errors = {}
  const transferAmount = Number(amount)

  if (!recipientId) {
    errors.recipientId = 'Recipient is required.'
  }

  if (!amount) {
    errors.amount = 'Amount is required.'
  } else if (Number.isNaN(transferAmount) || transferAmount <= 0) {
    errors.amount = 'Amount must be greater than 0.'
  } else if (transferAmount > currentBalance) {
    errors.amount = 'Amount cannot exceed current balance.'
  }

  if (recipientId && Number(recipientId) === Number(userId)) {
    errors.recipientId = 'You cannot transfer to yourself.'
  }

  return errors
}
