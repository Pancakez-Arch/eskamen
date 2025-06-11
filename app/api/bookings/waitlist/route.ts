import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import type { RowDataPacket } from "mysql2"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Check if session exists
    const [sessions] = await db.query<RowDataPacket[]>(
      "SELECT * FROM sessions WHERE id = ? AND is_active = TRUE",
      [sessionId],
    )
    const session = sessions[0]

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Check if user already on waitlist or has booking
    const [entries] = await db.query<RowDataPacket[]>(
      `SELECT * FROM waitlist WHERE user_id = ? AND session_id = ?
       UNION
       SELECT user_id, session_id, 'booking' as type, id FROM bookings 
       WHERE user_id = ? AND session_id = ? AND booking_status != 'cancelled'`,
      [userId, sessionId, userId, sessionId],
    )
    const existingEntry = entries[0]

    if (existingEntry) {
      return NextResponse.json(
        { error: "You are already on the waitlist or have booked this session" },
        { status: 400 },
      )
    }

    // Get next position in waitlist
    const [positions] = await db.query<RowDataPacket[]>(
      "SELECT MAX(position) as max_position FROM waitlist WHERE session_id = ?",
      [sessionId],
    )
    let nextPosition = 1
    if (positions[0] && typeof positions[0].max_position !== "undefined") {
      nextPosition = (positions[0].max_position || 0) + 1
    }

    // Add to waitlist
    await db.execute(
      "INSERT INTO waitlist (clerk_user_id, session_id, position) VALUES (?, ?, ?)",
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
