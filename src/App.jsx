import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Favorites from './pages/Favorites'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App