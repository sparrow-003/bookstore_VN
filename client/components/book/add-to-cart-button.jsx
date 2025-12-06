"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

export function AddToCartButton({ book, size = "default", showText = true, variant = "default" }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleAddToCart}
      disabled={!book.inStock}
      className={added ? "bg-accent text-accent-foreground" : ""}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          {showText && <span className="ml-2">Added!</span>}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          {showText && <span className="ml-2">Add to Cart</span>}
        </>
      )}
    </Button>
  )
}
