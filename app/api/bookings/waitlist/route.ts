import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, sessionId } = body

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Check if session exists
    const [sessions] = await db.query(
      "SELECT * FROM sessions WHERE id = ? AND is_active = TRUE",
      [sessionId],
    )
    const session = Array.isArray(sessions) ? sessions[0] : undefined
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Check if user already on waitlist or has booking
    const [entries] = await db.query(
      `SELECT * FROM waitlist WHERE user_id = ? AND session_id = ?
       UNION
       SELECT user_id, session_id, 'booking' as type, id FROM bookings 
       WHERE user_id = ? AND session_id = ? AND booking_status != 'cancelled'`,
      [userId, sessionId, userId, sessionId],
    )
    const existingEntry = Array.isArray(entries) ? entries[0] : undefined
    if (existingEntry) {
      return NextResponse.json(
        { error: "You are already on the waitlist or have booked this session" },
        { status: 400 },
      )
    }

    // Get next position in waitlist
    const [positions] = await db.query(
      "SELECT MAX(position) as max_position FROM waitlist WHERE session_id = ?",
      [sessionId],
    )
    let nextPosition = 1
    let maxPosition = 0
    if (Array.isArray(positions) && positions.length > 0 && "max_position" in positions[0]) {
      maxPosition = positions[0].max_position || 0
    }
    nextPosition = maxPosition + 1

    // Add to waitlist
    await db.execute(
      "INSERT INTO waitlist (user_id, session_id, position) VALUES (?, ?, ?)",
      [userId, sessionId, nextPosition],
    )

    return NextResponse.json({
      message: "Added to waitlist successfully",
      position: nextPosition,
    })
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [waitlist] = await db.query("SELECT * FROM waitlist")
    return NextResponse.json(waitlist)
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 })
  }
}
