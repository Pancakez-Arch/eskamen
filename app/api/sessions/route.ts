import { type NextRequest, NextResponse } from "next/server"
import { queryRows } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const sessions = await queryRows(`
      SELECT 
        s.*,
        i.name as instructor_name,
        i.role as instructor_role
      FROM sessions s
      JOIN instructors i ON s.instructor_id = i.id
      WHERE s.is_active = TRUE AND s.session_date >= CURDATE()
      ORDER BY s.session_date ASC, s.start_time ASC
    `)

    // Format the sessions data
    const formattedSessions = sessions.map((session: any) => ({
      id: session.id,
      title: session.title,
      description: session.description,
      instructor: session.instructor_name,
      instructorRole: session.instructor_role,
      type: session.session_type,
      date: session.session_date,
      startTime: session.start_time,
      endTime: session.end_time,
      location: session.location,
      maxParticipants: session.max_participants,
      currentParticipants: session.current_participants,
      difficulty: session.difficulty,
      price: Number.parseFloat(session.price),
    }))

    return NextResponse.json(formattedSessions)
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}
