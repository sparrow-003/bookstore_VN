"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, ShoppingCart, DollarSign, AlertTriangle, BookMarked } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockBooks: 0,
    physicalBooks: 0,
    digitalBooks: 0,
    sellerCount: 0,
    pendingOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    const loadData = async () => {
      if (!isAdmin || isLoading) return

      try {
        setIsLoadingData(true)
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const [statsRes, ordersRes] = await Promise.allSettled([
          fetch("/api/stats", { signal: controller.signal }),
          fetch("/api/orders", { signal: controller.signal }),
        ])

        clearTimeout(timeoutId)

        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const statsData = await statsRes.value.json()
          setStats({
            ...stats,
            ...(statsData.stats || {}),
          })
        }

        if (ordersRes.status === "fulfilled" && ordersRes.value.ok) {
          const ordersData = await ordersRes.value.json()
          setRecentOrders((ordersData?.orders || []).slice(0, 5))
        }
      } catch (error) {
        console.error("[v0] Error loading admin dashboard:", error.message)
      } finally {
        setIsLoadingData(false)
      }
    }

    loadData()
  }, [isAdmin, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Admin Dashboard" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
            <p className="text-muted-foreground">System overview and management</p>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
            <StatCard title="Total Users" value={stats.totalUsers || 0} icon={Users} />
            <StatCard title="Total Sellers" value={stats.sellerCount || 0} icon={BookMarked} />
            <StatCard title="Total Books" value={stats.totalBooks || 0} icon={Book} />
            <StatCard title="Total Orders" value={stats.totalOrders || 0} icon={ShoppingCart} />
            <StatCard title="Total Revenue" value={`$${(stats.totalRevenue || 0).toFixed(2)}`} icon={DollarSign} />
          </div>

          {/* Book Type Statistics */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Book Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Physical Books</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.physicalBooks || 0}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Digital Books (PDF)</p>
                  </div>
                  <p className="text-2xl font-bold">{stats.digitalBooks || 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-900">Low Stock Items: {stats.lowStockBooks || 0}</p>
                    <p className="text-xs text-yellow-700">Books with less than 10 units</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Pending Orders: {stats.pendingOrders || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Order ID</th>
                        <th className="text-left py-2 px-4">Customer</th>
                        <th className="text-left py-2 px-4">Items</th>
                        <th className="text-left py-2 px-4">Amount</th>
                        <th className="text-left py-2 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-4 font-medium">{order.id}</td>
                          <td className="py-2 px-4">{order.userName}</td>
                          <td className="py-2 px-4">{order.items?.length || 0} items</td>
                          <td className="py-2 px-4">${(order.total || 0).toFixed(2)}</td>
                          <td className="py-2 px-4">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                              {order.status || "pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
