import { createContext, useContext, useState, useEffect } from 'react'
import api from '../config/api'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart(null)
    }
  }, [user])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/cart')
      setCart(response.data.data)
    } catch (error) {
      console.error('Failed to fetch cart', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/api/cart/items', { productId, quantity })
      setCart(response.data.data)
      toast.success('Added to cart')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart')
    }
  }

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await api.put(`/api/cart/items/${itemId}?quantity=${quantity}`)
      setCart(response.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart')
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      const response = await api.delete(`/api/cart/items/${itemId}`)
      setCart(response.data.data)
      toast.success('Item removed')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item')
    }
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      fetchCart, 
      addToCart, 
      updateCartItem, 
      removeFromCart 
    }}>
      {children}
    </CartContext.Provider>
  )
}
