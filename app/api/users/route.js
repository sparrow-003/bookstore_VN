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

export async function POST(request) {
  try {
    const data = await request.json()
    const { email, name, password, role, phone, address, businessName } = data

    // Validation
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create user with email uniqueness check
    const result = db.createUser({
      email,
      name,
      password,
      role: role || "user",
      phone: phone || "",
      address: address || "",
      businessName: businessName || "",
      avatar: null,
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 })
    }

    const { password: _, ...userWithoutPassword } = result.user
    return NextResponse.json({ success: true, user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
