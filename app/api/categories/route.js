import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET() {
  try {
    const categories = db.getGenres()
    return NextResponse.json({ categories })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
