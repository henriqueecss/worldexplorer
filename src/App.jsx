import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import Favorites from './pages/Favorites'
import CountryDetail from './pages/CountryDetail'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'
import Toast from './components/Toast'

function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/favorites" element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            } />
            <Route path="/country/:cca3" element={
              <PrivateRoute>
                <CountryDetail />
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
        <Toast />
      </FavoritesProvider>
    </ToastProvider>
    </ThemeProvider>
  )
}

export default App