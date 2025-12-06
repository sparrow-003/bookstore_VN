"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useUsers } from "@/hooks/use-users"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Star, Ban, CheckCircle } from "lucide-react"

export default function AdminSellersPage() {
  const { user, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { users: sellers, isLoading, mutate } = useUsers("seller")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin/sellers")
    }
  }, [authLoading, isAuthenticated, isAdmin, router])

  const handleUpdateStatus = async (userId, status) => {
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, isAdmin: true }),
    })
    mutate()
  }

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "businessName", label: "Business", sortable: true },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>{value?.toFixed(1) || "N/A"}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <StatusBadge status={value === "active" || !value ? "success" : "error"}>{value || "active"}</StatusBadge>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, seller) => (
        <div className="flex gap-2">
          {seller.status === "suspended" ? (
            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(seller.id, "active")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Activate
            </Button>
          ) : (
            <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(seller.id, "suspended")}>
              <Ban className="h-4 w-4 mr-1" />
              Suspend
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Sellers" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Seller Management</h2>
            <p className="text-muted-foreground">Manage seller accounts and permissions</p>
          </div>

          <DataTable columns={columns} data={sellers} isLoading={isLoading} searchKey="name" />
        </main>
      </div>
    </div>
  )
}
