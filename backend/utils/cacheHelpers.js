// Practical 9: Cache utility helpers for tracking hits/misses
const cache = require('../config/cache');

// Global counters for cache performance tracking
let hits = 0;
let misses = 0;

// Generate a cache key scoped to a specific user
const getCacheKey = (userId) => `tasks_${userId}`;

// Invalidate (delete) a user's cached tasks
const invalidateUserCache = (userId) => {
  const key = getCacheKey(userId);
  cache.del(key);
  console.log(`[Cache] Invalidated cache for user: ${userId}`);
};

// Track a cache HIT
const trackHit = () => {
  hits++;
  console.log(`[Cache] HIT — Total hits: ${hits}, misses: ${misses}`);
};

// Track a cache MISS
const trackMiss = () => {
  misses++;
  console.log(`[Cache] MISS — Total hits: ${hits}, misses: ${misses}`);
};

// Get cache performance statistics
const getCacheStats = () => {
  const total = hits + misses;
  const hitRate = total > 0 ? ((hits / total) * 100).toFixed(2) : '0.00';
  return {
    hits,
    misses,
    total,
    hitRate: `${hitRate}%`,
    cacheKeys: cache.keys().length,
    nodeCacheStats: cache.getStats()
  };
};

module.exports = {
  getCacheKey,
  invalidateUserCache,
  trackHit,
  trackMiss,
  getCacheStats
};
