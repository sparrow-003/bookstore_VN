import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const lowStock = searchParams.get("lowStock")

    let inventory
    if (lowStock === "true") {
      inventory = db.getLowStockItems()
    } else {
      inventory = db.getInventory()
    }

    // Attach book details to each inventory item
    const inventoryWithBooks = inventory.map((item) => {
      const book = db.getBookById(item.bookId)
      return { ...item, book }
    })

    return NextResponse.json({ inventory: inventoryWithBooks })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}
