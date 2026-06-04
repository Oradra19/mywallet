import api from './api'

const transferService = {
  async createTransfer(payload) {
    const response = await api.post('/transfer', payload)

    return response.data
  },
}

export default transferService
