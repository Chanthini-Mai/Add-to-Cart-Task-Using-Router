import { useEffect, useState } from 'react'

const Alert = ({ message, type = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [message])

  if (!isVisible) return null

  // Define styles based on type
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-800',
      icon: '✅',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: '❌',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'ℹ️',
    },
  }

  const style = styles[type] || styles.info

  return (
    <div
      className={`alert-toast fixed top-20 right-4 max-w-md ${style.bg} border-2 ${style.border} ${style.text} px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 z-40`}
      role="alert"
    >
      <span className="text-xl">{style.icon}</span>
      <p className="font-semibold">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-lg opacity-70 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  )
}

export default Alert
