import pool from "../services/postgreSQL_connection.js";

export async function addJournalEntry({ user_id, timestamp, user_response, emotion_tags }) {
    const ai_prompt = "None";
    const query = `
        INSERT INTO journal_entries
            (user_id, timestamp, ai_prompt, user_response, emotion_tags)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await pool.query(query, [user_id, timestamp, ai_prompt, user_response, emotion_tags]);
    return result.rows[0];
}