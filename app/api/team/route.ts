import { NextResponse } from "next/server"
import { queryRows } from "@/lib/db"

// Move Instructor type to module scope for reuse and clarity
type Instructor = {
  id: number
  name: string
  role: string
  bio: string
  specialties: string | string[]
  image_url: string
}

export async function GET() {
  try {
    const instructors = await queryRows<Instructor>(`
      SELECT id, name, role, bio, specialties, image_url
      FROM instructors
      WHERE is_active = TRUE
      ORDER BY name ASC
    `)

    // Parse JSON specialties
    const formattedInstructors = instructors.map((instructor) => ({
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
