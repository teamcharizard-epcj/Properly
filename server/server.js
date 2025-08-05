require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); //build with pete
// const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/properly' });
require('./config/passportConfig');

const app = express();

//!middleware
//frontend requests (3000)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true //allow cookies/session
}));

// parse incoming json
app.use(express.json());

//session set up
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, //true in production with https
    httpOnly: true
  }
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// mount routes
app.use('/', authRoutes); // /signup, /login

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));