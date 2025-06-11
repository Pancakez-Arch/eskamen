// /pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "Missing username or password" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'TreningsGlede'
  });

  try {
    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } finally {
    await db.end();
  }
}
