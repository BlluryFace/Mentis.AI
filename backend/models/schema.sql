-- ===============================================
-- 🚀 Mentis.AI Database Schema Setup Instructions
-- ===============================================
-- This schema.sql file creates all necessary tables 
-- for local development and feature testing.
-- 
-- 📌 How to use:
-- 1. Ensure PostgreSQL is installed on your machine.
-- 2. Create a database manually or via terminal:
--      $ createdb mentis_ai
-- 3. Run the schema script to populate tables:
--      $ psql -U <your_username> -d mentis_ai -f backend/models/schema.sql
-- 
-- 🔐 Make sure your .env file is properly configured:
--   DB_USER=your_username
--   DB_PASSWORD=your_password
--   DB_HOST=localhost
--   DB_PORT=5432
--   DB_NAME=mentis_ai
--
-- ✅ This schema includes:
--   - users
--   - journal_entries
--   - chatbot_conversations
--   - self_reflection_insights
--
-- Please DO NOT modify structure without discussion.
-- For questions, contact the database lead or open an issue.
-- ===============================================


-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mood_history JSONB,
    chat_history JSONB,
    journal_entries JSONB
);

-- Journal Entries Table
CREATE TABLE IF NOT EXISTS journal_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ai_prompt TEXT,
    user_response TEXT,
    emotion_tags TEXT[]
);

-- Chatbot Conversations Table
CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_message TEXT,
    ai_response TEXT,
    sentiment TEXT
);

-- Self-Reflection Insights Table
CREATE TABLE IF NOT EXISTS self_reflection_insights(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ai_question TEXT,
    user_answer TEXT
);