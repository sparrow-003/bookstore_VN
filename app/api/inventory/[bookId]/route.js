import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request, { params }) {
  try {
    const { bookId } = await params
    const inventory = db.getInventoryByBookId(bookId)

    if (!inventory) {
      return NextResponse.json({ error: "Inventory not found" }, { status: 404 })
    }

    const book = db.getBookById(bookId)
    return NextResponse.json({ inventory: { ...inventory, book } })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { bookId } = await params
    const data = await request.json()
    const inventory = db.updateInventory(bookId, data)

    if (!inventory) {
      return NextResponse.json({ error: "Inventory not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, inventory })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 })
  }
}
