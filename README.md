# Kafu People Backend

Content management and registration API for Kafu People — built with [Bush.js](https://bushjs.dev) (TypeScript, Node.js, MongoDB).

## Tech Stack

- **Runtime:** Node.js, TypeScript
- **Framework:** Bush.js ^0.1.10
- **Database:** MongoDB
- **Auth:** JWT (HS256)
- **API:** REST + GraphQL + WebSockets

## Features

- **Blogs** — CRUD with slug-based public routes
- **Products** — CRUD with portfolio references
- **Events** — CRUD with date, location, and images
- **Registrations** — Public course registration with auto-generated reference numbers (e.g. `KAFU-{ts}-{rand}`)
- **File Uploads** — Admin CSV upload, parsing, and public reference-number verification
- **Authentication** — JWT-based login/signup with admin middleware
- **GraphQL** — User queries and mutations at `POST /graphql`
- **WebSockets** — Echo chat at `ws://<host>/chat`
- **CLI** — Bush.js artisan-style generators and database commands

## Setup

1. Copy `.env.example` to `.env` and configure your variables:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. With MongoDB running, apply schema migrations:
   ```bash
   node bush schema
   ```
4. (Optional) Seed the database:
   ```bash
   node bush seed
   ```
5. Start development:
   ```bash
   npm run dev
   ```

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development with nodemon     |
| `npm run build`   | Compile TypeScript to JavaScript   |
| `npm run start`   | Run compiled app                   |
| `npm run test`    | Run Jest test suite                |

## API Endpoints

### Authentication

| Method | Path               | Auth   | Description        |
| ------ | ------------------ | ------ | ------------------ |
| POST   | `/api/auth/login`  | Public | User login         |
| POST   | `/api/auth/signup` | Admin  | Create new admin   |
| POST   | `/api/logout`      | Public | Logout             |

### Blogs

| Method | Path               | Auth   | Description          |
| ------ | ------------------ | ------ | -------------------- |
| GET    | `/api/blogs`       | Public | List all blogs       |
| GET    | `/api/blogs/:slug` | Public | Get blog by slug     |
| POST   | `/api/blogs`       | Admin  | Create blog          |
| PUT    | `/api/blogs/:id`   | Admin  | Update blog          |
| DELETE | `/api/blogs/:id`   | Admin  | Delete blog          |

### Products

| Method | Path                 | Auth   | Description          |
| ------ | -------------------- | ------ | -------------------- |
| GET    | `/api/products`      | Public | List all products    |
| GET    | `/api/products/:id`  | Public | Get product by ID    |
| POST   | `/api/products`      | Admin  | Create product       |
| PUT    | `/api/products/:id`  | Admin  | Update product       |
| DELETE | `/api/products/:id`  | Admin  | Delete product       |

### Events

| Method | Path                | Auth   | Description         |
| ------ | ------------------- | ------ | ------------------- |
| GET    | `/api/events`       | Public | List all events     |
| GET    | `/api/events/:slug` | Public | Get event by slug   |
| POST   | `/api/events`       | Admin  | Create event        |
| PUT    | `/api/events/:id`   | Admin  | Update event        |
| DELETE | `/api/events/:id`   | Admin  | Delete event        |

### Registrations

| Method | Path                      | Auth   | Description              |
| ------ | ------------------------- | ------ | ------------------------ |
| POST   | `/api/registrations`      | Public | Submit registration      |
| GET    | `/api/registrations`      | Admin  | List all registrations   |
| DELETE | `/api/registrations/:id`  | Admin  | Delete registration      |

### File Uploads

| Method | Path                  | Auth   | Description                       |
| ------ | --------------------- | ------ | --------------------------------- |
| GET    | `/api/upload/verify`  | Public | Verify reference number in CSVs   |
| POST   | `/api/upload`         | Admin  | Upload CSV file                   |
| GET    | `/api/upload`         | Admin  | List uploads                      |
| DELETE | `/api/upload/:id`     | Admin  | Delete upload                     |

### GraphQL

| Method | Path       | Description                   |
| ------ | ---------- | ----------------------------- |
| POST   | `/graphql` | GraphQL endpoint (User CRUD)  |

### WebSockets

| Path       | Description                    |
| ---------- | ------------------------------ |
| `/chat`    | Echo chat (JSON message/text)  |

## Models

| Model        | Collection      | Key Fields                                        |
| ------------ | --------------- | ------------------------------------------------- |
| User         | `users`         | email, password, role                             |
| Blog         | `blogs`         | title, slug (unique), content, category, author   |
| Product      | `products`      | name, slug (unique), category, description, url   |
| Event        | `events`        | title, slug (unique), date, location, type        |
| Registration | `registrations` | firstName, lastName, email, course, referenceNo   |
| Upload       | `uploads`       | fileName, records (CSV JSON), uploadedAt          |

## Project Structure

```
├── app/
│   ├── GraphQL/           # GraphQL schema, resolvers
│   ├── Http/
│   │   ├── Controllers/   # Auth, Blog, Product, Event, Registration, Upload
│   │   └── Middleware/    # AdminMiddleware (JWT guard)
│   ├── Models/            # User, Blog, Product, Event, Registration, Upload
│   ├── Policies/          # (extendable)
│   ├── Providers/         # (extendable)
│   └── WebSockets/        # ChatSocketHandler (echo)
├── config/                # App, auth, database, storage, CORS config
├── database/
│   ├── schemas/           # MongoDB migration files
│   └── seeds/             # User, Blog, Product, Event seeders
├── routes/                # API, GraphQL, WebSocket route definitions
├── scripts/               # Migration & seed runner scripts
├── src/
│   ├── app.ts             # Application entrypoint
│   ├── startup/           # Auth provider, DB connect, middleware
│   └── stubs/             # CLI scaffolding templates
├── storage/               # File uploads & temp directory
├── tests/                 # Jest test suite
├── bush                   # Bush.js CLI executable
└── .env.example           # Environment variable template
```

## CLI Commands

```bash
node bush help                     # List all commands
node bush make:model <name>        # Generate a model
node bush make:controller <name>   # Generate a controller
node bush make:schema <name>       # Generate a schema migration
node bush make:seeder <name>       # Generate a seeder
node bush schema                   # Run schema migrations
node bush seed                     # Run seeders
```

Database commands support `--path` for custom layouts (useful in monorepos).

## Environment Variables

| Variable                | Default                                | Description                   |
| ----------------------- | -------------------------------------- | ----------------------------- |
| `APP_NAME`              | `kafu-people-backend`                  | Application name              |
| `APP_DEBUG`             | `true`                                 | Debug mode                    |
| `APP_URL`               | `http://localhost:3000`                | Application URL               |
| `PORT`                  | `3000`                                 | Server port                   |
| `DATABASE_URL`          | `mongodb://localhost:27017/kafu-people`| MongoDB connection string     |
| `DB_POOL_MAX`           | `10`                                   | Max DB pool connections       |
| `DB_POOL_MIN`           | `2`                                    | Min DB pool connections       |
| `AUTH_JWT_SECRET`       | —                                      | JWT signing secret            |
| `AUTH_SESSION_SECRET`   | —                                      | Session secret                |
| `CORS_ALLOWED_ORIGINS`  | `http://localhost:5173`                | Allowed CORS origins          |
| `UPLOAD_PATH`           | `./storage/uploads`                    | File upload directory         |
| `MAX_FILE_SIZE`         | `10485760`                             | Max upload size (bytes)       |
| `TEMP_DIR`              | `./storage/tmp`                        | Temp directory                |

## Testing

```bash
npm run test
```

Tests are written with Jest + supertest and live in the `tests/` directory.
