import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../services/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatbot = express.Router();

/** 
 * POST api/chatbot/message 
 */
chatbot.post('/chatbot/message', async (req, res) => {
    try { 
        const { userId, message } = req.body; 

        // Valid req 
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Message is required'
            }); 
        }

        // Get converstation history if possible 
        const converstationHistory = req.session?.converstationHistory || [];

        // Prepare request data for Python script 
        const requestData = {
            userId: userId ||' anonymous', 
            message, 
            converstationHistory
        };

        const scriptPath = path.join(__dirname, '../chatbot/chat.py');
        const pythonPath = 'python3'; 

        console.log('Executing Python script:', scriptPath);
        const pythonProcess = spawn(pythonPath, [scriptPath]);

        pythonProcess.stdin.write(JSON.stringify(requestData));
        pythonProcess.stdin.end(); 

        // Collect response data 
        let responseData = '';
        pythonProcess.stdout.on('data', (data) => {
            responseData += data.toString();
            console.log('Python output:', data.toString());
        });

        // Handle error 
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
        });

        // Process completed 
        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                return res.status(500).json({ 
                    success: false, 
                    error: `Python process exited with code ${code}`
                });
            }

            try {
                // Parse res 
                const aiResponse = JSON.parse(responseData);

                // Check for errors
                if (aiResponse.error) {
                    return res.status(500).json({
                        success: false,
                        error: aiResponse.error
                    });
                }

                // Update conversation history
                if (req.session) {
                    // Add current exchange to history 
                    const updatedHistory = [ 
                        ...conversationHistory,
                        { role: 'user', content: message },
                        { role: 'assistant', content: aiResponse.reply }
                    ];
                    
                    // Keep the last 15 messages only
                    req.session.conversationHistory = updatedHistory.slice(-15);
                }

                // Save response to database
                const query = `
                    INSERT INTO chat_responses (user_id, message, response, emotion_data)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (user_id) 
                    DO UPDATE SET 
                        message = $2,
                        response = $3,
                        emotion_data = $4,
                        created_at = CURRENT_TIMESTAMP
                `;
                
                await pool.query(query, [
                    userId,
                    message,
                    aiResponse.reply,
                    aiResponse.emotion
                ]);

                return res.status(200).json({
                    success: true, 
                    data: aiResponse
                });
            } catch (error) {
                console.error('Error processing response:', error);
                return res.status(500).json({
                    success: false,
                    error: `Failed to process response: ${error.message}`
                });
            }
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
        });
    }
});

/**
 * GET /api/chatbot/response
 * Get the most recent response from the AI chatbot for a specific user
 */
chatbot.get('/chatbot/response', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'User ID is required'
            });
        }

        const query = `
            SELECT message, response, emotion_data, created_at
            FROM chat_responses
            WHERE user_id = $1
        `;

        const result = await pool.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'No response found for this user'
            });
        }

        return res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching chat response:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
});

export default chatbot;

