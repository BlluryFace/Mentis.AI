require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// Strategies
require("./auth/googleAuth");

// Routes
const authRoutes = require("./routes/auth");             // Google OAuth
const localAuthRoutes = require("./routes/authLocal");   // Manual login/signup

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // your frontend
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", authRoutes);             // Google
app.use("/api/authlocal", localAuthRoutes);   // Manual

// Default route
app.get("/", (req, res) => {
  res.send("Mentis.AI Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
