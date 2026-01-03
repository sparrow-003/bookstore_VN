// ==================================================
// STATS CONTROLLER - Dashboard statistics
// ==================================================

import { db } from "@/server/db"

export const StatsController = {
  getAdminStats: () => {
    const stats = db.getStats()
    const users = db.getUsers()
    const books = db.getBooks()

    return {
      ...stats,
      totalSellers: users.filter((u) => u.role === "seller").length,
      totalCustomers: users.filter((u) => u.role === "user").length,
      physicalBooks: books.filter((b) => b.bookType === "physical").length,
      digitalBooks: books.filter((b) => b.bookType === "digital").length,
      bannedUsers: users.filter((u) => u.isBanned).length,
      pendingApplications: db.getApplicationsByStatus("pending").length,
    }
  },

  getSellerStats: (sellerId) => {
    const books = db.getBooks()
    const orders = db.getOrders()
    const reviews = db.getReviews()

    // Get seller's books
    const sellerBooks = books // In production, filter by sellerId

    // Get seller's orders
    const sellerOrders = orders // In production, filter by sellerId

    // Get seller's reviews
    const sellerReviews = reviews // In production, filter by sellerId

    const revenue = sellerOrders.reduce((sum, o) => sum + o.total, 0)

    return {
      totalBooks: sellerBooks.length,
      physicalBooks: sellerBooks.filter((b) => b.bookType === "physical").length,
      digitalBooks: sellerBooks.filter((b) => b.bookType === "digital").length,
      totalOrders: sellerOrders.length,
      totalRevenue: revenue,
      averageRevenue: sellerOrders.length > 0 ? revenue / sellerOrders.length : 0,
      lowStockBooks: sellerBooks.filter((b) => b.quantity < 10).length,
      avgRating:
        sellerReviews.length > 0 ? sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length : 0,
      recentOrders: sellerOrders.slice(-5),
    }
  },
}
