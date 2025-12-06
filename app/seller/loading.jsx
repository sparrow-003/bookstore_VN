import { Skeleton } from "@/components/ui/skeleton"

export default function SellerLoading() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="w-64 bg-card border-r border-border min-h-screen">
        <div className="p-6">
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="flex-1 p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
      </div>
    </div>
  )
}
