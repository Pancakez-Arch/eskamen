import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "Missing email or password" }), { status: 400 });
  }

  try {
    // Find user by email
    type User = { id: number; email: string; password_hash: string };
    const usersResult = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const users = Array.isArray(usersResult[0]) ? usersResult[0] : usersResult;
    const user = users[0] as User | undefined;
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }
    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }
    // For demo: return user id (in production, use JWT or session)
    return new Response(JSON.stringify({ message: "Login successful", userId: user.id }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
