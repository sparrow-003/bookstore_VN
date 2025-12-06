"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"

export function WishlistButton({ bookId, size = "icon", variant = "outline" }) {
  const { user, isAuthenticated } = useAuth()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      // Could redirect to login or show toast
      return
    }

    setIsLoading(true)
    try {
      if (isWishlisted) {
        await fetch(`/api/wishlist?userId=${user.id}&bookId=${bookId}`, { method: "DELETE" })
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, bookId }),
        })
      }
      setIsWishlisted(!isWishlisted)
    } catch (error) {
      console.error("Failed to update wishlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className="bg-transparent"
    >
      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
    </Button>
  )
}
