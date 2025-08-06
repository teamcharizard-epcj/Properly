// All SQL queries for the application
const queries = {
  // User queries
  users: {
    create: 'INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING id, username, email',
    findByEmail: 'SELECT * FROM users WHERE email = $1',
    findByUsername: 'SELECT * FROM users WHERE username = $1',
    findById: 'SELECT * FROM users WHERE id = $1',
    findAll: 'SELECT id, username, email FROM users ORDER BY id DESC'
  },

  // Property queries
  properties: {
    create: 'INSERT INTO properties (user_id, property_name, address) VALUES ($1, $2, $3) RETURNING *',
    findById: 'SELECT * FROM properties WHERE id = $1',
    findByUserId: 'SELECT * FROM properties WHERE user_id = $1 ORDER BY id DESC',
    findAll: 'SELECT p.*, u.username FROM properties p JOIN users u ON p.user_id = u.id ORDER BY p.id DESC',
    update: 'UPDATE properties SET property_name = $2 WHERE id = $1 AND user_id = $3 RETURNING *',
    delete: 'DELETE FROM properties WHERE id = $1 AND user_id = $2 RETURNING *'
  },

  // Task queries
  tasks: {
    create: 'INSERT INTO tasks (property_id, user_id, title, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    findById: 'SELECT t.*, p.property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id WHERE t.id = $1',
    findByPropertyId: 'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.property_id = $1 ORDER BY t.id DESC',
    findByUserId: 'SELECT t.*, p.property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.user_id = $1 ORDER BY t.id DESC',
    findByStatus: 'SELECT t.*, p.property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id WHERE t.status = $1 ORDER BY t.id DESC',
    findByPropertyAndUser: 'SELECT t.*, p.property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.property_id = $1 AND t.user_id = $2 ORDER BY t.id DESC',
    findByUserAndStatus: 'SELECT t.*, p.property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.user_id = $1 AND t.status = $2 ORDER BY t.id DESC',
    findByPropertyAndStatus: 'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.property_id = $1 AND t.status = $2 ORDER BY t.id DESC',
    findAll: 'SELECT t.*, p.property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id ORDER BY t.id DESC',
    update: 'UPDATE tasks SET title = $2, description = $3, status = $4 WHERE id = $1 AND user_id = $5 RETURNING *',
    updateStatus: 'UPDATE tasks SET status = $2 WHERE id = $1 AND user_id = $3 RETURNING *',
    delete: 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *'
  }
};

export default queries;