"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/ui/search-input"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

export default function AdminUsersPage() {
  const { isAdmin, isLoading, user: currentUser } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")

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
    const res = await fetch("/api/users")
    const data = await res.json()
    setUsers(data.users)
  }

  const handleRoleChange = async (userId, newRole) => {
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    })
    fetchUsers()
  }

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" })
    fetchUsers()
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()),
  )

  const columns = [
    {
      key: "name",
      label: "User",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{user.name?.charAt(0) || "U"}</span>
          </div>
          <div>
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <Select
          value={user.role}
          onValueChange={(value) => handleRoleChange(user.id, value)}
          disabled={user.id === currentUser?.id}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      render: (user) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) =>
        user.id !== currentUser?.id && (
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            }
            title="Delete User"
            description="Are you sure you want to delete this user? This action cannot be undone."
            onConfirm={() => handleDelete(user.id)}
            confirmText="Delete"
            variant="destructive"
          />
        ),
    },
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
        <DashboardHeader title="User Management" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search users..." />
          </div>
          <DataTable columns={columns} data={filteredUsers} emptyMessage="No users found" />
        </main>
      </div>
    </div>
  )
}
