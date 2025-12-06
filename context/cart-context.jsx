"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("bookstore-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookstore-cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id)
      if (existing) {
        return prev.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...book, quantity: 1 }]
    })
  }

  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId))
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === bookId ? { ...item, quantity } : item)))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
