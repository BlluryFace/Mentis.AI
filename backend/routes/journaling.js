const express = require("express");
const router = express.Router;
const functions = require("../controllers/journailing_functions")
// This is for the button where the user submit their journal
// input: request body fields: user, emotion, date, message
router.post("/journal-post", async (req, res) => {
    try {
        const {user, emotion, date, message} = req.body;
        const result = functions.add_journal(user,
            emotion, date, message);
        res.json(result);
    } catch (err) {
        // Handle any errors that may have occurred
        res.status(500)
            .json({
                error: 'Failed to add journal',
                details: err.message });
    }
});