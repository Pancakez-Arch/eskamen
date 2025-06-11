import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'treningsuser',
  password: 'userpassword123',
  database: 'TreningsGlede',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Helper function to execute queries
export async function executeQuery<T = unknown>(query: string, params: unknown[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(query, params);
    return results as T;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Helper function to get a single row
export async function queryRow<T = unknown>(query: string, params: unknown[] = []): Promise<T | null> {
  const results = (await executeQuery<T[]>(query, params));
  return results[0] || null;
}

// Helper function to get multiple rows
export async function queryRows<T = unknown>(query: string, params: unknown[] = []): Promise<T[]> {
  return (await executeQuery<T[]>(query, params));
}

export { pool as db };
