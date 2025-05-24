// Try connection using node ./backend/config/postgreSQL_connection.js
import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";
dotenv.config();
// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,       // Access user from .env
    host: process.env.DB_HOST,       // Access host from .env
    database: process.env.DB_DATABASE,  // Access database name from .env
    password: process.env.DB_PASSWORD,  // Access password from .env
    port: process.env.DB_PORT,       // Access port from .env (default 5432)
});

// Test connection
pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err.stack));

export default pool;