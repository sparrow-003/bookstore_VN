import { NextResponse } from "next/server"
import { db } from "@/server/db"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const bookId = formData.get("bookId")

    if (!file || !bookId) {
      return NextResponse.json({ error: "Missing file or bookId" }, { status: 400 })
    }

    // In production, upload to cloud storage (S3, etc.)
    // For now, we'll simulate the upload
    const fileName = `${bookId}-${Date.now()}.pdf`
    const pdfUrl = `/pdfs/${fileName}`
    const fileSize = file.size

    // Store PDF metadata
    db.uploadDigitalBook(bookId, pdfUrl, fileSize)

    // Update book to mark as digital
    db.updateBook(bookId, { bookType: "digital", pdf: pdfUrl })

    return NextResponse.json({
      success: true,
      pdfUrl,
      fileSize,
    })
  } catch (error) {
    return NextResponse.json({ error: "PDF upload failed" }, { status: 500 })
  }
}
