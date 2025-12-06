"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useBooks } from "@/hooks/use-books"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SellerInventoryPage() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { books, isLoading, mutate } = useBooks({ sellerId: user?.id })
  const [editingId, setEditingId] = useState(null)
  const [quantity, setQuantity] = useState("")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller/inventory")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  const handleUpdateStock = async (bookId) => {
    await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: Number.parseInt(quantity),
        inStock: Number.parseInt(quantity) > 0,
        sellerId: user.id,
      }),
    })
    mutate()
    setEditingId(null)
    setQuantity("")
  }

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const columns = [
    { key: "title", label: "Book", sortable: true },
    { key: "author", label: "Author", sortable: true },
    {
      key: "quantity",
      label: "Current Stock",
      sortable: true,
      render: (value) => (
        <StatusBadge status={value === 0 ? "error" : value < 10 ? "warning" : "success"}>{value} units</StatusBadge>
      ),
    },
    {
      key: "inStock",
      label: "Status",
      render: (value) => (
        <StatusBadge status={value ? "success" : "error"}>{value ? "In Stock" : "Out of Stock"}</StatusBadge>
      ),
    },
    {
      key: "actions",
      label: "Update Stock",
      render: (_, book) =>
        editingId === book.id ? (
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-20"
              min="0"
            />
            <Button size="sm" onClick={() => handleUpdateStock(book.id)}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditingId(book.id)
              setQuantity(book.quantity.toString())
            }}
          >
            Update
          </Button>
        ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Inventory" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Inventory Management</h2>
            <p className="text-muted-foreground">Track and update your book stock levels</p>
          </div>

          <DataTable columns={columns} data={books} isLoading={isLoading} searchKey="title" />
        </main>
      </div>
    </div>
  )
}
