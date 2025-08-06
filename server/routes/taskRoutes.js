import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import queries from '../database/queries.js';

const router = express.Router();

// Get all tasks for authenticated user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const { property_id, status } = req.query;
    let query, params;
    
    if (property_id && status) {
      query = queries.tasks.findByPropertyAndStatus;
      params = [property_id, status];
    } else if (property_id) {
      query = queries.tasks.findByPropertyId;
      params = [property_id];
    } else if (status) {
      query = queries.tasks.findByUserAndStatus;
      params = [req.user.id, status];
    } else {
      query = queries.tasks.findByUserId;
      params = [req.user.id];
    }
    
    const result = await req.app.locals.db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single task
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await req.app.locals.db.query(queries.tasks.findById, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const task = result.rows[0];
    
    // Check if user owns this task
    if (task.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new task
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { property_id, title, description, status = 'pending' } = req.body;
    
    // Verify user owns the property
    const propertyResult = await req.app.locals.db.query(queries.properties.findById, [property_id]);
    if (propertyResult.rows.length === 0 || propertyResult.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Property not found or access denied' });
    }
    
    const result = await req.app.locals.db.query(
      queries.tasks.create,
      [property_id, req.user.id, title, description, status]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    const result = await req.app.locals.db.query(
      queries.tasks.update,
      [req.params.id, title, description, status, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update task status only
router.patch('/:id/status', isAuthenticated, async (req, res) => {
  try {
    const { status } = req.body;
    
    const result = await req.app.locals.db.query(
      queries.tasks.updateStatus,
      [req.params.id, status, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete task
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await req.app.locals.db.query(
      queries.tasks.delete,
      [req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get tasks by property
router.get('/property/:property_id', isAuthenticated, async (req, res) => {
  try {
    // Verify user owns the property
    const propertyResult = await req.app.locals.db.query(queries.properties.findById, [req.params.property_id]);
    if (propertyResult.rows.length === 0 || propertyResult.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'Property not found or access denied' });
    }
    
    const result = await req.app.locals.db.query(queries.tasks.findByPropertyId, [req.params.property_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks by property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;