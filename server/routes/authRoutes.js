const express = require('express');
const passport = require('passport');
const { users, properties, tasks } = require('../database/queries');

const router = express.Router();

//post /signup
router.post('/signup', async (req, res) => {
  console.log('[SIGNUP] Received body:', req.body);
  const { username, email, password_hash } = req.body;

  //chedck if username exists
  const existingUser = users.findByUsername(username);
  // const existingUser = await req.app.locals.db.query(queries.users.findByEmail, [email]);
  if (existingUser) {
    console.log('[SIGNUP] Looking for name:', username);
    console.log('[SIGNUP] Found:', existingUser);
    return res.status(409).json({ error: 'User already exists' });
  }

  try {
    //add user to in memory store
    const user = await users.create(username, email, password_hash);

    //log user in (create session)
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login failed after signup' });
      return res.status(200).json({ message: 'Signed up and logged in', user });
    });

  } catch (err) {
    console.error('[SIGNUP ERROR]', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//POST /login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: 'Server error during login' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    //log in (create session)
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Login failed' });
      return res.status(200).json({ message: 'Logged in successfully', user });
    });
  })(req, res, next);
});

//get /logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out' });
  });
});

module.exports = router;