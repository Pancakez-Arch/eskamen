import { type NextRequest, NextResponse } from "next/server"
import { queryRows } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const instructors = await queryRows(`
      SELECT id, name, role, bio, specialties, image_url
      FROM instructors
      WHERE is_active = TRUE
      ORDER BY name ASC
    `)

    // Parse JSON specialties
    const formattedInstructors = instructors.map((instructor: any) => ({
      ...instructor,
      specialties:
        typeof instructor.specialties === "string" ? JSON.parse(instructor.specialties) : instructor.specialties,
    }))

    return NextResponse.json(formattedInstructors)
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}
