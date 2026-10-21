// Practical 9: Caching benchmark
// To benchmark:
//   1. GET /api/tasks 5x → note response times in Postman (Thunder Client)
//   2. First call = MISS (source: database)
//   3. Next 4 calls within 60s = HIT (source: cache)
//   4. POST /api/tasks → cache invalidated
//   5. GET /api/tasks again = MISS

const Task = require('../models/Task');
const cache = require('../config/cache');
const { getCacheKey, invalidateUserCache, trackHit, trackMiss } = require('../utils/cacheHelpers');

// Practical 10: EventEmitter for async task notifications
const taskEvents = require('../events/taskEvents');

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
// @access  Private
const getAllTasks = async (req, res, next) => {
  try {
    const key = getCacheKey(req.user.id);
    const cached = cache.get(key);

    // Practical 9: Return cached data on HIT
    if (cached) {
      trackHit();
      return res.json({
        success: true,
        source: 'cache',
        count: cached.count,
        total: cached.total,
        data: cached.data
      });
    }

    // Cache MISS — fetch from database
    trackMiss();
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Store in cache
    const cachePayload = { count: tasks.length, total: tasks.length, data: tasks };
    cache.set(key, cachePayload);

    res.json({
      success: true,
      source: 'database',
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    const task = await Task.create({
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      category: category || 'other',
      dueDate: dueDate || null,
      user: req.user.id
    });

    // Practical 9: Invalidate cache after write
    invalidateUserCache(req.user.id);

    // Send response FIRST
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });

    // Practical 10: Emit event AFTER response (proves non-blocking)
    console.log(`[API] Response sent at ${new Date().toISOString()}`);
    taskEvents.emit('task-created', task);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Practical 9: Invalidate cache after write
    invalidateUserCache(req.user.id);

    // Send response FIRST
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });

    // Practical 10: Emit event AFTER response
    taskEvents.emit('task-updated', task);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    // Practical 9: Invalidate cache after write
    invalidateUserCache(req.user.id);

    // Send response FIRST
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });

    // Practical 10: Emit event AFTER response
    taskEvents.emit('task-deleted', task);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete all tasks for authenticated user
// @route   DELETE /api/tasks
// @access  Private
const deleteAllTasks = async (req, res, next) => {
  try {
    const result = await Task.deleteMany({ user: req.user.id });

    // Practical 9: Invalidate cache after write
    invalidateUserCache(req.user.id);

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} tasks successfully`,
      count: result.deletedCount
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task statistics for authenticated user
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    };

    res.json({
      success: true,
      stats: {
        total,
        completed,
        pending,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        byPriority
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getTaskStats
};