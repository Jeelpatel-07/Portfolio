const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validateMiddleware');

// Content-Type validation middleware for POST/PUT (Practical 4 requirement)
const validateContentType = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.toLowerCase().includes('application/json')) {
      return res.status(415).json({
        success: false,
        message: 'Unsupported Media Type: Content-Type must be application/json'
      });
    }
  }
  next();
};

const { getCacheStats } = require('../utils/cacheHelpers');

// Practical 9: Cache stats endpoint (NOT protected — for quick Postman testing)
router.get('/cache-stats', (req, res) => {
  res.json({
    success: true,
    message: 'Cache statistics',
    stats: getCacheStats()
  });
});

// Apply protect middleware to ALL task routes below
router.use(protect);

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// GET /api/tasks/stats - Get task statistics (must be before /:id)
router.get('/stats', getTaskStats);

// GET /api/tasks/:id - Get single task
router.get('/:id', getTaskById);

// POST /api/tasks - Create new task (with Content-Type, input validation, and task validation)
router.post('/', validateContentType, validateTask, createTask);

// PUT /api/tasks/:id - Update task (with Content-Type validation)
router.put('/:id', validateContentType, updateTask);

// DELETE /api/tasks - Delete all tasks
router.delete('/', deleteAllTasks);

// DELETE /api/tasks/:id - Delete single task
router.delete('/:id', deleteTask);

module.exports = router;