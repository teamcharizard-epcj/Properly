import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import queries from '../database/queries.js';

const router = express.Router();

// Get all properties for authenticated user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const result = await req.app.locals.db.query(queries.properties.findByUserId, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single property
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await req.app.locals.db.query(queries.properties.findById, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    const property = result.rows[0];
    
    // Check if user owns this property
    if (property.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new property
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { property_name, address } = req.body;
    
    const result = await req.app.locals.db.query(
      queries.properties.create, 
      [req.user.id, property_name, address]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update property
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { property_name } = req.body;
    
    const result = await req.app.locals.db.query(
      queries.properties.update,
      [req.params.id, property_name, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found or access denied' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete property
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const result = await req.app.locals.db.query(
      queries.properties.delete,
      [req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found or access denied' });
    }
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;