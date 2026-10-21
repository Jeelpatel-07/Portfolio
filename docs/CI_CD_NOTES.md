# CI/CD Pipeline Documentation — Practical 12

## 1. What is CI vs CD?

- **Continuous Integration (CI)**: The automated practice of frequently merging code changes into a central repository, followed by automated builds and test executions. The primary goal is to identify integration errors, regressions, and syntax issues as early as possible.
- **Continuous Delivery / Deployment (CD)**:
  - *Continuous Delivery*: Automatically preparing tested code for release so it can be deployed to staging or production at the push of a button.
  - *Continuous Deployment*: Automatically releasing every change that passes all stages of the production pipeline directly to customers without manual intervention.

---

## 2. Why Automated Tests on Every Push Catch Bugs Earlier

1. **Immediate Feedback**: Developers receive alerts within minutes of pushing code if an unexpected bug or breaking change was introduced.
2. **Reduced Debugging Surface**: Finding a regression right after a single commit is vastly easier than debugging weeks of accumulated changes before a release.
3. **Consistent Environment**: GitHub Actions runs on standardized clean virtual machines (`ubuntu-latest`), eliminating the *"it works on my machine"* syndrome.
4. **Enforced Quality Gates**: Pull requests cannot be merged if test suites or production builds fail.

---

## 3. Workflow Trigger Configuration

The pipeline defined in `.github/workflows/ci.yml` is triggered automatically on:
- Any `push` to the `main` or `master` branches.
- Any `pull_request` targeting the `main` or `master` branches.

```yaml
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
```

---

## 4. Pipeline Jobs Explained

The workflow runs two parallel, isolated jobs:

### Job A: `backend-tests`
- **Runner**: `ubuntu-latest`
- **Service Container**: Runs an isolated `mongo:6` container mapped to `27017:27017`, guaranteeing a clean, dedicated database for testing.
- **Steps**:
  1. Checks out source code (`actions/checkout@v4`).
  2. Sets up Node.js v18 environment (`actions/setup-node@v4`).
  3. Installs backend dependencies (`npm install` inside `./backend`).
  4. Runs Jest test suite (`npm test` in `./backend`) with:
     - `NODE_ENV=test`
     - `PORT=5000`
     - `MONGO_URI=mongodb://localhost:27017/taskdb_test`
     - `JWT_SECRET=test_secret_key_ci_only`
  5. Verifies all 4 integration tests (Health check, Registration, Auth guard 401, Task creation 201).

### Job B: `frontend-build`
- **Runner**: `ubuntu-latest`
- **Steps**:
  1. Checks out repository source code.
  2. Sets up Node.js v18.
  3. Installs root dependencies (`npm install`).
  4. Executes the Vite production build (`npm run build`).
  5. Validates JSX compilation, CSS bundling, and code splitting without errors.

---

## 5. How to Trigger a FAILED Run (Lab Demonstration)

To demonstrate automated failure detection for lab evaluation:
1. In `backend/tests/api.test.js`, intentionally change an expected assertion:
   ```javascript
   // Change 200 to 500
   expect(res.statusCode).toBe(500);
   ```
2. Commit and push:
   ```bash
   git commit -am "test: deliberate failure for CI demo"
   git push origin main
   ```
3. Navigate to your GitHub repository -> **Actions** tab.
4. The workflow will run, detect the assertion failure in `backend-tests`, and display a **Red ❌ (Failed)** badge with detailed error logs.

---

## 6. How to Trigger a PASSED Run

1. Revert the intentional error back to the passing assertion:
   ```javascript
   expect(res.statusCode).toBe(200);
   ```
2. Commit and push:
   ```bash
   git commit -am "fix: restore passing test assertion"
   git push origin main
   ```
3. In GitHub -> **Actions** tab, the workflow will re-execute both jobs and display a **Green ✔ (Passed)** checkmark.

---

## 7. Where to Monitor Pipeline Status

- **GitHub Repository**: Click the **Actions** tab at the top of your GitHub repository (`https://github.com/Jeelpatel-07/Portfolio/actions`).
- **Workflow Runs List**: Displays commit message, author, trigger branch, elapsed run time, and final status (Green check or Red X).
- **Job Details & Logs**: Click any specific run to inspect individual step logs (e.g. `Run backend tests`, `Build frontend`).
