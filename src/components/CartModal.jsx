import { useState, useEffect, useCallback } from 'react'

const CartModal = ({ cartItems, onRemoveFromCart, onRemoveMultiple, onUpdateQuantity, onClose }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  // Handle checkbox change
  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      setSelectedItems([...selectedItems, itemId])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length && cartItems.length > 0) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
  }

  // Handle remove selected items
  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) return

    onRemoveMultiple(selectedItems)
    setSelectedItems([])
  }
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [handleClose])



  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )
  const discountAmount = subtotal * 0.1
  const totalPrice = subtotal - discountAmount

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{ zIndex: 40 }}
      ></div>

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 50 }}
      >
        <div
          className={`modal-content bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-96 md:max-h-[600px] flex flex-col overflow-hidden transition-all duration-300 ${
            isOpen ? 'scale-100' : 'scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>🛍️</span>
                <span>Shopping Cart</span>
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-blue-800 rounded-full p-2 transition-colors"
              aria-label="Close cart modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body - Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mt-2">
                  Add some products to get started!
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  ← Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Select All Checkbox */}
                <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3 border border-blue-200">
                  <input
                    type="checkbox"
                    id="select-all"
                    checked={
                      selectedItems.length === cartItems.length && cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="select-all" className="flex-1 cursor-pointer text-gray-700 font-semibold">
                    Select All ({selectedItems.length}/{cartItems.length})
                  </label>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-gray-50 rounded-lg p-4 flex gap-4 transition-colors group ${
                      selectedItems.includes(item.id) ? 'bg-blue-50 border-2 border-blue-300' : 'hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`item-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded cursor-pointer mt-2"
                      />
                    </div>

                    {/* Item Image */}
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold transition-colors"
                          title="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const value = Math.max(1, parseInt(e.target.value) || 1)
                            onUpdateQuantity(item.id, value)
                          }}
                          className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                          min="1"
                        />
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-semibold transition-colors"
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total for this item and Remove Button */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-lg font-bold text-blue-600">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all text-sm font-medium"
                        title="Remove from cart"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer - Total and Checkout */}
          {cartItems.length > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4">
              
              {/* Price Breakdown */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-green-600">
                  <span className="font-medium">10% Discount:</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Final Price:
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mb-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Continue Shopping
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>💳</span>
                  <span>Proceed to Checkout</span>
                </button>
              </div>

              {/* Remove Selected Button */}
              {selectedItems.length > 0 && (
                <button
                  onClick={handleRemoveSelected}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Remove Selected ({selectedItems.length})</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartModal
