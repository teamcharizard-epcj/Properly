const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//get helper functions to find users
const { findUserByName } = require('../models/userModel');

//confugure local nstrategy
passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = findUserByName(username);
    if (!user) return done(null, false, {message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  }
));

// what to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//get full user object back from session
passport.deserializeUser((id, done) => {
  const { users } = require('../models/uderModel');
  const user = users.find(u => u.id === id);
  done(null, user || false);
});