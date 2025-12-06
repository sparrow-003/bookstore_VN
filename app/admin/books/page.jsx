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
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/login?redirect=/admin")
    }
  }, [isLoading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchBooks()
    }
  }, [isAdmin])

  const fetchBooks = async () => {
    const res = await fetch("/api/books")
    const data = await res.json()
    setBooks(data.books)
  }

  const handleSave = async (bookData) => {
    setIsSaving(true)
    try {
      if (editingBook) {
        await fetch(`/api/books/${editingBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        })
      } else {
        await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        })
      }
      fetchBooks()
      setIsDialogOpen(false)
      setEditingBook(null)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" })
    fetchBooks()
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
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
            <p className="font-medium text-sm">{book.title}</p>
            <p className="text-xs text-muted-foreground">{book.author}</p>
          </div>
        </div>
      ),
    },
    { key: "category", label: "Category", render: (book) => <span className="capitalize">{book.category}</span> },
    { key: "price", label: "Price", render: (book) => `$${book.price.toFixed(2)}` },
    { key: "quantity", label: "Stock", render: (book) => book.quantity },
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
          <div className="mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search books..." />
          </div>
          <DataTable columns={columns} data={filteredBooks} emptyMessage="No books found" />
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
