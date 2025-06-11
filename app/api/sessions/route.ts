import { NextResponse } from "next/server"
import { queryRows } from "@/lib/db"

// Define a type for session rows
interface SessionRow {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
  instructor_role: string;
  session_type: string;
  session_date: string;
  start_time: string;
  end_time: string;
  location: string;
  max_participants: number;
  current_participants: number;
  difficulty: string;
  price: string | number;
}

export async function GET() {
  try {
    const sessions = await queryRows<SessionRow>(`
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
    const formattedSessions = sessions.map((session) => ({
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
      price: typeof session.price === 'string' ? Number.parseFloat(session.price) : session.price,
    }))

    return NextResponse.json(formattedSessions)
  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
  }
}
