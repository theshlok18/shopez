import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }
    addToCart(product.id)
  }

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="card-gradient overflow-hidden">
        {/* Image Container */}
        <div className="aspect-square overflow-hidden rounded-xl mb-4 relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Stock Badge */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              Only {product.stock} left!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-slate-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Out of stock
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-white font-semibold text-sm">Click to view details</span>
          </div>
        </div>
        
        {/* Content */}
        <h3 className="font-bold text-lg mb-2 text-slate-800 line-clamp-2 group-hover:text-rose-500 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold gradient-text">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-rose-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-rose-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}
