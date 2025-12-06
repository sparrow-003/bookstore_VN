import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function BookImage({ src, alt, discount, aspectRatio = "3/4", className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className}`} style={{ aspectRatio }}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300"
      />
      {discount && discount > 0 && (
        <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">-{discount}%</Badge>
      )}
    </div>
  )
}
