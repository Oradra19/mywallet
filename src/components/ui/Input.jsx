import PropTypes from 'prop-types'

function Input({ error, helpText, id, label, ...props }) {
  const message = error || helpText
  const messageId = message ? `${id}-message` : undefined

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={messageId}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-300 focus:border-slate-900 focus:ring-slate-100'
        }`}
        id={id}
        {...props}
      />
      {message ? (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-slate-500'}`} id={messageId}>
          {message}
        </p>
      ) : null}
    </div>
  )
}

Input.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default Input
