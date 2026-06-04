import { Navigate, Outlet } from 'react-router-dom'
import { getStoredToken } from '../utils/storage'

function ProtectedRoute() {
  if (!getStoredToken()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
