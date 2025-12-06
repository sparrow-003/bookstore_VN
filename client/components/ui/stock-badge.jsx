import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function StockBadge({ inStock, quantity }) {
  if (!inStock || quantity === 0) {
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        Out of Stock
      </Badge>
    )
  }

  if (quantity < 10) {
    return (
      <Badge variant="outline" className="gap-1 border-yellow-500 text-yellow-600">
        <AlertCircle className="h-3 w-3" />
        Only {quantity} left
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="gap-1 border-accent text-accent">
      <CheckCircle className="h-3 w-3" />
      In Stock
    </Badge>
  )
}
