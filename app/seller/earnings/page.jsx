"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useStats } from "@/hooks/use-stats"
import { useOrders } from "@/hooks/use-orders"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, ShoppingCart, Calendar } from "lucide-react"

export default function SellerEarningsPage() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { stats, isLoading: statsLoading } = useStats("seller", user?.id)
  const { orders, isLoading: ordersLoading } = useOrders({ sellerId: user?.id })

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller/earnings")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const completedOrders = orders.filter((o) => o.status === "delivered")
  const totalEarnings = completedOrders.reduce((sum, o) => sum + o.total, 0)
  const pendingEarnings = orders
    .filter((o) => o.status !== "delivered" && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0)

  // Calculate monthly earnings
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const monthlyOrders = completedOrders.filter((o) => {
    const orderDate = new Date(o.createdAt)
    return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear
  })
  const monthlyEarnings = monthlyOrders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Earnings" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Earnings Overview</h2>
            <p className="text-muted-foreground">Track your revenue and sales performance</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard title="Total Earnings" value={`$${totalEarnings.toFixed(2)}`} icon={DollarSign} />
            <StatCard title="This Month" value={`$${monthlyEarnings.toFixed(2)}`} icon={Calendar} />
            <StatCard title="Pending" value={`$${pendingEarnings.toFixed(2)}`} icon={TrendingUp} />
            <StatCard title="Completed Orders" value={completedOrders.length} icon={ShoppingCart} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {completedOrders.length === 0 ? (
                <p className="text-muted-foreground">No completed orders yet</p>
              ) : (
                <div className="space-y-4">
                  {completedOrders.slice(0, 10).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">+${order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
