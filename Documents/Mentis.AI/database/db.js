const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,  // Ensure this matches pgAdmin
});

(async () => {
    try {
        await pool.query("SET search_path TO public;");
        console.log("Search path set to public");
    } catch (err) {
        console.error("Error setting search path:", err);
    }
})();

module.exports = pool;
