"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useOrders } from "@/hooks/use-orders"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]

export default function SellerOrdersPage() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { orders, isLoading, mutate } = useOrders({ sellerId: user?.id })

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller/orders")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  const handleStatusChange = async (orderId, status) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, userId: user.id, role: "seller" }),
    })
    mutate()
  }

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const columns = [
    { key: "id", label: "Order ID", sortable: true },
    { key: "userName", label: "Customer", sortable: true },
    {
      key: "items",
      label: "Items",
      render: (items) => `${items.length} item(s)`,
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (status, order) => (
        <Select defaultValue={status} onValueChange={(value) => handleStatusChange(order.id, value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {orderStatuses.map((s) => (
              <SelectItem key={s} value={s}>
                <StatusBadge status={s}>{s}</StatusBadge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Orders" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Order Management</h2>
            <p className="text-muted-foreground">View and manage customer orders</p>
          </div>

          <DataTable columns={columns} data={orders} isLoading={isLoading} searchKey="id" />
        </main>
      </div>
    </div>
  )
}
