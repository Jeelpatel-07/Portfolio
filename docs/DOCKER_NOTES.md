# Docker Notes — Practical 11

## Why `mongodb://mongodb:27017` instead of `localhost`?

In Docker Compose, each service runs in its own container with its own network namespace.
`localhost` inside the backend container refers to the backend container itself — NOT the
MongoDB container. Docker Compose creates a shared network where services can reach each
other **by service name**. So `mongodb` (the service name in docker-compose.yml) resolves
to the MongoDB container's IP address within the `portfolio-network`.

## EXPOSE vs ports mapping

- **EXPOSE** (in Dockerfile): A documentation directive that tells Docker which port the
  container app listens on internally. It does NOT publish the port to the host.
- **ports** (in docker-compose.yml): Actually maps a host port to a container port.
  `"5000:5000"` means host port 5000 → container port 5000. Without this mapping,
  the service is only accessible to other containers on the same network.

## Why node_modules must be in .dockerignore

1. **Image size**: node_modules can be 200MB+. Copying it into the build context makes
   the Docker image unnecessarily large and slows down builds.
2. **Platform mismatch**: node_modules compiled on Windows may contain native binaries
   that won't work inside a Linux container (Alpine). `RUN npm install` inside the
   Dockerfile installs the correct Linux-compatible versions.
3. **Build cache**: Docker can cache the `npm install` layer. If you copy node_modules,
   any file change in the project invalidates this cache.

## Docker Commands Reference

```bash
# Build and start all services
docker-compose up --build

# Start in detached (background) mode
docker-compose up --build -d

# Check running containers
docker ps

# View logs for a specific service
docker-compose logs backend
docker-compose logs -f backend   # follow/tail logs

# Stop all services
docker-compose down

# Stop and remove volumes (clears MongoDB data)
docker-compose down -v

# Rebuild a single service
docker-compose build backend
```

## Service Architecture

```
┌─────────────────────────────────────────────┐
│            portfolio-network                │
│                                             │
│  ┌──────────────┐    ┌──────────────┐       │
│  │   frontend    │    │   backend    │       │
│  │  (nginx:80)   │───▶│  (node:5000) │       │
│  │  Host: 5173   │    │  Host: 5000  │       │
│  └──────────────┘    └──────┬───────┘       │
│                             │               │
│                      ┌──────▼───────┐       │
│                      │   mongodb    │       │
│                      │  (mongo:27017)│       │
│                      │  Host: 27017  │       │
│                      └──────────────┘       │
│                             │               │
│                      ┌──────▼───────┐       │
│                      │  mongo-data  │       │
│                      │  (volume)    │       │
│                      └──────────────┘       │
└─────────────────────────────────────────────┘
```
