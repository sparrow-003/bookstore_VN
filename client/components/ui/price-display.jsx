import { Badge } from "@/components/ui/badge"

export function PriceDisplay({ price, originalPrice, size = "md", showDiscount = true }) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0

  const sizeClasses = {
    sm: { price: "text-base", original: "text-xs" },
    md: { price: "text-lg", original: "text-sm" },
    lg: { price: "text-2xl", original: "text-base" },
    xl: { price: "text-3xl", original: "text-lg" },
  }

  const sizes = sizeClasses[size] || sizeClasses.md

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-bold ${sizes.price} text-primary`}>${price.toFixed(2)}</span>
      {originalPrice && originalPrice > price && (
        <>
          <span className={`${sizes.original} text-muted-foreground line-through`}>${originalPrice.toFixed(2)}</span>
          {showDiscount && discount > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discount}%
            </Badge>
          )}
        </>
      )}
    </div>
  )
}
