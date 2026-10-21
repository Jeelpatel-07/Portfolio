# Practical Screenshots Checklist

## Practical 9 — In-Memory Caching with node-cache

### Screenshot 1: First GET /api/tasks (Cache MISS)
- Open Thunder Client / Postman
- Send GET `http://localhost:5000/api/tasks` with Bearer token
- Response body shows `"source": "database"`
- Note the response time (e.g., 45ms)

### Screenshot 2: Second GET /api/tasks (Cache HIT)
- Send the same GET request again (within 60 seconds)
- Response body shows `"source": "cache"`
- Note the faster response time (e.g., 5ms)

### Screenshot 3: Cache Stats
- Send GET `http://localhost:5000/api/tasks/cache-stats` (no auth needed)
- Response shows `hits`, `misses`, `hitRate` counts

### Screenshot 4: Cache Invalidation
- POST a new task → cache invalidated
- GET /api/tasks again → `"source": "database"` (MISS after invalidation)

### Screenshot 5: Backend Console (Cache Logs)
- Terminal shows `[Cache] MISS`, `[Cache] HIT`, `[Cache] Invalidated` logs

---

## Practical 10 — Asynchronous Processing with EventEmitter

### Screenshot 1: Console Output — Event Timing Proof
After POSTing a new task, the backend console shows this ORDER:
```
POST /api/tasks - 2024-...
[Cache] Invalidated cache for user: ...
[API] Response sent at 2024-...T...Z          ← FIRST (response sent)
════════ NOTIFICATION [task-created] ════════
[Notification] Task "..." created             ← SECOND (sync listener)
[Timestamp] ...
[Priority] ...
[Category] ...
══════════════════════════════════════════════
... (2 seconds later) ...
[Slow Listener] Task "..." notification processed after 2s  ← THIRD (async proof)
```
This proves: API response was sent BEFORE the listeners ran.

### Screenshot 2: Update Event
- PUT /api/tasks/:id to update a task
- Console shows: `[Notification] Task "..." updated at ...`

### Screenshot 3: Delete Event
- DELETE /api/tasks/:id to delete a task
- Console shows: `[Notification] Task "..." deleted at ...`

### Screenshot 4: EventEmitter Code
- Show the `listeners/taskListeners.js` file open in VS Code

---

## Practical 11 — Docker & Docker Compose

### Screenshot 1: Dockerfile (Backend)
- Open `backend/Dockerfile` in VS Code — show the full 7 lines

### Screenshot 2: Dockerfile (Frontend)
- Open `Dockerfile` in VS Code — show the multi-stage build

### Screenshot 3: docker-compose.yml
- Open `docker-compose.yml` — show all 3 services (mongodb, backend, frontend)

### Screenshot 4: Docker Running (if Docker Desktop is available)
```bash
docker-compose up --build
docker ps
```
- Screenshot of `docker ps` showing all 3 containers running

### Screenshot 5: Docker Not Available
- If Docker Desktop is not installed, just screenshot the Dockerfile + 
  docker-compose.yml files open in VS Code
- Add a note: "Docker Desktop not available on lab machine, 
  configuration files shown instead"
