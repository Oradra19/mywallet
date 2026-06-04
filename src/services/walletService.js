import api from './api'

const walletService = {
  async getBalance() {
    const response = await api.get('/balance')

    return response.data
  },
}

export default walletService
