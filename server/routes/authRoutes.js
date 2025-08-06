import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import queries from '../database/queries.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await req.app.locals.db.query(queries.users.findByEmail, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const result = await req.app.locals.db.query(queries.users.create, [username, email, hashedPassword]);
    const user = result.rows[0];
    
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/auth/success',
  failureRedirect: '/api/auth/failure'
}));

// Login success
router.get('/success', (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

// Login failure
router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Login failed' });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;