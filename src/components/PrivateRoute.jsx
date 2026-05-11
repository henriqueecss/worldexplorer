import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'

function PrivateRoute({ children }) {
  const user = getCurrentUser()
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute