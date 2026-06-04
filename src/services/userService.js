import api from './api'

const userService = {
  async getAuthenticatedUser() {
    const response = await api.get('/user')

    return response.data
  },
}

export default userService
