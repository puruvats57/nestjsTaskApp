# NestJS Task App

Simple NestJS backend that manages teams, members, and tasks backed by MongoDB. JWT-protected routes let you create teams, create tasks, and assign tasks to specific team members.

## Prerequisites
- Node.js 18+
- Running MongoDB instance (local or cloud)

## Setup
```bash
npm install
```

Create a `.env` file with at least:
```
MONGO_URI=mongodb://localhost:27017/nest-task-app
AUTH_USER=admin
AUTH_PASS=changeme
JWT_SECRET=super-secret
PORT=3000
```

## Run
```bash
npm run start:dev
```
The API listens on `http://localhost:3000` by default.

## Authentication Flow
1. `POST /auth/login` with `{ "username": "admin", "password": "changeme" }`.
2. Use the returned `access_token` as `Authorization: Bearer <token>` for all `/tasks` and `/teams` routes.

## API Overview
- `POST /teams` – create a team with members `{ id, name, email? }`
- `GET /teams`, `GET /teams/:id` – list or fetch a single team
- `POST /tasks` – create a task (`description`, optional `dueDate`, etc.)
- `GET /tasks`, `GET /tasks/:id`, `PATCH /tasks/:id` – task CRUD
- `POST /tasks/:id/assign` – body `{ "teamId": "...", "memberId": "..." }` assigns the task to a specific team member.





