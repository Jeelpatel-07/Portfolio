jest.setTimeout(15000);

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Connect to MongoDB before running tests
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb_test';
    await mongoose.connect(mongoUri);
  }
});

// Clean up after all tests
afterAll(async () => {
  try {
    // Clean test data
    const User = require('../models/User');
    await User.deleteMany({ email: 'testuser@example.com' });
    
    const Task = require('../models/Task');
    await Task.deleteMany({ title: 'Test Task from Jest' });
  } catch (err) {
    console.error('Error in test cleanup:', err.message);
  } finally {
    await mongoose.connection.close();
  }
});

describe('API Tests', () => {
  let authToken;

  // Test 1: Health check
  test('GET /api/health returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  // Test 2: Register returns 201 with token
  test('POST /api/auth/register with valid body returns 201 and has token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  // Test 3: Tasks without token returns 401
  test('GET /api/tasks without token returns 401', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });

  // Test 4: Create task with token returns 201
  test('POST /api/tasks with token returns 201', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task from Jest',
        description: 'Created during testing',
        priority: 'high'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Task from Jest');
  });
});
