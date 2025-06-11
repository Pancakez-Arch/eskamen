
import mysql from "mysql2/promise";

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "treningsglede",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00",
})

export { pool as db }

// Helper function to execute queries
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// Helper function to get a single row
export async function queryRow(query: string, params: any[] = []) {
  const results = (await executeQuery(query, params)) as any[]
  return results[0] || null
}

// Helper function to get multiple rows
export async function queryRows(query: string, params: any[] = []) {
  return (await executeQuery(query, params)) as any[]
}
