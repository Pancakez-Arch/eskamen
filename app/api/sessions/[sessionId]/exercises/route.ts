import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/sessions/[sessionId]/exercises
export async function GET(req: NextRequest, { params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  try {
    const [rows] = await db.query(
      `SELECT e.* FROM exercises e
       JOIN sessions s ON FIND_IN_SET(e.id, s.exercise_ids)
       WHERE s.id = ?`,
      [sessionId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching exercises for session:', error);
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
  }
}
