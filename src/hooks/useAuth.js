import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { clearAuthStorage, getStoredToken, getStoredUser } from '../utils/storage'

function useAuth() {
  const navigate = useNavigate()
  const token = getStoredToken()
  const user = getStoredUser()

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      clearAuthStorage()
      navigate('/login', { replace: true })
    }
  }

  return {
    isAuthenticated: Boolean(token),
    logout,
    token,
    user,
  }
}

export default useAuth
