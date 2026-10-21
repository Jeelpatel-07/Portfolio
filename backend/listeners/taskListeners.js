// Practical 10: Event listeners for asynchronous task processing
const taskEvents = require('../events/taskEvents');

// Listener 1: task-created
taskEvents.on('task-created', (task) => {
  console.log('\n════════ NOTIFICATION [task-created] ════════');
  console.log(`[Notification] Task "${task.title}" created`);
  console.log(`[Timestamp] ${new Date().toISOString()}`);
  console.log(`[Priority] ${task.priority}`);
  console.log(`[Category] ${task.category}`);
  console.log('══════════════════════════════════════════════\n');
});

// Listener 2: task-updated
taskEvents.on('task-updated', (task) => {
  console.log(`[Notification] Task "${task.title}" updated at ${new Date().toISOString()}`);
});

// Listener 3: task-deleted
taskEvents.on('task-deleted', (task) => {
  console.log(`[Notification] Task "${task.title}" deleted at ${new Date().toISOString()}`);
});

// Listener 4: Simulated slow listener to prove async/non-blocking behavior
// This fires ~2s AFTER the API response — visible proof in console screenshots
taskEvents.on('task-created', (task) => {
  setTimeout(() => {
    console.log(`[Slow Listener] Task "${task.title}" notification processed after 2s`);
  }, 2000);
});

// Error listener — REQUIRED because EventEmitter throws on unhandled 'error'
taskEvents.on('error', (err) => {
  console.error('[TaskEvents Error]', err.message);
});

module.exports = taskEvents;
