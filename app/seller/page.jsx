"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useStats } from "@/hooks/use-stats"
import { useBooks } from "@/hooks/use-books"
import { useOrders } from "@/hooks/use-orders"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, ShoppingCart, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function SellerDashboard() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const { stats, isLoading: statsLoading } = useStats("seller", user?.id)
  const { books, isLoading: booksLoading } = useBooks({ sellerId: user?.id })
  const { orders, isLoading: ordersLoading } = useOrders({ sellerId: user?.id })

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const lowStockBooks = books.filter((b) => b.quantity < 10)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Seller Dashboard" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
            <p className="text-muted-foreground">Here's an overview of your bookstore</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statsLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-16" />
                    </CardContent>
                  </Card>
                ))
            ) : (
              <>
                <StatCard title="My Books" value={stats?.totalBooks || books.length} icon={Book} />
                <StatCard title="Total Orders" value={stats?.totalOrders || orders.length} icon={ShoppingCart} />
                <StatCard title="Total Revenue" value={`$${(stats?.totalRevenue || 0).toFixed(2)}`} icon={DollarSign} />
                <StatCard title="Low Stock" value={stats?.lowStockBooks || lowStockBooks.length} icon={AlertTriangle} />
              </>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="space-y-3">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                  </div>
                ) : recentOrders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground capitalize">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                {booksLoading ? (
                  <div className="space-y-3">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                  </div>
                ) : lowStockBooks.length === 0 ? (
                  <p className="text-muted-foreground text-sm">All books are well stocked</p>
                ) : (
                  <div className="space-y-3">
                    {lowStockBooks.slice(0, 5).map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{book.title}</p>
                          <p className="text-xs text-muted-foreground">{book.author}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-destructive">{book.quantity} left</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
