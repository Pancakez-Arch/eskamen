// /pages/api/signup.ts
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return new Response(JSON.stringify({ message: "Missing username or password" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.execute(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
}
