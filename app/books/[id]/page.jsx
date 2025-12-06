"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BookCard from "@/components/book-card"
import { ReviewCard } from "@/components/reviews/review-card"
import { ReviewForm } from "@/components/reviews/review-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

export default function BookDetailPage({ params }) {
  const { id } = use(params)
  const { addToCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [relatedBooks, setRelatedBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchBook()
    fetchReviews()
  }, [id])

  const fetchBook = async () => {
    try {
      const res = await fetch(`/api/books/${id}`)
      const data = await res.json()
      if (data.book) {
        setBook(data.book)
        // Fetch related books
        const relatedRes = await fetch(`/api/books?category=${data.book.category}`)
        const relatedData = await relatedRes.json()
        setRelatedBooks(relatedData.books.filter((b) => b.id !== id).slice(0, 4))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?bookId=${id}`)
    const data = await res.json()
    setReviews(data.reviews || [])
  }

  const handleSubmitReview = async (reviewData) => {
    setIsSubmitting(true)
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: id,
          userId: user.id,
          userName: user.name,
          ...reviewData,
        }),
      })
      fetchReviews()
      fetchBook()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!book) {
    notFound()
  }

  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/books"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Books
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-xl">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {discount > 0 && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-lg px-3 py-1">
                      -{discount}%
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Badge variant="secondary" className="mb-4 capitalize">
                {book.category}
              </Badge>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{book.title}</h1>
              <p className="text-lg text-muted-foreground mt-2">by {book.author}</p>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">({book.reviews?.toLocaleString() || 0} reviews)</span>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">${book.price}</span>
                {book.originalPrice > book.price && (
                  <span className="text-xl text-muted-foreground line-through">${book.originalPrice}</span>
                )}
              </div>

              <div className="mt-4">
                {book.inStock && book.quantity > 0 ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock ({book.quantity} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <Button size="lg" className="flex-1 gap-2" onClick={() => addToCart(book)} disabled={!book.inStock}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="font-serif text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over $25</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% Protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30 Day Policy</p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {reviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No reviews yet. Be the first to review this book!
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isAuthenticated ? (
                      <ReviewForm onSubmit={handleSubmitReview} isLoading={isSubmitting} />
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">Please sign in to write a review</p>
                        <Link href={`/login?redirect=/books/${id}`}>
                          <Button>Sign In</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {relatedBooks.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook.id} book={relatedBook} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
