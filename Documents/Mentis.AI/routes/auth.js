const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login, generateToken } = require('../auth/authController');

// Email/Password Auth
router.post('/register', register);
router.post('/login', login);

//  Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ user: req.user, token });
  }
);

// Export after ALL routes
module.exports = router;
