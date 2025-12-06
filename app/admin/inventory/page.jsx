"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { DataTable } from "@/components/ui/data-table"
import { SearchInput } from "@/components/ui/search-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Package, AlertTriangle } from "lucide-react"

export default function AdminInventoryPage() {
  const { isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState("")
  const [editingBook, setEditingBook] = useState(null)
  const [newQuantity, setNewQuantity] = useState("")

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

  const handleUpdateStock = async () => {
    await fetch(`/api/books/${editingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: Number.parseInt(newQuantity) }),
    })
    fetchBooks()
    setEditingBook(null)
  }

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    {
      key: "book",
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
    {
      key: "quantity",
      label: "Stock",
      render: (book) => (
        <div className="flex items-center gap-2">
          <span className={book.quantity < 10 ? "text-destructive font-medium" : ""}>{book.quantity}</span>
          {book.quantity < 10 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
        </div>
      ),
    },
    { key: "price", label: "Price", render: (book) => `$${book.price.toFixed(2)}` },
    {
      key: "actions",
      label: "Actions",
      render: (book) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setEditingBook(book)
            setNewQuantity(book.quantity.toString())
          }}
        >
          <Package className="h-4 w-4 mr-2" />
          Update Stock
        </Button>
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
        <DashboardHeader title="Inventory Management" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <SearchInput value={search} onChange={setSearch} placeholder="Search inventory..." />
          </div>
          <DataTable columns={columns} data={filteredBooks} emptyMessage="No inventory found" />
        </main>
      </div>

      <Dialog open={!!editingBook} onOpenChange={() => setEditingBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Update stock for: <strong>{editingBook?.title}</strong>
            </p>
            <div className="space-y-2">
              <Label htmlFor="quantity">New Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBook(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStock}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
