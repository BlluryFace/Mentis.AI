const pool = require("./db");

(async () => {
    try {
        console.log("📝 Inserting test data...");

        // Insert into Users
        await pool.query("INSERT INTO users (name, email, password) VALUES ('Bruce Wayne', 'bruce@example.com', 'batman123');");

        // Insert into Chatbot Conversations
        await pool.query("INSERT INTO chatbot_conversations (user_id, user_message, ai_response) VALUES (1, 'Hello AI!', 'Hello, how can I assist you today?');");

        // Insert into Journal Entries
        await pool.query("INSERT INTO journal_entries (user_id, ai_prompt, user_response) VALUES (1, 'How was your day?', 'It was great!');");

        // Insert into Self-Reflection Insights
        await pool.query("INSERT INTO self_reflection_insights (user_id, ai_question, user_answer) VALUES (1, 'What made you happy today?', 'Spending time with friends.');");

        console.log("✅ Test data inserted successfully.");
    } catch (err) {
        console.error("❌ Query error:", err);
    } finally {
        await pool.end(); // Close connection
    }
})();
