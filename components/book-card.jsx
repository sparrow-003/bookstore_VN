"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookImage } from "@/client/components/book/book-image"
import { BookInfo } from "@/client/components/book/book-info"
import { AddToCartButton } from "@/client/components/book/add-to-cart-button"
import { WishlistButton } from "@/client/components/book/wishlist-button"

export default function BookCard({ book }) {
  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative">
          <BookImage
            src={book.image}
            alt={book.title}
            discount={discount}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <WishlistButton bookId={book.id} />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <BookInfo book={book} />
        <div className="mt-4">
          <AddToCartButton book={book} size="sm" showText={false} />
        </div>
      </CardContent>
    </Card>
  )
}
