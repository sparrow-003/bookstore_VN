import { NextResponse } from "next/server"
import { AuthController } from "@/server/controllers/auth.controller"

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json()
    const result = AuthController.register(name, email, password, role)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
