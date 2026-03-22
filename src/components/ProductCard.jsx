import { useState } from 'react'

const ProductCard = ({ product, onAddToCart, onRemoveFromCart, isInCart = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddClick = async () => {
    setIsAdding(true)
    // Simulate button click animation
    setTimeout(() => {
      onAddToCart(product)
      setIsAdding(false)
    }, 300)
  }

  const handleRemoveClick = () => {
    onRemoveFromCart(product.id)
  }

  // Format price
  const formattedPrice = `$${product.price.toFixed(2)}`

  // Truncate title for display
  const displayTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + '...'
      : product.title

  // Truncate description
  const displayDescription =
    product.description.length > 80
      ? product.description.substring(0, 80) + '...'
      : product.description

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      electronics: 'bg-blue-100 text-blue-800',
      jewelery: 'bg-purple-100 text-purple-800',
      'men\'s clothing': 'bg-green-100 text-green-800',
      'women\'s clothing': 'bg-pink-100 text-pink-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div
      className="group rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-56 bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain p-4 transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryColor(
              product.category
            )}`}
          >
            {product.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-yellow-400 rounded-full p-2 flex items-center space-x-1 shadow-md">
          <span className="text-yellow-900 font-bold text-sm">
            ⭐{product.rating?.rate || 'N/A'}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {displayTitle}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {displayDescription}
        </p>

        {/* Rating Count */}
        {product.rating?.count && (
          <p className="text-xs text-gray-500 mb-3">
            ({product.rating.count} reviews)
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price and Button Container */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              {formattedPrice}
            </span>
          </div>

          {/* Add/Remove Button */}
          {isInCart ? (
            <button
              onClick={handleRemoveClick}
              className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center space-x-1 transform bg-red-600 hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-70"
            >
              <span>🗑️</span>
              <span className="hidden sm:inline">Remove</span>
            </button>
          ) : (
            <button
              onClick={handleAddClick}
              disabled={isAdding}
              className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 flex items-center space-x-1 transform ${
                isAdding ? 'bg-green-500 scale-95' : 'bg-blue-600 hover:bg-blue-700'
              } active:scale-95 shadow-md hover:shadow-lg disabled:opacity-70`}
            >
              {isAdding ? (
                <>
                  <span>✓</span>
                  <span>Added</span>
                </>
              ) : (
                <>
                  <span>🛒</span>
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
