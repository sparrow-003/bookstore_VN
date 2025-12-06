import { NextResponse } from "next/server"
import { OrderController } from "@/server/controllers/order.controller"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const sellerId = searchParams.get("sellerId")

    let orders
    if (userId) {
      orders = OrderController.getByUserId(userId)
    } else if (sellerId) {
      orders = OrderController.getBySellerId(sellerId)
    } else {
      orders = OrderController.getAll()
    }

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const orderData = await request.json()
    const result = OrderController.create(orderData)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, order: result.order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
