import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    const user = db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    if (user.isBanned) {
      return NextResponse.json({ error: "Account has been banned" }, { status: 403 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Return safe user object
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      businessName: user.businessName,
      isBanned: user.isBanned,
    }

    const token = `token_${user.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      user: safeUser,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
