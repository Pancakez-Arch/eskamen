const fs = require('fs');
const mysql = require('mysql2');

const sql = fs.readFileSync('scripts/table.sql', 'utf8');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Urstammer246', // replace with your password
  multipleStatements: true
});

connection.connect();
connection.query(sql, (err) => {
  if (err) throw err;
  console.log('SQL script executed successfully');
  connection.end();
});