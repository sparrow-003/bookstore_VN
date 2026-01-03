"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/ui/search-input"
import { StatusBadge } from "@/components/ui/status-badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { BookForm } from "@/components/forms/book-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function AdminBooksPage() {
  const { isAdmin, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/login?redirect=/admin/books")
    }
  }, [authLoading, isAdmin, router])

  useEffect(() => {
    if (isAdmin && !authLoading) {
      fetchBooks()
    }
  }, [isAdmin, authLoading])

  const fetchBooks = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/books")
      if (!res.ok) throw new Error("Failed to fetch books")
      const data = await res.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error("[v0] Failed to fetch books:", error)
      setMessage("Failed to load books")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (bookData) => {
    setIsSaving(true)
    try {
      const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books"
      const method = editingBook ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })

      if (!res.ok) throw new Error("Failed to save book")

      fetchBooks()
      setIsDialogOpen(false)
      setEditingBook(null)
      setMessage(editingBook ? "Book updated successfully" : "Book created successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("[v0] Error saving book:", error)
      setMessage("Failed to save book")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete book")
      fetchBooks()
      setMessage("Book deleted successfully")
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      console.error("[v0] Failed to delete book:", error)
      setMessage("Failed to delete book")
    }
  }

  const filteredBooks = (books || []).filter(
    (book) =>
      (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(search.toLowerCase()),
  )

  const columns = [
    {
      key: "image",
      label: "Book",
      render: (book) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-14 rounded overflow-hidden bg-muted">
            <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-sm">{book.title || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">{book.author || "Unknown"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (book) => <span className="capitalize">{book.category || "N/A"}</span>,
    },
    { key: "price", label: "Price", render: (book) => `$${(book.price || 0).toFixed(2)}` },
    { key: "quantity", label: "Stock", render: (book) => book.quantity || 0 },
    {
      key: "status",
      label: "Status",
      render: (book) => <StatusBadge status={book.inStock ? "active" : "inactive"} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (book) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingBook(book)
              setIsDialogOpen(true)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            }
            title="Delete Book"
            description="Are you sure you want to delete this book? This action cannot be undone."
            onConfirm={() => handleDelete(book.id)}
            confirmText="Delete"
            variant="destructive"
          />
        </div>
      ),
    },
  ]

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
        <DashboardHeader title="Books Management">
          <Button
            onClick={() => {
              setEditingBook(null)
              setIsDialogOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </DashboardHeader>
        <main className="flex-1 p-6">
          {message && (
            <div
              className={`p-3 rounded mb-4 ${message.includes("Failed") ? "bg-destructive/10 text-destructive" : "bg-green-50 text-green-700"}`}
            >
              {message}
            </div>
          )}

          <div className="mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search books..." />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <DataTable columns={columns} data={filteredBooks} emptyMessage="No books found" />
          )}
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
          </DialogHeader>
          <BookForm
            book={editingBook}
            onSubmit={handleSave}
            onCancel={() => setIsDialogOpen(false)}
            isLoading={isSaving}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
