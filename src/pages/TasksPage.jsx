import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, completionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const [filter, setFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAIError] = useState('');
  const [isAIGenerated, setIsAIGenerated] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'other'
  });

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Show toast with auto-dismiss
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  // Fetch tasks and stats
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [tasksRes, statsRes] = await Promise.all([api.getTasks(), api.getTaskStats()]);
      setTasks(tasksRes.data);
      setStats(statsRes.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Practical 13: AI Description Suggestion
  const handleAISuggest = async () => {
    if (!form.title.trim()) {
      alert('Enter a title first');
      return;
    }
    setIsAILoading(true);
    setAIError('');
    try {
      const res = await api.generateAIDescription(form.title);
      if (res.success && res.description) {
        setForm(prev => ({ ...prev, description: res.description }));
        setIsAIGenerated(true);
      } else {
        setAIError('AI unavailable, please type manually.');
      }
    } catch (err) {
      setAIError('Failed to reach AI service.');
    } finally {
      setIsAILoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.createTask(form);
      setTasks(prev => [res.data, ...prev]);
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1,
        completionRate: prev.total + 1 > 0
          ? Math.round((prev.completed / (prev.total + 1)) * 100)
          : 0
      }));
      setForm({ title: '', description: '', priority: 'medium', category: 'other' });
      setIsAIGenerated(false);
      setAIError('');
      showToast('Task created successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle task completed
  const handleToggle = async (task) => {
    try {
      const res = await api.updateTask(task._id, { completed: !task.completed });
      setTasks(prev => prev.map(t => t._id === task._id ? res.data : t));
      const newCompleted = res.data.completed ? stats.completed + 1 : stats.completed - 1;
      setStats(prev => ({
        ...prev,
        completed: newCompleted,
        pending: prev.total - newCompleted,
        completionRate: prev.total > 0 ? Math.round((newCompleted / prev.total) * 100) : 0
      }));
      showToast(`Task ${res.data.completed ? 'completed' : 'reopened'}!`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const deletedTask = tasks.find(t => t._id === taskId);
      await api.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t._id !== taskId));
      const wasCompleted = deletedTask?.completed;
      setStats(prev => {
        const newTotal = prev.total - 1;
        const newCompleted = wasCompleted ? prev.completed - 1 : prev.completed;
        return {
          ...prev,
          total: newTotal,
          completed: newCompleted,
          pending: newTotal - newCompleted,
          completionRate: newTotal > 0 ? Math.round((newCompleted / newTotal) * 100) : 0
        };
      });
      showToast('Task deleted successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <motion.div
      className="tasks-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Toast banner */}
      {toast.message && (
        <div className={`toast-banner ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="tasks-header">
        <h1 className="page-title">Task Manager</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Manage your tasks efficiently
        </p>
      </div>

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="stat-pill">
          <span className="stat-pill-label">Total</span>
          <span className="stat-pill-value">{stats.total}</span>
        </div>
        <div className="stat-pill completed">
          <span className="stat-pill-label">Completed</span>
          <span className="stat-pill-value">{stats.completed}</span>
        </div>
        <div className="stat-pill pending">
          <span className="stat-pill-label">Pending</span>
          <span className="stat-pill-value">{stats.pending}</span>
        </div>
        <div className="stat-pill rate">
          <span className="stat-pill-label">Progress</span>
          <span className="stat-pill-value">{stats.completionRate}%</span>
        </div>
      </div>

      {/* Add task form */}
      <form className="tasks-form" onSubmit={handleSubmit}>
        <div className="tasks-form-row">
          <input
            type="text"
            placeholder="Task title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            maxLength={100}
            required
          />
          <div className="description-input-group" style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                if (isAIGenerated) setIsAIGenerated(false);
              }}
              rows="1"
              style={{ flex: 1, resize: 'vertical' }}
            />
            <button
              type="button"
              className="ai-suggest-btn"
              onClick={handleAISuggest}
              disabled={isAILoading}
            >
              {isAILoading ? 'Thinking...' : '✨ AI Suggest'}
            </button>
          </div>
        </div>
        {aiError && <div className="ai-error">{aiError}</div>}
        {isAIGenerated && (
          <div className="ai-disclaimer">
            AI-generated — please review and edit.
          </div>
        )}
        <div className="tasks-form-row">
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && ` (${tasks.length})`}
            {f === 'active' && ` (${tasks.filter(t => !t.completed).length})`}
            {f === 'completed' && ` (${tasks.filter(t => t.completed).length})`}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="page-loader">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="tasks-error">
          <p>⚠️ {error}</p>
          <button className="btn btn-primary" onClick={fetchData}>Retry</button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredTasks.length === 0 && (
        <div className="tasks-empty">
          <p>🎯 {filter === 'all' ? 'No tasks yet. Add your first task above!' : `No ${filter} tasks.`}</p>
        </div>
      )}

      {/* Task list */}
      {!loading && !error && filteredTasks.length > 0 && (
        <div className="tasks-list">
          {filteredTasks.map(task => (
            <motion.div
              key={task._id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              layout
            >
              <div className="task-item-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                  className="task-checkbox"
                />
                <div className="task-item-content">
                  <h3 className="task-item-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-item-desc">{task.description}</p>
                  )}
                  <div className="task-item-meta">
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority}
                    </span>
                    <span className="category-badge">{task.category}</span>
                    {task.createdAt && (
                      <span className="task-date">{formatDate(task.createdAt)}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="task-delete-btn"
                onClick={() => handleDelete(task._id)}
                title="Delete task"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default TasksPage;
