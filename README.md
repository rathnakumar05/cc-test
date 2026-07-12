# NBC Videos

A full-stack application that ingests NBC New York homepage top videos and provides a web interface to browse, view, and manage them.

## Architecture

```
Cloud Scheduler ──▶ Cloud Function (ingest) ──▶ Cloud SQL (PostgreSQL)
                                                       ▲
                                                       │
                    Cloud Run (NestJS API) ─────────────┘
                              ▲
                              │
                    Firebase Hosting (React SPA)
```

## Project Structure

| Directory    | Stack                    | Deployment         |
| ------------ | ------------------------ | ------------------ |
| `frontend/`  | React 19, TypeScript, Vite, TailwindCSS, Shadcn UI | Firebase Hosting   |
| `backend/`   | NestJS, TypeORM, PostgreSQL, Swagger | Cloud Run          |
| `function/`  | TypeScript, Google Cloud Functions Framework | Cloud Functions (gen2) |

## Frontend

React + TypeScript SPA built with Vite. Uses React Router for navigation, TanStack Query for data fetching, and Shadcn UI components.

```bash
cd frontend
npm install
npm run dev
```

## Backend

NestJS REST API with TypeORM for database access. Exposes a paginated videos endpoint with Swagger documentation. Uses a multi-stage Dockerfile with a separate migration target.

```bash
cd backend
npm install
npm run start:dev
```

### Migrations

```bash
npm run migration:gen --name=<migration-name>  # generate
npm run migration:run                           # apply
npm run migration:revert                        # rollback
```

## Cloud Function

Ingests videos from the NBC New York homepage endpoint via ScraperAPI proxy, parses the response, and inserts new records into Cloud SQL (PostgreSQL). Triggered on a schedule by Cloud Scheduler via HTTP POST.

```bash
cd function
npm install
npm run dev
```

### Environment Variables

| Variable         | Description                        |
| ---------------- | ---------------------------------- |
| `DB_HOST`        | Cloud SQL connection (Unix socket) |
| `DB_PORT`        | Database port (default `5432`)     |
| `DB_NAME`        | Database name                      |
| `DB_USERNAME`    | Database user (from Secret Manager)|
| `DB_PASSWORD`    | Database password (from Secret Manager) |
| `SCRAPERAPI_KEY` | ScraperAPI key (from Secret Manager) |

## Monorepo

All three components (`frontend/`, `backend/`, `function/`) live in a single repository as independent npm packages, each with its own `package.json` and build tooling. Path-filtered CI deploys only the component that changed.

## Trunk-Based Development

The project follows trunk-based development — `main` is the single source of truth for all deployments. Developers work in short-lived feature branches and merge back via small, incremental pull requests. There are no long-lived `develop` or `release` branches.

## CI/CD

Three GitHub Actions workflows deploy each component independently on push to `main`, scoped by path filters:

- **`deploy-frontend.yml`** — Builds the React app and deploys to Firebase Hosting. Authenticates via Workload Identity Federation (WIF).
- **`deploy-backend.yml`** — Runs lint and tests, builds a Docker image, pushes to Artifact Registry, and deploys to Cloud Run. Automatically detects migration file changes and runs database migrations as a Cloud Run job when needed. Supports manual migration trigger via `workflow_dispatch`.
- **`deploy-function.yml`** — Deploys the Cloud Function (gen2) with `gcloud functions deploy`, attaches the Cloud SQL instance, and injects secrets from Secret Manager.

All workflows use Workload Identity Federation for keyless GCP authentication and can also be triggered manually via `workflow_dispatch`.
