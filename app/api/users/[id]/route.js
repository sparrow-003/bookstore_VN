import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const user = db.getUserById(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const data = await request.json()
    const user = db.updateUser(id, data)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ success: true, user: userWithoutPassword })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    db.deleteUser(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
