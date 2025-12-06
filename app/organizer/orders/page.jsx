"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/ui/search-input"
import { StatusBadge } from "@/components/ui/status-badge"

export default function OrganizerOrdersPage() {
  const { isOrganizer, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!isLoading && !isOrganizer) {
      router.push("/login?redirect=/organizer")
    }
  }, [isLoading, isOrganizer, router])

  useEffect(() => {
    if (isOrganizer) {
      fetchOrders()
    }
  }, [isOrganizer])

  const fetchOrders = async () => {
    const res = await fetch("/api/orders")
    const data = await res.json()
    setOrders(data.orders)
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
        </div>
      ),
    },
    { key: "total", label: "Total", render: (order) => `$${order.total.toFixed(2)}` },
    { key: "status", label: "Status", render: (order) => <StatusBadge status={order.status} /> },
    { key: "createdAt", label: "Date", render: (order) => new Date(order.createdAt).toLocaleDateString() },
  ]

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
        <DashboardHeader title="Orders" />
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
