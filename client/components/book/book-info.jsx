import Link from "next/link"
import { RatingStars } from "@/client/components/ui/rating-stars"
import { PriceDisplay } from "@/client/components/ui/price-display"

export function BookInfo({ book, showRating = true, showPrice = true, titleSize = "md" }) {
  const titleSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  return (
    <div className="space-y-2">
      <Link href={`/books/${book.id}`}>
        <h3
          className={`font-serif font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors ${titleSizeClasses[titleSize]}`}
        >
          {book.title}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground">{book.author}</p>
      {showRating && <RatingStars rating={book.rating} reviewCount={book.reviewCount || book.reviews} size="sm" />}
      {showPrice && <PriceDisplay price={book.price} originalPrice={book.originalPrice} size="sm" />}
    </div>
  )
}
