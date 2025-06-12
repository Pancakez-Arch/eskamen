import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { userId, exerciseId } = await req.json();
  if (!userId || !exerciseId) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }
  await db.query(
    'INSERT INTO user_exercises (user_id, exercise_id) VALUES (?, ?)',
    [userId, exerciseId]
  );
  return NextResponse.json({ success: true });
}