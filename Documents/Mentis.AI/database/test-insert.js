require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

async function insertUser() {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = ['Alice Wonderland', 'alice@example.com', 'securepassword'];

    try {
        const result = await pool.query(query, values);
        console.log("Inserted User:", result.rows[0]);
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        pool.end();
    }
}

insertUser();
