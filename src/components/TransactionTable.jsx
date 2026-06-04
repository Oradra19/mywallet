import PropTypes from 'prop-types'
import { formatRupiah } from '../utils/currency'

function getTransactionDisplay(transaction, currentUser) {
  const isIncoming = Number(transaction.receiver_id) === Number(currentUser?.id)
  const isOutgoing = Number(transaction.sender_id) === Number(currentUser?.id)

  if (isIncoming) {
    return {
      amount: `+ ${formatRupiah(transaction.amount)}`,
      counterparty: transaction.sender_name || '-',
      type: 'Incoming Transfer',
    }
  }

  if (isOutgoing) {
    return {
      amount: `- ${formatRupiah(transaction.amount)}`,
      counterparty: transaction.receiver_name || '-',
      type: 'Outgoing Transfer',
    }
  }

  return {
    amount: formatRupiah(transaction.amount),
    counterparty: '-',
    type: transaction.type || '-',
  }
}

function TransactionTable({ currentUser, transactions = [] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Transaction History</h2>
          <p className="text-sm text-slate-600">Recent wallet activity</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Transaction Code</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Counterparty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const transactionDisplay = getTransactionDisplay(transaction, currentUser)

                return (
                  <tr className="text-slate-700" key={transaction.id || transaction.transaction_code}>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-slate-900">
                      {transaction.transaction_code || '-'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {new Date(transaction.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{transactionDisplay.type}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-slate-950">
                      {transactionDisplay.amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{transactionDisplay.counterparty}</td>
                    
                  </tr>
                )
              })
            ) : (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="5">
                  Transactions will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

TransactionTable.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      receiver_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      receiver_name: PropTypes.string,
      sender_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sender_name: PropTypes.string,
      transaction_code: PropTypes.string,
      type: PropTypes.string.isRequired,
    })
  ),
}

export default TransactionTable
