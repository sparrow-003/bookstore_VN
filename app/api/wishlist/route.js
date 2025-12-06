import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const wishlist = db.getUserWishlist(userId)
    return NextResponse.json({ wishlist })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { userId, bookId } = await request.json()
    db.addToWishlist(userId, bookId)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const bookId = searchParams.get("bookId")

    if (!userId || !bookId) {
      return NextResponse.json({ error: "User ID and Book ID required" }, { status: 400 })
    }

    db.removeFromWishlist(userId, bookId)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
  }
}
