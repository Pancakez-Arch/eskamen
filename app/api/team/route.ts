import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const [instructors] = await db.query(`
      SELECT id, name, role, bio, specialties, image_url
      FROM instructors
      WHERE is_active = TRUE
      ORDER BY name ASC
    `)

    return NextResponse.json(instructors)
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}
