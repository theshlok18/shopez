import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue')
    }
  }, [isAuthenticated])
  
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />
}

function AdminRoute({ children }) {
  const { isAuthenticated, hasRole } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue')
    } else if (!hasRole('ROLE_ADMIN')) {
      toast.error('Access denied: Admin privileges required')
    }
  }, [isAuthenticated, hasRole])
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return hasRole('ROLE_ADMIN') ? children : <Navigate to="/" replace />
}

function ProtectedProductsRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to continue')
    }
  }, [isAuthenticated])
  
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProtectedProductsRoute><Products /></ProtectedProductsRoute>} />
          <Route path="/products/:id" element={<ProtectedProductsRoute><ProductDetails /></ProtectedProductsRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  )
}

export default App
