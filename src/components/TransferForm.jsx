import PropTypes from 'prop-types'
import Button from './ui/Button'
import Input from './ui/Input'

function TransferForm({
  amount,
  errors = {},
  isSubmitting = false,
  onChange,
  onSubmit,
  recipients = [],
  recipientId,
  statusMessage,
}) {
  const recipientMessageId = errors.recipientId ? 'recipientId-message' : undefined

  return (
    <form className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm" onSubmit={onSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Transfer Funds</h2>
        <p className="mt-1 text-sm text-slate-600">Send money to another mock wallet user.</p>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700" htmlFor="recipientId">
          Recipient
        </label>
        <select
          aria-describedby={recipientMessageId}
          aria-invalid={Boolean(errors.recipientId)}
          className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:ring-2 ${
            errors.recipientId
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-slate-900 focus:ring-slate-100'
          }`}
          id="recipientId"
          name="recipientId"
          onChange={onChange}
          value={recipientId}
        >
          <option value="">Select recipient</option>
          {recipients.map((recipient) => (
            <option key={recipient.id} value={recipient.id}>
              {recipient.name} - {recipient.email}
            </option>
          ))}
        </select>
        {errors.recipientId ? (
          <p className="text-sm text-red-600" id="recipientId-message">
            {errors.recipientId}
          </p>
        ) : null}
      </div>

      <Input
        error={errors.amount}
        id="amount"
        label="Amount"
        min="1"
        name="amount"
        onChange={onChange}
        placeholder="0"
        type="number"
        value={amount}
      />

      {statusMessage ? (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {statusMessage.text}
        </p>
      ) : null}

      <Button isLoading={isSubmitting} type="submit">
        {isSubmitting ? 'Processing transfer' : 'Submit transfer'}
      </Button>
    </form>
  )
}

TransferForm.propTypes = {
  amount: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    amount: PropTypes.string,
    recipientId: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  recipientId: PropTypes.string.isRequired,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  statusMessage: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'success']).isRequired,
  }),
}

export default TransferForm
