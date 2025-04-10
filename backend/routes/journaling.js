import express from "express";
import pool from "../config/postgreSQL_connection.js";
// This is for the button where the user submit their journal

const journal = express.Router();
// input: request body fields: user_id, timestamp, ai_prompt, user_response, emotion_tags
journal.post("/post",async (req, res) => {
    try {
        const {user_id, emotion_tags, timestamp, user_response} = req.body;
        const ai_prompt = "None"
        const query = 'insert into journal_entries ' +
            '(user_id, timestamp, ai_prompt, user_response, emotion_tags)' +
            'values ($1, $2, $3, $4, $5) returning *';
        const result = await pool.query(query,
            [user_id, timestamp, ai_prompt,user_response, emotion_tags])
        res.json(result);
    } catch (err) {
        // Handle any errors that may have occurred
        res.status(500)
            .json({
                error: 'Failed to add journal',
                details: err.message });
    }
});

export default journal