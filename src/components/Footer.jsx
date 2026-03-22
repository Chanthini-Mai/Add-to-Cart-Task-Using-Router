const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">🛒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ShopHub</h3>
                <p className="text-xs text-gray-400">Premium Shopping</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Shop the best products from the Fake Store API with our elegant e-commerce platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-blue-400 transition-colors" title="Facebook">
                📘
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="Twitter">
                𝕏
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="Instagram">
                📷
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="LinkedIn">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  → Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  → Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  → About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  → Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  → Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  📱 Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  💍 Jewelry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  👔 Men's Clothing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  👗 Women's Clothing
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  ❓ FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  📧 Email Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  📜 Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  🔒 Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors text-sm">
                  🚚 Shipping Info
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-600/20 rounded-lg p-6 mb-8 border border-blue-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">📮 Subscribe to Our Newsletter</h4>
          <p className="text-sm text-gray-400 mb-4">
            Get exclusive deals, product updates, and shopping tips delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Middle Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <p>
              © {currentYear} <span className="text-blue-400 font-semibold">ShopHub</span>. All rights reserved.
            </p>
            <p className="mt-2">
              Designed with ❤️ using React, Tailwind CSS & Vite
            </p>
          </div>

          {/* Payment Methods & Security */}
          <div className="flex flex-col items-start sm:items-end space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">Secure Payments:</span>
              <span className="text-lg">💳 🏦 🔒</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>🔐 SSL Encrypted</span>
              <span>•</span>
              <span>✓ Verified Seller</span>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-400">1000+</p>
              <p className="text-xs text-gray-400">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">50K+</p>
              <p className="text-xs text-gray-400">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">24/7</p>
              <p className="text-xs text-gray-400">Support</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-2xl font-bold text-blue-400">⭐5.0</p>
              <p className="text-xs text-gray-400">Rating</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          <p>
            This is a demo e-commerce application using the{' '}
            <a href="https://fakestoreapi.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Fake Store API
            </a>
            . Not for actual purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
