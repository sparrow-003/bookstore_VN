"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useUsers } from "@/hooks/use-users"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserForm } from "@/components/admin/user-form"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Star, Trash2, Plus, X } from "lucide-react"

export default function AdminSellersPage() {
  const { user, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { users: sellers = [], isLoading, mutate } = useUsers("seller")
  const [showForm, setShowForm] = useState(false)
  const [editingSeller, setEditingSeller] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin/sellers")
    }
  }, [authLoading, isAuthenticated, isAdmin, router])

  useEffect(() => {
    if (isLoading && sellers && sellers.length === 0) {
      console.error("[v0] Failed to load sellers - check API connection")
    }
  }, [isLoading, sellers])

  const handleSaveSeller = async (sellerData) => {
    setIsSubmitting(true)
    setMessage("")

    try {
      const url = editingSeller ? `/api/users/${editingSeller.id}` : "/api/users"
      const method = editingSeller ? "PUT" : "POST"

      // Ensure role is set to seller
      const data = { ...sellerData, role: "seller" }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setMessage(result.error || "Failed to save seller")
        setMessageType("error")
        return
      }

      setMessage(editingSeller ? "Seller updated successfully" : "Seller created successfully")
      setMessageType("success")
      setShowForm(false)
      setEditingSeller(null)
      mutate()

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("[v0] Error saving seller:", error)
      setMessage("An error occurred while saving seller")
      setMessageType("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSeller = async (sellerId) => {
    try {
      const res = await fetch(`/api/users/${sellerId}`, { method: "DELETE" })
      if (res.ok) {
        setMessage("Seller deleted successfully")
        setMessageType("success")
        mutate()
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Failed to delete seller")
        setMessageType("error")
      }
    } catch (error) {
      console.error("[v0] Failed to delete seller:", error)
      setMessage("An error occurred while deleting seller")
      setMessageType("error")
    }
  }

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Sellers" />
        <main className="flex-1 p-6">
          {showForm ? (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{editingSeller ? "Edit Seller" : "Create New Seller"}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false)
                    setEditingSeller(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {message && (
                <div
                  className={`p-3 rounded mb-4 ${
                    messageType === "error" ? "bg-destructive/10 text-destructive" : "bg-green-50 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <UserForm
                user={editingSeller ? { ...editingSeller, role: "seller" } : null}
                onSubmit={handleSaveSeller}
                onCancel={() => {
                  setShowForm(false)
                  setEditingSeller(null)
                }}
                isLoading={isSubmitting}
              />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">Seller Management</h2>
                    <p className="text-muted-foreground">Manage seller accounts and permissions</p>
                  </div>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Seller
                  </Button>
                </div>
              </div>

              {/* Sellers Cards */}
              <div className="space-y-4">
                {isLoading ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                    </CardContent>
                  </Card>
                ) : sellers && sellers.length > 0 ? (
                  sellers.map((seller) => (
                    <Card key={seller.id}>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                          {/* Seller Info */}
                          <div>
                            <p className="font-semibold">{seller.name}</p>
                            <p className="text-sm text-muted-foreground">{seller.email}</p>
                            {seller.businessName && <p className="text-sm font-medium mt-1">{seller.businessName}</p>}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span>{seller.rating?.toFixed(1) || "N/A"}</span>
                          </div>

                          {/* Status */}
                          <div>
                            {seller.isBanned ? (
                              <Badge variant="destructive">Banned</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                                Active
                              </Badge>
                            )}
                          </div>

                          {/* Joined Date */}
                          <div className="text-sm text-muted-foreground">
                            {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : "N/A"}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingSeller(seller)
                                setShowForm(true)
                              }}
                            >
                              Edit
                            </Button>
                            <ConfirmDialog
                              trigger={
                                <Button size="sm" variant="ghost" title="Delete seller">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              }
                              title="Delete Seller"
                              description={`Permanently delete ${seller.name}? This action cannot be undone.`}
                              onConfirm={() => handleDeleteSeller(seller.id)}
                              confirmText="Delete"
                              variant="destructive"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">No sellers found</CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
