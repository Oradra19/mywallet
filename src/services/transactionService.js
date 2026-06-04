import api from './api'

const transactionService = {
  async getTransactions() {
    const response = await api.get('/transactions')

    return response.data
  },
}

export default transactionService
