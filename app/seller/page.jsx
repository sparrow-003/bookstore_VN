"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerDashboard() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [timeFrame, setTimeFrame] = useState("month")
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  useEffect(() => {
    if (isSeller && user?.id) {
      fetchStats()
    }
  }, [isSeller, user?.id, timeFrame])

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/seller/stats?userId=${user.id}&timeFrame=${timeFrame}`)
      const data = await res.json()
      setStats(data.stats)
      setChartData(data.chartData || [])
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Seller Dashboard" />
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground">Your bookstore performance and analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Revenue"
              value={`$${(stats?.totalRevenue || 0).toFixed(2)}`}
              icon={TrendingUp}
              trend={stats?.revenueTrend}
            />
            <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={TrendingUp} />
            <StatCard title="Total Books Listed" value={stats?.totalBooks || 0} icon={TrendingUp} />
            <StatCard title="Average Rating" value={`${(stats?.avgRating || 0).toFixed(1)}/5`} icon={TrendingUp} />
          </div>

          {/* Revenue Chart */}
          {chartData.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Sales by Category */}
          {chartData.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Book Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Book Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Total Books</p>
                    <p className="text-sm text-muted-foreground">All listed books</p>
                  </div>
                  <p className="text-2xl font-bold">{stats?.totalBooks || 0}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Physical Books</p>
                    <p className="text-sm text-muted-foreground">Hardcover & Paperback</p>
                  </div>
                  <p className="text-2xl font-bold">{stats?.physicalBooks || 0}</p>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Digital Books</p>
                    <p className="text-sm text-muted-foreground">PDF Downloads</p>
                  </div>
                  <p className="text-2xl font-bold">{stats?.digitalBooks || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
