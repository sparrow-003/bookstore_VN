"use client"

import { useEffect, useState } from "react"
import BookCard from "@/components/book-card"
import { SectionHeader } from "@/client/components/ui/section-header"
import { LoadingSpinner } from "@/client/components/ui/loading-spinner"
import { Container } from "@/client/components/layout/container"

export default function FeaturedBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/books?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <Container>
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Loading books..." />
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <Container>
        <SectionHeader
          title="Featured Books"
          subtitle="Handpicked selections from our editors"
          linkText="View All"
          linkHref="/books"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>
    </section>
  )
}
