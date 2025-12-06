"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { useAuth } from "@/context/auth-context"
import { Package } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [orders, setOrders] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/orders")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/orders?userId=${user.id}`)
      const data = await res.json()
      setOrders(data.orders || [])
    } finally {
      setIsFetching(false)
    }
  }

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold mb-2">No orders yet</h1>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
            <Link href="/books">
              <Button>Browse Books</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold mb-8">My Orders</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-mono">{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative w-16 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/books/${item.bookId}`}>
                            <h4 className="font-medium hover:text-primary transition-colors">{item.title}</h4>
                          </Link>
                          <p className="text-sm">
                            Qty: {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg text-primary">${order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
