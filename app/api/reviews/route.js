import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")

    const reviews = bookId ? db.getReviewsByBookId(bookId) : db.getReviews()

    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const reviewData = await request.json()
    const review = db.createReview(reviewData)
    return NextResponse.json({ success: true, review })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
