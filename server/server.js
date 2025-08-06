import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import queries from './database/queries.js';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../')));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/properly-db'
});

// Make pool available to routes
app.locals.db = pool;

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('Login attempt:', { username, password: '***' }); // Debug log
      const result = await pool.query(queries.users.findByUsername, [username]);
      console.log('Database result:', result.rows); // Debug log
      
      if (result.rows.length === 0) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      
      const user = result.rows[0];
      console.log('Stored hash:', user.hashed_password); // Debug log
      const isValid = await bcrypt.compare(password, user.hashed_password);
      console.log('Password valid:', isValid); // Debug log
      
      if (isValid) {
        return done(null, { id: user.id, username: user.username, email: user.email });
      } else {
        return done(null, false, { message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Passport error:', error); // Debug log
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(queries.users.findById, [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

// Routes
app.use('/authRoutes', authRoutes);
app.use('/propertyRoutes', propertyRoutes);
app.use('/taskRoutes', taskRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Property Management!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});