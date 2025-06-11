import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { executeQuery, queryRow } from "@/lib/db"

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
    const session = await queryRow("SELECT * FROM sessions WHERE id = ? AND is_active = TRUE", [sessionId])

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Check if user already on waitlist or has booking
    const existingEntry = await queryRow(
      `SELECT * FROM waitlist WHERE user_id = ? AND session_id = ?
       UNION
       SELECT user_id, session_id, 'booking' as type, id FROM bookings 
       WHERE user_id = ? AND session_id = ? AND booking_status != 'cancelled'`,
      [userId, sessionId, userId, sessionId],
    )

    if (existingEntry) {
      return NextResponse.json(
        { error: "You are already on the waitlist or have booked this session" },
        { status: 400 },
      )
    }

    // Get next position in waitlist
    type MaxPositionResult = { max_position: number | null }
    const lastPosition = await queryRow<MaxPositionResult>(
      "SELECT MAX(position) as max_position FROM waitlist WHERE session_id = ?",
      [sessionId],
    )

    const nextPosition = ((lastPosition && lastPosition.max_position) || 0) + 1

    // Add to waitlist
    await executeQuery("INSERT INTO waitlist (clerk_user_id, session_id, position) VALUES (?, ?, ?)", [
      userId,
      sessionId,
      nextPosition,
    ])

    return NextResponse.json({
      message: "Added to waitlist successfully",
      position: nextPosition,
    })
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
