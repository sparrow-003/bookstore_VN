import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const timeFrame = searchParams.get("timeFrame") || "month"

    // Get user's books and orders
    const books = db.getBooks().filter((b) => b.sellerId === userId || b.userId === userId)
    const orders = db.getOrders()

    // Calculate stats
    const totalBooks = books.length
    const physicalBooks = books.filter((b) => b.bookType === "physical").length
    const digitalBooks = books.filter((b) => b.bookType === "digital").length
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const totalOrders = orders.length
    const avgRating = books.length > 0 ? books.reduce((sum, b) => sum + (b.rating || 0), 0) / books.length : 0

    const chartData = generateChartData(orders, timeFrame)

    const stats = {
      totalBooks,
      physicalBooks,
      digitalBooks,
      totalRevenue,
      totalOrders,
      avgRating: Number.parseFloat(avgRating.toFixed(1)),
      revenueTrend: "+12%", // Placeholder
    }

    return NextResponse.json({
      success: true,
      stats,
      chartData,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}

function generateChartData(orders, timeFrame) {
  const data = []
  const now = new Date()
  let days = 7

  if (timeFrame === "month") days = 30
  if (timeFrame === "year") days = 365

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString()

    const dayOrders = orders.filter((o) => {
      const orderDate = new Date(o.createdAt).toLocaleDateString()
      return orderDate === dateStr
    })

    const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0)
    const sales = dayOrders.length

    data.push({
      date: dateStr.split("/").slice(0, 2).join("/"),
      revenue: Number.parseFloat(revenue.toFixed(2)),
      sales,
      category: "All Books",
    })
  }

  return data
}
