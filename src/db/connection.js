import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // Recuerda poner tu contraseña real
  database: 'plataforma_educativa',
  waitForConnections: true,
  connectionLimit: 10
});

// Exportamos como una constante nombrada
export const db = connection.promise();