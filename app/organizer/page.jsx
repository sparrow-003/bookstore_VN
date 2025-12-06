"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, ShoppingCart, AlertTriangle } from "lucide-react"

export default function OrganizerDashboard() {
  const { user, isAuthenticated, isOrganizer, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [lowStockBooks, setLowStockBooks] = useState([])

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isOrganizer)) {
      router.push("/login?redirect=/organizer")
    }
  }, [isLoading, isAuthenticated, isOrganizer, router])

  useEffect(() => {
    if (isOrganizer) {
      fetch("/api/stats")
        .then((res) => res.json())
        .then((data) => setStats(data.stats))

      fetch("/api/books")
        .then((res) => res.json())
        .then((data) => setLowStockBooks(data.books.filter((b) => b.quantity < 10)))
    }
  }, [isOrganizer])

  if (isLoading || !isOrganizer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="organizer" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Organizer Dashboard" />
        <main className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <StatCard title="Total Books" value={stats?.totalBooks || 0} icon={Book} />
            <StatCard title="Total Orders" value={stats?.totalOrders || 0} icon={ShoppingCart} />
            <StatCard title="Low Stock Items" value={stats?.lowStockBooks || 0} icon={AlertTriangle} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Low Stock Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockBooks.length === 0 ? (
                <p className="text-muted-foreground text-sm">All books are well stocked</p>
              ) : (
                <div className="space-y-3">
                  {lowStockBooks.map((book) => (
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
        </main>
      </div>
    </div>
  )
}
