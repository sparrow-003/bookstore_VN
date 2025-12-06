import { NextResponse } from "next/server"
import { AuthController } from "@/server/controllers/auth.controller"

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    const result = AuthController.login(email, password)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
