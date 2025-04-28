import pool from './db.js';

async function createChatResponsesTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS chat_responses (
                user_id INTEGER PRIMARY KEY,
                message TEXT NOT NULL,
                response TEXT NOT NULL,
                emotion_data JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await pool.query(query);
        console.log('Chat responses table created successfully');
    } catch (error) {
        console.error('Error creating chat responses table:', error);
    } finally {
        await pool.end();
    }
}

createChatResponsesTable(); 