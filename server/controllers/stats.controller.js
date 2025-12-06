// ==================================================
// STATS CONTROLLER - Dashboard statistics
// ==================================================

import { BookModel } from "@/server/models/book.model"
import { UserModel } from "@/server/models/user.model"
import { OrderModel } from "@/server/models/order.model"
import { CategoryModel } from "@/server/models/category.model"

export const StatsController = {
  getAdminStats: () => ({
    totalBooks: BookModel.count(),
    totalUsers: UserModel.count(),
    totalOrders: OrderModel.count(),
    totalRevenue: OrderModel.getTotalRevenue(),
    lowStockBooks: BookModel.getLowStock().length,
    categories: CategoryModel.count(),
    recentOrders: OrderModel.getRecentOrders(5),
    usersByRole: {
      admin: UserModel.countByRole("admin"),
      seller: UserModel.countByRole("seller"),
      user: UserModel.countByRole("user"),
    },
  }),

  getSellerStats: (sellerId) => {
    const sellerBooks = BookModel.getBySeller(sellerId)
    const sellerOrders = OrderModel.getBySellerId(sellerId)

    return {
      totalBooks: sellerBooks.length,
      totalOrders: sellerOrders.length,
      totalRevenue: sellerOrders.reduce((sum, o) => sum + o.total, 0),
      lowStockBooks: sellerBooks.filter((b) => b.quantity < 10).length,
      recentOrders: sellerOrders.slice(0, 5),
    }
  },
}
