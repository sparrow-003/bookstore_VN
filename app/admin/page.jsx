"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/stats")
        .then((res) => res.json())
        .then((data) => setStats(data.stats))

      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => setRecentOrders(data.orders.slice(0, 5)))
    }
  }, [isAdmin])

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Dashboard" />
        <main className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard title="Total Books" value={stats?.totalBooks || 0} icon={Book} />
            <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={Users} />
            <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={ShoppingCart} />
            <StatCard title="Total Revenue" value={`$${(stats?.totalRevenue || 0).toFixed(2)}`} icon={DollarSign} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
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
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats?.lowStockBooks || 0}</p>
                <p className="text-sm text-muted-foreground">Books with less than 10 units</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
