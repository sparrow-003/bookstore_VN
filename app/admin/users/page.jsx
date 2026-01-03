"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Search, Ban, CheckCircle, Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const { isAdmin, isLoading, user: currentUser } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchUsers()
    }
  }, [isAdmin])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users")
      const data = await res.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const handleBanUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned: true }),
      })
      fetchUsers()
    } catch (error) {
      console.error("Failed to ban user:", error)
    }
  }

  const handleUnbanUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBanned: false }),
      })
      fetchUsers()
    } catch (error) {
      console.error("Failed to unban user:", error)
    }
  }

  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" })
      fetchUsers()
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })
      fetchUsers()
    } catch (error) {
      console.error("Failed to update role:", error)
    }
  }

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  // Filter users
  let filteredUsers = users
  if (search) {
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
    )
  }
  if (filterRole !== "all") {
    filteredUsers = filteredUsers.filter((u) => u.role === filterRole)
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="admin" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="User Management" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users & Sellers</h2>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="user">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Grid */}
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">No users found</CardContent>
              </Card>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      {/* User Info */}
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>

                      {/* Role Badge */}
                      <div>
                        <Badge
                          variant={
                            user.role === "admin" ? "destructive" : user.role === "seller" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </div>

                      {/* Status */}
                      <div>
                        {user.isBanned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                            Active
                          </Badge>
                        )}
                      </div>

                      {/* Joined Date */}
                      <div className="text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 justify-end">
                        {/* Role Selector */}
                        {user.id !== currentUser?.id && (
                          <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                            <SelectTrigger className="w-24 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">Customer</SelectItem>
                              <SelectItem value="seller">Seller</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        )}

                        {/* Ban/Unban */}
                        {user.id !== currentUser?.id && (
                          <>
                            {user.isBanned ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnbanUser(user.id)}
                                title="Unban user"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <ConfirmDialog
                                trigger={
                                  <Button size="sm" variant="outline" title="Ban user">
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                }
                                title="Ban User"
                                description={`Are you sure you want to ban ${user.name}? They won't be able to login.`}
                                onConfirm={() => handleBanUser(user.id)}
                                confirmText="Ban"
                                variant="destructive"
                              />
                            )}
                          </>
                        )}

                        {/* Delete */}
                        {user.id !== currentUser?.id && (
                          <ConfirmDialog
                            trigger={
                              <Button size="sm" variant="ghost" title="Delete user">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            }
                            title="Delete User"
                            description={`Permanently delete ${user.name}? This action cannot be undone.`}
                            onConfirm={() => handleDelete(user.id)}
                            confirmText="Delete"
                            variant="destructive"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
