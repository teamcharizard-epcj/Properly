const queries = {
  // user queries
  users: {
    create: 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
    findByEmail: 'SELECT * FROM users WHERE email = $1',
    findByUsername: 'SELECT * FROM users WHERE username = $1',
    findById: 'SELECT id, username, email, created_at FROM users WHERE id = $1',
    findAll: 'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC'
  },

  // property queries
  properties: {
    create: 'INSERT INTO properties (user_id, name, address, description) VALUES ($1, $2, $3, $4) RETURNING *',
    findById: 'SELECT * FROM properties WHERE id = $1',
    findByUserId: 'SELECT * FROM properties WHERE user_id = $1 ORDER BY created_at DESC',
    findAll: 'SELECT p.*, u.username FROM properties p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC',
    update: 'UPDATE properties SET name = $2, address = $3, description = $4 WHERE id = $1 AND user_id = $5 RETURNING *',
    delete: 'DELETE FROM properties WHERE id = $1 AND user_id = $2 RETURNING *'
  },

  // task queries
  tasks: {
    create: 'INSERT INTO tasks (property_id, user_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    findById: 'SELECT t.*, p.name as property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id WHERE t.id = $1',
    findByPropertyId: 'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.property_id = $1 ORDER BY t.created_at DESC',
    findByUserId: 'SELECT t.*, p.name as property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.user_id = $1 ORDER BY t.created_at DESC',
    findByStatus: 'SELECT t.*, p.name as property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id WHERE t.status = $1 ORDER BY t.created_at DESC',
    findByPropertyAndUser: 'SELECT t.*, p.name as property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.property_id = $1 AND t.user_id = $2 ORDER BY t.created_at DESC',
    findByUserAndStatus: 'SELECT t.*, p.name as property_name FROM tasks t JOIN properties p ON t.property_id = p.id WHERE t.user_id = $1 AND t.status = $2 ORDER BY t.created_at DESC',
    findByPropertyAndStatus: 'SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.property_id = $1 AND t.status = $2 ORDER BY t.created_at DESC',
    findAll: 'SELECT t.*, p.name as property_name, u.username FROM tasks t JOIN properties p ON t.property_id = p.id JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC',
    update: 'UPDATE tasks SET title = $2, description = $3, status = $4, priority = $5, due_date = $6 WHERE id = $1 AND user_id = $7 RETURNING *',
    updateStatus: 'UPDATE tasks SET status = $2, completed_at = CASE WHEN $2 = \'completed\' THEN CURRENT_TIMESTAMP ELSE NULL END WHERE id = $1 AND user_id = $3 RETURNING *',
    delete: 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *'
  }
};

module.exports = queries;