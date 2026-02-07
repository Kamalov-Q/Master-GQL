# gql2

NestJS API with **GraphQL** (Apollo, code-first), **TypeORM**, and **PostgreSQL**.

## Tech stack

- **NestJS** – backend framework
- **Apollo GraphQL** – code-first schema with decorators
- **TypeORM** – PostgreSQL ORM
- **PostgreSQL 16** – database (via Docker)
- **class-validator / class-transformer** – DTO validation

## Prerequisites

- Node.js 20+
- Docker & Docker Compose (for local Postgres)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres 16 on **port 5433** with user `user`, password `user1029`, and database `app_db`.

### 3. Environment variables

Create a `.env` in the project root. Prefer **DB_*** variables so the correct DB user is always used:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USER=user
DB_PASSWORD=user1029
DB_NAME=app_db
```

Optional:

- **DATABASE_SSL** – set to `true` only if your database requires SSL (e.g. cloud Postgres). Omit or leave unset for local Docker (no SSL).
- **PORT** – server port (default: `3001`).
- **DATABASE_URL** – full connection string; used only when `DB_USER` and `DB_HOST` are not set.

## Run the app

```bash
# development (watch mode)
npm run dev

# one-off
npm run start

# production build
npm run build
npm run start:prod
```

The API runs at **http://localhost:3001**. GraphQL playground: **http://localhost:3001/graphql**.

## Project structure

```
src/
├── config/           # DB and app config
├── entities/         # TypeORM + GraphQL entities (User, Post, Profile, Tag)
├── enums/            # Shared enums (e.g. Role)
├── user/             # User feature (resolver, service, DTOs)
├── entity-not-found/ # Global exception filter
├── app.module.ts
└── main.ts
```

## Scripts
 
| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Start in watch mode        |
| `npm run start`   | Start once                 |
| `npm run build`   | Build for production       |
| `npm run start:prod` | Run production build   |
| `npm run lint`    | Run ESLint                 |
| `npm run format`  | Format with Prettier       |
| `npm run test`    | Unit tests                 |
| `npm run test:e2e`| E2E tests                  |

## License

UNLICENSED (private).

## Author
Kamalov Quvomiddin

https://t.me/kamalovq