import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function POST(request) {
  try {
    const data = await request.json()
    const application = db.createSellerApplication(data)

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully. Please wait for admin approval.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let applications
    if (status) {
      applications = db.getApplicationsByStatus(status)
    } else {
      applications = db.getSellerApplications()
    }

    return NextResponse.json({ applications })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { applicationId, action, reason } = await request.json()

    if (action === "approve") {
      const app = db.approveSellerApplication(applicationId)
      return NextResponse.json({
        success: true,
        message: "Application approved. User can now access seller dashboard.",
        application: app,
      })
    } else if (action === "reject") {
      const app = db.rejectSellerApplication(applicationId, reason)
      return NextResponse.json({
        success: true,
        message: "Application rejected.",
        application: app,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}
