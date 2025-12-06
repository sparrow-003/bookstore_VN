"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/ui/search-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminOrdersPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchOrders()
    }
  }, [isAdmin])

  const fetchOrders = async () => {
    const res = await fetch("/api/orders")
    const data = await res.json()
    setOrders(data.orders)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    fetchOrders()
  }

  const filteredOrders = orders.filter((order) => order.id.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    { key: "id", label: "Order ID", render: (order) => <span className="font-mono text-sm">{order.id}</span> },
    {
      key: "items",
      label: "Items",
      render: (order) => (
        <div>
          <p className="text-sm">{order.items.length} items</p>
          <p className="text-xs text-muted-foreground">
            {order.items
              .map((i) => i.title)
              .join(", ")
              .slice(0, 30)}
            ...
          </p>
        </div>
      ),
    },
    { key: "total", label: "Total", render: (order) => `$${order.total.toFixed(2)}` },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    { key: "createdAt", label: "Date", render: (order) => new Date(order.createdAt).toLocaleDateString() },
  ]

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
        <DashboardHeader title="Orders Management" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search orders..." />
          </div>
          <DataTable columns={columns} data={filteredOrders} emptyMessage="No orders found" />
        </main>
      </div>
    </div>
  )
}
