import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    // Get base stats from database
    const stats = db.getStats()

    // Enhance with book type breakdown
    const books = db.getBooks() || []
    const physicalBooks = books.filter((b) => (b.bookType || "physical") === "physical").length
    const digitalBooks = books.filter((b) => (b.bookType || "physical") === "digital").length

    // Get seller count
    const users = db.getUsers() || []
    const sellerCount = users.filter((u) => u.role === "seller").length
    const userCount = users.filter((u) => u.role === "user").length
    const bannedCount = users.filter((u) => u.isBanned).length

    // Get seller applications (with fallback if method doesn't exist)
    let pendingApps = 0
    try {
      const applications = db.getSellerApplications ? db.getSellerApplications() : []
      pendingApps = applications.filter((a) => a.status === "pending").length
    } catch (e) {
      console.error("[v0] Error getting seller applications:", e)
    }

    return NextResponse.json({
      stats: {
        ...stats,
        physicalBooks,
        digitalBooks,
        sellerCount,
        userCount,
        bannedCount,
        pendingApplications: pendingApps,
      },
    })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        stats: {
          totalBooks: 0,
          totalUsers: 0,
          totalOrders: 0,
          totalRevenue: 0,
          lowStockBooks: 0,
          physicalBooks: 0,
          digitalBooks: 0,
          sellerCount: 0,
          userCount: 0,
          bannedCount: 0,
          pendingApplications: 0,
        },
      },
      { status: 500 },
    )
  }
}
