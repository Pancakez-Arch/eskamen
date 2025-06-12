import mysql from 'mysql2/promise';

// Load environment variables
const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || '';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

// Create pool
export const db = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function executeQuery(query: string, params: any[] = []) {
  const [rows] = await db.execute(query, params);
  return rows;
}