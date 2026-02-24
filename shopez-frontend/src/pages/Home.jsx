import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeaturedProducts()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/api/products?page=0&size=8')
      setFeaturedProducts(response.data.data.content)
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Animated Gradient */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] warm-gradient flex items-center justify-center overflow-hidden px-4">
        {/* Floating shapes - Hidden on small mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-rose-300/20 rounded-full blur-3xl float" style={{animationDelay: '1s'}}></div>
          <div className="hidden sm:block absolute top-1/2 left-1/3 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 text-white drop-shadow-lg">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
                ShopEZ
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 text-white/90 font-light px-2">
              Your One Stop Shop for Online Purchases
            </p>
            
            {isAuthenticated ? (
              <Link to="/products" className="inline-flex items-center gap-2 bg-white text-rose-500 px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-rose-50 transition-all duration-300 shadow-2xl hover:shadow-rose-500/25 hover:scale-105">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Start Shopping
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-rose-50 transition-all duration-300 shadow-2xl hover:shadow-rose-500/25 hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 hover:scale-105">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features/About Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="section-title mb-4 sm:mb-6">About ShopEZ</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
              ShopEZ is your premier destination for online shopping. We offer a wide range of quality products 
              at competitive prices with fast and reliable delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: 'M5 13l4 4L19 7',
                title: 'Quality Products',
                desc: 'Curated selection of premium products',
                color: 'from-rose-400 to-orange-400'
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Best Prices',
                desc: 'Competitive pricing on all items',
                color: 'from-amber-400 to-yellow-400'
              },
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Fast Delivery',
                desc: 'Quick and reliable shipping',
                color: 'from-teal-400 to-emerald-400'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card-gradient group cursor-pointer p-6 sm:p-8">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 text-center">{feature.title}</h3>
                <p className="text-slate-600 text-center text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Only for authenticated users */}
      {isAuthenticated ? (
        <section className="py-16 sm:py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
                Trending Now
              </span>
              <h2 className="section-title mb-4 sm:mb-6">Featured Products</h2>
              <p className="text-slate-600 max-w-xl mx-auto px-4">
                Discover our handpicked selection of popular items just for you
              </p>
            </div>
            
            {loading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="text-center mt-12 sm:mt-16">
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4">
                View All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Login CTA for non-authenticated users */
        <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-200/30 rounded-full blur-3xl"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              {/* Animated gradient background */}
              <div className="absolute inset-0 sunset-gradient"></div>
              
              {/* Glass overlay */}
              <div className="relative glass p-6 sm:p-10 md:p-16 text-center">
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                    Ready to Start Shopping?
                  </h2>
                  <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                    Join thousands of satisfied customers and discover our amazing collection of products. 
                    Sign in to start your shopping journey today!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-rose-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login to Your Account
                  </Link>
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create New Account
                  </Link>
                </div>
                
                <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-white/80">
                  Try our demo accounts for quick access • No credit card required
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: '10K+', label: 'Products' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '99%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
