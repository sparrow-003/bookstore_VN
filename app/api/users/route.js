import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let users
    if (role) {
      users = db.getUsers().filter((u) => u.role === role)
    } else {
      users = db.getUsers()
    }

    // Return safe user objects (without passwords)
    const safeUsers = users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      avatar: u.avatar,
      phone: u.phone,
      address: u.address,
      businessName: u.businessName,
      rating: u.rating,
      createdAt: u.createdAt,
      isActive: u.isActive,
      isBanned: u.isBanned,
    }))

    return NextResponse.json({ users: safeUsers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
