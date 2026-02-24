import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout, isAuthenticated, hasRole } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home', show: !isAuthenticated },
    { to: '/products', label: 'Products', show: isAuthenticated },
    { to: '/orders', label: 'Orders', show: isAuthenticated },
    { to: '/admin', label: 'Admin', show: isAuthenticated && hasRole('ROLE_ADMIN') },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-400 via-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-rose-400/50 group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-xl sm:text-2xl">S</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold gradient-text">
              ShopEZ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAuthenticated ? (
              <>
                {/* Cart - Mobile & Desktop */}
                <Link to="/cart" className="relative p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cart?.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cart.totalItems > 9 ? '9+' : cart.totalItems}
                    </span>
                  )}
                </Link>

                {/* User Menu - Desktop */}
                <div className="hidden md:block relative group">
                  <button className="flex items-center space-x-2 p-1.5 pr-4 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all duration-200">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">
                        {user?.fullName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl py-3 hidden group-hover:block border border-slate-100 overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-800 truncate">{user?.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-3 text-slate-600 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            ) : (
              <>
                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link to="/login" className="px-5 py-2.5 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-semibold">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm">
                    Register
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4">
            <div className="space-y-2">
              {navLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-600 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
