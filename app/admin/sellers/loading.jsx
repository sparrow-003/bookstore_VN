import { Skeleton } from "@/components/ui/skeleton"

export default function AdminSellersLoading() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="w-64 bg-card border-r border-border min-h-screen">
        <div className="p-6">
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
      <div className="flex-1 p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}
