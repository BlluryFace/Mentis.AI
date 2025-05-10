import express from "express"
import journal from "./routes/journaling.js"
import chatbot from "./routes/chatbot.js"
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Routes
app.use('/journal', journal)
app.use('/api', chatbot)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})