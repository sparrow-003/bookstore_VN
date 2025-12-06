import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET() {
  try {
    const authors = db.getAuthors()
    return NextResponse.json({ authors })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const authorData = await request.json()
    const author = db.createAuthor(authorData)
    return NextResponse.json({ success: true, author })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create author" }, { status: 500 })
  }
}
