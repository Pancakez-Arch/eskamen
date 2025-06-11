import mysql from 'mysql2/promise';

// Simple, direct pool export for database access
export const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3308, // <-- update this line
  user: 'root',
  password: 'Urstammer246',
  database: 'treningsglad',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
