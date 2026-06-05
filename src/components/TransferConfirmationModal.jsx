import PropTypes from 'prop-types'

function TransferConfirmationModal({
  isOpen,
  recipient,
  amount,
  isSubmitting,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null

  const formattedAmount = new Intl.NumberFormat('id-ID').format(
    Number(String(amount).replace(/\./g, '') || 0)
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-slate-900">
          Confirm Transfer
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Please review the transfer details below.
        </p>

        <div className="mt-5 space-y-4 rounded-lg bg-slate-50 p-4">
          <div>
            <p className="text-xs text-slate-500">Recipient</p>
            <p className="font-medium">{recipient?.name}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p>{recipient?.email}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Amount</p>
            <p className="text-lg font-bold">
              Rp {formattedAmount}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
          >
            {isSubmitting
              ? 'Processing...'
              : 'Confirm Transfer'}
          </button>
        </div>
      </div>
    </div>
  )
}

TransferConfirmationModal.propTypes = {
  amount: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  recipient: PropTypes.object,
}

export default TransferConfirmationModal