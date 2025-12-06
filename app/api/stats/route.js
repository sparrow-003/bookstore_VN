import { NextResponse } from "next/server"
import { StatsController } from "@/server/controllers/stats.controller"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sellerId = searchParams.get("sellerId")
    const type = searchParams.get("type")

    let stats
    if (type === "seller" && sellerId) {
      stats = StatsController.getSellerStats(sellerId)
    } else {
      stats = StatsController.getAdminStats()
    }

    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
