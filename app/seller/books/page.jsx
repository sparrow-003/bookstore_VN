"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useBooks } from "@/hooks/use-books"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"

const categories = [
  { id: "fiction", name: "Fiction" },
  { id: "non-fiction", name: "Non-Fiction" },
  { id: "science", name: "Science" },
  { id: "romance", name: "Romance" },
  { id: "children", name: "Children's" },
  { id: "mystery", name: "Mystery" },
  { id: "biography", name: "Biography" },
  { id: "history", name: "History" },
]

export default function SellerBooksPage() {
  const { user, isAuthenticated, isSeller, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { books, isLoading, mutate } = useBooks({ sellerId: user?.id })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    quantity: "",
    isbn: "",
    pages: "",
    publisher: "",
  })

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isSeller)) {
      router.push("/login?redirect=/seller/books")
    }
  }, [authLoading, isAuthenticated, isSeller, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = editingBook ? `/api/books/${editingBook.id}` : "/api/books"
    const method = editingBook ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        sellerId: user.id,
        price: Number.parseFloat(formData.price),
        originalPrice: Number.parseFloat(formData.originalPrice) || Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        pages: Number.parseInt(formData.pages) || 0,
        image: `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(formData.title + " book cover")}`,
        inStock: Number.parseInt(formData.quantity) > 0,
        featured: false,
        genres: [formData.category],
      }),
    })

    if (res.ok) {
      mutate()
      setIsDialogOpen(false)
      setEditingBook(null)
      setFormData({
        title: "",
        author: "",
        price: "",
        originalPrice: "",
        category: "",
        description: "",
        quantity: "",
        isbn: "",
        pages: "",
        publisher: "",
      })
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      originalPrice: book.originalPrice?.toString() || "",
      category: book.category,
      description: book.description,
      quantity: book.quantity.toString(),
      isbn: book.isbn || "",
      pages: book.pages?.toString() || "",
      publisher: book.publisher || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (bookId) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await fetch(`/api/books/${bookId}?sellerId=${user.id}`, { method: "DELETE" })
      mutate()
    }
  }

  if (authLoading || !isSeller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "author", label: "Author", sortable: true },
    { key: "category", label: "Category", sortable: true },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: "quantity",
      label: "Stock",
      sortable: true,
      render: (value) => <StatusBadge status={value < 10 ? "warning" : "success"}>{value}</StatusBadge>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, book) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleEdit(book)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar type="seller" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="My Books" />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Book Listings</h2>
              <p className="text-muted-foreground">Manage your book inventory</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingBook(null)
                    setFormData({
                      title: "",
                      author: "",
                      price: "",
                      originalPrice: "",
                      category: "",
                      description: "",
                      quantity: "",
                      isbn: "",
                      pages: "",
                      publisher: "",
                    })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
                  <DialogDescription>Fill in the book details below</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pages">Pages</Label>
                      <Input
                        id="pages"
                        type="number"
                        value={formData.pages}
                        onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publisher">Publisher</Label>
                      <Input
                        id="publisher"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingBook ? "Update Book" : "Add Book"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <DataTable columns={columns} data={books} isLoading={isLoading} searchKey="title" />
        </main>
      </div>
    </div>
  )
}
