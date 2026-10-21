# Task Management API

RESTful API for Task Management System built with Node.js and Express.

## Features
- ✅ Complete CRUD operations
- ✅ Request logging middleware
- ✅ Input validation
- ✅ Global error handling
- ✅ CORS enabled
- ✅ Health check endpoint

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| DELETE | `/api/tasks` | Delete all tasks |
| GET | `/api/health` | Health check |

## Setup

1. Install dependencies:
```bash
npm install