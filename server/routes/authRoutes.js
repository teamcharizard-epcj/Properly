import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import queries from '../database/queries.js';

const router = express.Router();

// register new user with logs
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registration attempt:', { username, email }); // Debug log
    
    // Check if user already exists
    const existingUser = await req.app.locals.db.query(queries.users.findByEmail, [email]);
    console.log('Existing user check:', existingUser.rows.length); // Debug log
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    console.log('Creating user with query:', queries.users.create); // Debug log
    const result = await req.app.locals.db.query(queries.users.create, [username, email, hashedPassword]);
    console.log('User creation result:', result.rows); // Debug log
    
    const user = result.rows[0];
    
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ error: info.message || 'Login failed' });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login error' });
      }
      return res.json({ message: 'Login successful', user: req.user });
    });
  })(req, res, next);
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