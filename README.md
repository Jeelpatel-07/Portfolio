# Portfolio + Task Manager — Jeel Parsaniya

A modern, production-grade AI/ML engineer portfolio integrated with a full-stack MERN task manager. This project demonstrates comprehensive software engineering and web development capabilities across all 13 practicals—ranging from component-driven frontend architecture and RESTful backend APIs to MongoDB persistence, JWT authentication, in-memory caching, non-blocking asynchronous event handling, containerized Docker deployment, automated GitHub Actions CI/CD pipelines, and OpenAI API integration with graceful degradation.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Framer Motion, Vanilla CSS, React Icons
- **Backend**: Node.js, Express.js, Mongoose, NodeCache, EventEmitter, Supertest, Jest
- **Database**: MongoDB (Local & Dockerized)
- **Security & Authentication**: JSON Web Tokens (JWT), Bcrypt.js, CORS, HTTP Header Validation
- **DevOps & Containerization**: Docker, Docker Compose, Nginx, GitHub Actions (CI/CD)
- **Artificial Intelligence**: OpenAI API (`gpt-4o-mini`)

---

## 📋 Practicals 1–13 Checklist

- [x] **P1** — React + Vite component architecture with modular UI elements and responsive layout.
- [x] **P2** — React Router multi-page navigation and `useState` state management (forms, theme toggle).
- [x] **P3** — GitHub REST API integration with real-time repository fetching, loading skeletons, and error handling.
- [x] **P4** — Express REST API implementation with comprehensive CRUD endpoints and custom middleware.
- [x] **P5** — MongoDB + Mongoose schema modeling, strict field validations, and relationship indexing.
- [x] **P6** — Full-stack integration connecting React client to Express REST API and MongoDB database.
- [x] **P7** — JWT authentication featuring user registration, bcrypt password hashing, login, and protected routes.
- [x] **P8** — Performance optimization via `React.lazy` and `Suspense` route code-splitting into distinct chunks.
- [x] **P9** — In-memory caching using `node-cache` with automatic invalidation on writes and a `/cache-stats` endpoint.
- [x] **P10** — Asynchronous non-blocking notifications powered by Node.js `EventEmitter` singleton and event listeners.
- [x] **P11** — Multi-container Docker orchestration (`mongodb`, `backend`, `frontend`) connected via bridge network.
- [x] **P12** — Automated GitHub Actions CI pipeline executing backend test suites and frontend builds on push and pull requests.
- [x] **P13** — OpenAI API integration for intelligent task description generation featuring graceful degradation.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally on `localhost:27017` (or via Docker)
- npm package manager

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Backend server starts at `http://localhost:5000`.*

### 2. Frontend Setup
```bash
# In project root
npm install
npm run dev
```
*Frontend application starts at `http://localhost:5173`.*

### 3. Docker Compose (Alternative All-in-One Setup)
```bash
# Starts MongoDB, Backend, and Frontend containers simultaneously
docker-compose up --build
```
*Frontend will be available at `http://localhost:5173`, Backend at `http://localhost:5000`, and MongoDB at `localhost:27017`.*

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and update the values:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Frontend (Optional)
```env
VITE_API_URL=http://localhost:5000
```

> **Note**: `.env` is strictly gitignored in both root and backend directories to prevent sensitive secret leaks.

---

## 📚 Technical Documentation & Lab Guides

Detailed lab journal documentation and screenshot verification guides are organized under the [`/docs`](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs) folder:

- [docs/README_PROJECT.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/README_PROJECT.md) — Comprehensive documentation index
- [docs/CI_CD_NOTES.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/CI_CD_NOTES.md) — CI vs CD principles and GitHub Actions workflow architecture
- [docs/CI_CD_SCREENSHOTS_GUIDE.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/CI_CD_SCREENSHOTS_GUIDE.md) — Exact screenshot instructions for CI pipeline runs
- [docs/AI_INTEGRATION_NOTES.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/AI_INTEGRATION_NOTES.md) — Security patterns, graceful degradation, and responsible AI
- [docs/AI_SCREENSHOTS_GUIDE.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/AI_SCREENSHOTS_GUIDE.md) — UI and error fallback screenshot guide for AI integration
- [docs/DOCKER_NOTES.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/DOCKER_NOTES.md) — Multi-container networking, EXPOSE vs ports, and volume persistence
- [docs/PRACTICAL_SCREENSHOTS_CHECKLIST.md](file:///c:/Users/ADMIN/OneDrive/Desktop/professional-portfolio/docs/PRACTICAL_SCREENSHOTS_CHECKLIST.md) — Verification checklist for Practicals 9, 10, and 11

---

## 👤 Author

- **Name**: Jeel Parsaniya
- **Email**: [jeelpatel4428@gmail.com](mailto:jeelpatel4428@gmail.com)
- **GitHub**: [github.com/Jeelpatel-07](https://github.com/Jeelpatel-07)
- **Repository**: [github.com/Jeelpatel-07/Portfolio](https://github.com/Jeelpatel-07/Portfolio)
