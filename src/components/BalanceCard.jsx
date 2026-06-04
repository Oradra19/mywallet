import PropTypes from 'prop-types'
import { formatRupiah } from '../utils/currency'

function BalanceCard({ balance, email, name }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Available Balance</p>
          <p className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            {formatRupiah(balance)}
          </p>
        </div>

        <div className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
          <p className="truncate font-medium text-slate-900">{name}</p>
          <p className="mt-0.5 truncate text-slate-500">{email}</p>
        </div>
      </div>
    </section>
  )
}

BalanceCard.propTypes = {
  balance: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default BalanceCard
