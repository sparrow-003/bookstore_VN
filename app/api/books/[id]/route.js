import { NextResponse } from "next/server"
import { BookController } from "@/server/controllers/book.controller"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const book = BookController.getById(id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json({ book })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const data = await request.json()
    const result = BookController.update(id, data, data.sellerId, data.isAdmin)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, book: result.book })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get("sellerId")
    const isAdmin = searchParams.get("isAdmin") === "true"

    const result = BookController.delete(id, sellerId, isAdmin)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}
