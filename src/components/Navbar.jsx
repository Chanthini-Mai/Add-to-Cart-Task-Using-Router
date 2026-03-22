import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-blue-600">🛒</span>
            </div>
            <div>
              <h1
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-blue-600' : 'text-white'
                }`}
              >
                ShopHub
              </h1>
              <p
                className={`text-xs transition-colors ${
                  isScrolled ? 'text-gray-500' : 'text-blue-100'
                }`}
              >
                Premium Shopping
              </p>
            </div>
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className={`relative px-6 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 ${
              isScrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
            }`}
          >
            <span className="text-xl">🛍️</span>
            <span>Cart</span>

            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span
                className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-red-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className={`h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      }`}></div>
    </nav>
  )
}

export default Navbar
