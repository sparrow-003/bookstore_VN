import { NextResponse } from "next/server"
import { BookController } from "@/server/controllers/book.controller"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      category: searchParams.get("category"),
      search: searchParams.get("search"),
      sortBy: searchParams.get("sortBy"),
      minPrice: searchParams.get("minPrice"),
      maxPrice: searchParams.get("maxPrice"),
      sellerId: searchParams.get("sellerId"),
    }

    // Check if requesting featured books
    if (searchParams.get("featured") === "true") {
      const books = BookController.getFeatured()
      return NextResponse.json({ books })
    }

    // Check if requesting seller's books
    if (filters.sellerId) {
      const books = BookController.getBySeller(filters.sellerId)
      return NextResponse.json({ books })
    }

    const books = BookController.getAll(filters)
    return NextResponse.json({ books })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const bookData = await request.json()
    const book = BookController.create(bookData, bookData.sellerId)
    return NextResponse.json({ success: true, book })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}
