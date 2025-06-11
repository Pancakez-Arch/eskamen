import mysql from "mysql2/promise";

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3307"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "adiam",
  database: process.env.DB_NAME || "trening",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00",
})

export { pool as db }

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
