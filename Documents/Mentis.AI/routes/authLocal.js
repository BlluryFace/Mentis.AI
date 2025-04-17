// routes/authLocal.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../auth/authController"); // ✅ CORRECT

router.post("/signup", register);  // POST /api/authlocal/signup
router.post("/login", login);      // POST /api/authlocal/login

module.exports = router;
