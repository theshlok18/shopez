import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Loading from '../components/Loading'

export default function Cart() {
  const { cart, loading, updateCartItem, removeFromCart } = useCart()

  if (loading) return <Loading />

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center py-12 sm:py-16">
          <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <Link to="/products" className="btn-primary text-sm sm:text-base">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-base sm:text-lg">{item.productName}</h3>
                <p className="text-indigo-600 font-semibold text-sm sm:text-base">${item.price}</p>
                <p className="text-xs sm:text-sm text-gray-500">Stock: {item.availableStock}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 sm:px-4 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.availableStock}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-right sm:text-right">
                  <p className="font-bold text-base sm:text-lg">${item.subtotal.toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-20 sm:top-24 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Items ({cart.totalItems})</span>
                <span className="font-semibold">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 sm:pt-3">
                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span className="text-indigo-600">${cart.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="block w-full btn-primary text-center text-sm sm:text-base py-3">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
