export function formatRupiah(value) {
  const amount = Number(value) || 0

  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount)
}
