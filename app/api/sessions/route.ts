import { db } from "@/lib/db";
import { NextResponse } from "next/server";

async function fetchSessions() {
  return db.query(`
    SELECT 
      id,
      session_date,
      title,
      user_id,
      token,
      expires_at,
      created_at
    FROM sessions
    ORDER BY session_date ASC
  `);
}

export async function GET() {
  try {
    const [sessions] = await fetchSessions();
    return NextResponse.json(sessions);
  } catch (error: any) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      try {
        const [sessions] = await fetchSessions();
        return NextResponse.json(sessions);
      } catch (retryError) {
        console.error("Error fetching sessions after retry:", retryError);
        return NextResponse.json({ error: "Failed to fetch sessions after retry" }, { status: 500 });
      }
    }
    console.error("Error fetching sessions:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}