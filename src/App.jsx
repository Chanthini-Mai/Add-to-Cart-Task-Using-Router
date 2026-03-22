import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import Alert from './components/Alert'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  const [error, setError] = useState(null)

  // Fetch products from Fake Store API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
        setAlert({
          message: 'Failed to load products',
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setAlert({
        message: 'Item already added to the cart',
        type: 'warning',
      })
      return
    }

    setCart([...cart, { ...product, quantity: 1 }])
    setAlert({
      message: `${product.title.substring(0, 30)}... added to cart!`,
      type: 'success',
    })

    // Auto-dismiss alert after 3 seconds
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  // Remove from cart handler
  const handleRemoveFromCart = (productId) => {
    const product = cart.find((item) => item.id === productId)
    setCart(cart.filter((item) => item.id !== productId))
    setAlert({
      message: `${product?.title.substring(0, 30)}... removed from cart`,
      type: 'info',
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  // Remove multiple items from cart handler
  const handleRemoveMultipleFromCart = (productIds) => {
    const productsToRemove = cart.filter((item) => productIds.includes(item.id))
    const newCart = cart.filter((item) => !productIds.includes(item.id))
    setCart(newCart)

    const count = productsToRemove.length
    setAlert({
      message: `${count} item${count !== 1 ? 's' : ''} removed from cart`,
      type: 'info',
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  // Update quantity handler
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }

    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Get cart product IDs for tracking
  const cartProductIds = cart.map((item) => item.id)

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar cartCount={cart.length} />

        {alert && <Alert message={alert.message} type={alert.type} />}

        <Routes>
          <Route
            path="/"
            element={
              <ProductsPage
                products={products}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                cartProductIds={cartProductIds}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onRemoveMultiple={handleRemoveMultipleFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
