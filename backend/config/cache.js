// Practical 9: Centralized cache configuration
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
module.exports = cache;
