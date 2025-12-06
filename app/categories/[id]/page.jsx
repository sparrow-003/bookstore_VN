"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import { ChevronLeft } from "lucide-react"
import { categories, getBooksByCategory } from "@/lib/books-data"

export default function CategoryPage({ params }) {
  const { id } = use(params)
  const category = categories.find((c) => c.id === id)

  if (!category) {
    notFound()
  }

  const categoryBooks = getBooksByCategory(id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
            </div>
            <p className="text-muted-foreground">{category.description}</p>
          </div>

          {categoryBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {categoryBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No books available in this category yet.</p>
              <Link href="/books" className="text-primary hover:underline mt-2 inline-block">
                Browse all books
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
