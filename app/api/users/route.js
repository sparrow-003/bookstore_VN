import { NextResponse } from "next/server"
import { UserController } from "@/server/controllers/user.controller"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let users
    if (role) {
      users = UserController.getByRole(role)
    } else {
      users = UserController.getAll()
    }

    return NextResponse.json({ users })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
