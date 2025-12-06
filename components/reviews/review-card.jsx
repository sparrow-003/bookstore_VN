import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ReviewCard({ review }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">{review.userName?.charAt(0) || "U"}</span>
            </div>
            <span className="font-medium text-sm">{review.userName}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{review.comment}</p>
        <p className="text-xs text-muted-foreground mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  )
}
