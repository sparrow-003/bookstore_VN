import { Star, StarHalf } from "lucide-react"

export function RatingStars({ rating, size = "sm", showValue = true, reviewCount }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const iconSize = sizeClasses[size] || sizeClasses.sm

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${iconSize} fill-yellow-400 text-yellow-400`} />
        ))}
        {hasHalfStar && <StarHalf className={`${iconSize} fill-yellow-400 text-yellow-400`} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${iconSize} text-muted-foreground/30`} />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
