import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [bookings] = await db.query(`
      SELECT b.*, u.username as user_name, s.title as session_title
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN sessions s ON b.session_id = s.id
      ORDER BY b.created_at DESC
    `);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
