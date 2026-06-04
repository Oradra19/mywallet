import api from './api'

const authService = {
  async login(credentials) {
    const response = await api.post('/login', credentials)

    return response.data
  },

  async logout() {
    const response = await api.post('/logout')

    return response.data
  },
}

export default authService
