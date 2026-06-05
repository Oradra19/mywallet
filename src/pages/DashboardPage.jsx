import BalanceCard from '../components/BalanceCard'
import LoadingSpinner from '../components/LoadingSpinner'
import Pagination from '../components/Pagination'
import TransactionTable from '../components/TransactionTable'
import TransferConfirmationModal from '../components/TransferConfirmationModal'
import TransferForm from '../components/TransferForm'
import useAuth from '../hooks/useAuth'
import useTransactions from '../hooks/useTransactions'
import useWallet from '../hooks/useWallet'

const PAGE_SIZE = 5

function DashboardPage() {
  const { logout } = useAuth()

  const {
    availableRecipients,
    currentUser,
    formErrors,
    formValues,
    isLoading,
    isSubmitting,
    statusMessage,
    submitTransfer,
    confirmTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    transactions,
    updateTransferField,
  } = useWallet()

  const {
    currentPage,
    goToNextPage,
    goToPreviousPage,
    pageSize,
    paginatedTransactions,
    totalItems,
    totalPages,
  } = useTransactions(transactions, PAGE_SIZE)

  const selectedRecipient = availableRecipients.find(
    (user) => user.id === Number(formValues.recipientId)
  )

  if (isLoading || !currentUser) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <LoadingSpinner label="Loading wallet" />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Wallet Overview
            </p>

            <h1 className="mt-1 text-2xl font-semibold text-slate-950">
              Welcome, {currentUser.name}
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              {currentUser.email}
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            onClick={logout}
            type="button"
          >
            Logout
          </button>
        </header>

        <BalanceCard
          balance={currentUser.balance}
          email={currentUser.email}
          name={currentUser.name}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <div className="space-y-4">
            <TransactionTable
              currentUser={currentUser}
              transactions={paginatedTransactions}
            />

            <Pagination
              currentPage={currentPage}
              onNextPage={goToNextPage}
              onPreviousPage={goToPreviousPage}
              pageSize={pageSize}
              totalItems={totalItems}
              totalPages={totalPages}
            />
          </div>

          <TransferForm
            amount={formValues.amount}
            errors={formErrors}
            isSubmitting={isSubmitting}
            onChange={updateTransferField}
            onSubmit={submitTransfer}
            recipientId={formValues.recipientId}
            recipients={availableRecipients}
            statusMessage={statusMessage}
          />
        </section>
      </div>

      <TransferConfirmationModal
        amount={formValues.amount}
        isOpen={isConfirmModalOpen}
        isSubmitting={isSubmitting}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmTransfer}
        recipient={selectedRecipient}
      />
    </>
  )
}

export default DashboardPage