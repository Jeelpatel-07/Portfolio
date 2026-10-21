// Practical 10: Custom EventEmitter for task events
const EventEmitter = require('events');

class TaskEventEmitter extends EventEmitter {}

const taskEvents = new TaskEventEmitter();

module.exports = taskEvents;
