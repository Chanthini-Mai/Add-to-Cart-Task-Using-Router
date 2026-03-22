import ProductList from '../components/ProductList'

const ProductsPage = ({
  products,
  onAddToCart,
  onRemoveFromCart,
  cartProductIds = [],
  loading,
  error,
}) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      ) : (
        <ProductList
          products={products}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          cartProductIds={cartProductIds}
        />
      )}
    </main>
  )
}

export default ProductsPage
