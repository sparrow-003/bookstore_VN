// ==================================================
// ORDER CONTROLLER - Order management logic
// ==================================================

import { OrderModel } from "@/server/models/order.model"
import { BookModel } from "@/server/models/book.model"

export const OrderController = {
  getAll: () => OrderModel.getAll(),

  getById: (id) => OrderModel.getById(id),

  getByUserId: (userId) => OrderModel.getByUserId(userId),

  getBySellerId: (sellerId) => OrderModel.getBySellerId(sellerId),

  create: (orderData) => {
    // Validate and update inventory
    for (const item of orderData.items) {
      const book = BookModel.getById(item.bookId)
      if (!book) {
        return { success: false, error: `Book ${item.bookId} not found` }
      }
      if (book.quantity < item.quantity) {
        return { success: false, error: `Insufficient stock for ${book.title}` }
      }
    }

    // Update inventory
    for (const item of orderData.items) {
      const book = BookModel.getById(item.bookId)
      BookModel.update(item.bookId, {
        quantity: book.quantity - item.quantity,
        inStock: book.quantity - item.quantity > 0,
      })
    }

    const order = OrderModel.create(orderData)
    return { success: true, order }
  },

  updateStatus: (id, status, userId, role) => {
    const order = OrderModel.getById(id)
    if (!order) return { success: false, error: "Order not found" }

    // Check permissions
    if (role === "user" && order.userId !== userId) {
      return { success: false, error: "Unauthorized" }
    }

    const updatedOrder = OrderModel.updateStatus(id, status)
    return { success: true, order: updatedOrder }
  },

  getStats: () => ({
    totalOrders: OrderModel.count(),
    totalRevenue: OrderModel.getTotalRevenue(),
    recentOrders: OrderModel.getRecentOrders(),
  }),
}
