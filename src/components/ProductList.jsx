import ProductCard from './ProductCard'

const ProductList = ({ products, onAddToCart, onRemoveFromCart, cartProductIds = [] }) => {
  return (
    <div>
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          🏬 Featured Products
        </h2>
        <p className="text-gray-600">
          Discover {products.length} amazing products from our store
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            isInCart={cartProductIds.includes(product.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      )}
    </div>
  )
}

export default ProductList
