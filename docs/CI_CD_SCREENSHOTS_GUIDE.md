# CI/CD Screenshots Guide — Practical 12

This guide outlines the exact screenshots required for lab journal submission demonstrating the GitHub Actions CI Pipeline.

---

### Screenshot 1: CI Workflow Configuration (`ci.yml`) in VS Code
- **Where**: Open `.github/workflows/ci.yml` in VS Code.
- **What to capture**:
  - The editor showing the full file contents.
  - The triggers (`on: push, pull_request`).
  - The two defined jobs: `backend-tests` (with the MongoDB service container) and `frontend-build`.
- **Caption**: `Figure 12.1: GitHub Actions CI workflow definition (.github/workflows/ci.yml)`.

---

### Screenshot 2: Successful CI Pipeline Execution (Green Check)
- **Where**: GitHub Repository -> **Actions** tab -> Select latest successful workflow run.
- **What to capture**:
  - The run header showing **All jobs have passed** with a green checkmark icon.
  - The job overview showing both `Backend Tests` (green check) and `Frontend Build` (green check).
  - Completed run time and commit SHA.
- **Caption**: `Figure 12.2: Automated CI pipeline passing both backend tests and frontend build on GitHub Actions`.

---

### Screenshot 3: Deliberate Test Failure & Detailed Failure Log (Red X)
- **Where**: GitHub Repository -> **Actions** tab -> Select the deliberately failed run -> Click on `Backend Tests`.
- **What to capture**:
  - The red ❌ badge indicating build failure.
  - The expanded log section for **Run backend tests**.
  - The exact Jest assertion failure in console output (e.g. `Received 200, Expected 500`).
- **Caption**: `Figure 12.3: CI pipeline catching regression and failing build with stack trace log`.

---

### Screenshot 4: GitHub Actions Workflow History
- **Where**: GitHub Repository -> **Actions** tab (main listing view).
- **What to capture**:
  - The list of recent workflow runs showing progression (e.g., initial pass, deliberate failure, fix commit pass).
  - Demonstrates continuous integration history and commit traceability.
- **Caption**: `Figure 12.4: GitHub Actions commit history showing test validation across commits`.
