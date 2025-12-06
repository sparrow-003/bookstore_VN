"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ReviewForm({ onSubmit, isLoading }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) return
    onSubmit({ rating, comment })
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Your Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          rows={3}
        />
      </div>

      <Button type="submit" disabled={isLoading || rating === 0}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  )
}
