import { useState } from 'react'
import { Link } from 'react-router-dom'

const CartPage = ({
  cartItems,
  onRemoveFromCart,
  onRemoveMultiple,
  onUpdateQuantity,
}) => {
  const [selectedItems, setSelectedItems] = useState([])

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

  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )
  const discountAmount = subtotal * 0.1
  const totalPrice = subtotal - discountAmount

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center space-x-2">
          <span>🛍️</span>
          <span>Shopping Cart</span>
        </h1>
        <p className="text-gray-600 mt-2">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mt-2 text-lg">
            Add some products to get started!
          </p>
          <Link
            to="/"
            className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            ← Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
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

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg p-4 flex gap-4 transition-colors border-2 shadow-sm ${
                    selectedItems.includes(item.id) ? 'bg-blue-50 border-blue-300' : 'hover:shadow-md border-gray-200'
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
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 line-clamp-2">
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

            {/* Remove Selected Button */}
            {selectedItems.length > 0 && (
              <button
                onClick={handleRemoveSelected}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>🗑️</span>
                <span>Remove Selected ({selectedItems.length})</span>
              </button>
            )}
          </div>

          {/* Price Summary */}
          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-300"></div>

                <div className="flex justify-between items-center text-green-600">
                  <span className="font-medium">10% Discount:</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Final Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/"
                  className="px-4 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
                <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>💳</span>
                  <span>Proceed to Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CartPage
