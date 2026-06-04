function createTransactionSuffix() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function formatDatePart(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}${month}${day}`
}

export function generateTransactionIdentifier(date = new Date()) {
  return `TRX-${formatDatePart(date)}-${createTransactionSuffix()}`
}

export function createTransferTransaction({ amount, currentUser, recipient }) {
  const createdAt = new Date().toISOString()

  return {
    amount: Number(amount),
    createdAt,
    id: generateTransactionIdentifier(new Date(createdAt)),
    recipientEmail: recipient.email,
    recipientId: recipient.id,
    recipientName: recipient.name,
    senderEmail: currentUser.email,
    senderId: currentUser.id,
    senderName: currentUser.name,
    type: 'Transfer',
  }
}

export function sortNewestFirst(transactions) {
  return [...transactions].sort((first, second) => {
    return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  })
}
