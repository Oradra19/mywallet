import PropTypes from 'prop-types'

function Pagination({ currentPage, onNextPage, onPreviousPage, pageSize, totalItems, totalPages }) {
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <nav
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      aria-label="Pagination"
    >
      <p className="text-sm text-slate-600">
        Showing {firstItem}-{lastItem} of {totalItems}
      </p>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
          disabled={currentPage <= 1}
          onClick={onPreviousPage}
          type="button"
        >
          Previous
        </button>
        <span className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
          disabled={currentPage >= totalPages}
          onClick={onNextPage}
          type="button"
        >
          Next
        </button>
      </div>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}

export default Pagination
