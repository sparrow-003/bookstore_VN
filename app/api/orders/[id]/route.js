import { NextResponse } from "next/server"
import { OrderController } from "@/server/controllers/order.controller"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const order = OrderController.getById(id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const { status, userId, role } = await request.json()
    const result = OrderController.updateStatus(id, status, userId, role)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true, order: result.order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
