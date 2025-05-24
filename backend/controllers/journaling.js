import express from "express";
import { addJournalEntry } from "../models/journaling_models.js";

const journal = express.Router();

// POST /journal/post
journal.post("/post", async (req, res) => {
    try {
        const { user_id, emotion_tags, timestamp, user_response } = req.body;
        const entry = await addJournalEntry({ user_id, emotion_tags, timestamp, user_response });
        res.json(entry);
    } catch (err) {
        res.status(500).json({
            error: "Failed to add journal",
            details: err.message,
        });
    }
});

export default journal;