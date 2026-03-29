# Refactored Movie API Server

This project restructures the original single-file Fastify server into a modular architecture and now includes admin authentication with SQLite, bcrypt and JWT.

## Layout

- `src/config.js` – Centralised configuration for the remote service URL, API key, legacy admin token and JWT settings.
- `src/services/filmService.js` – Service layer functions responsible for communicating with the upstream movie API.
- `src/services/adminService.js` – Service functions for managing admin accounts in SQLite and verifying bcrypt passwords.
- `src/database.js` – Initialises a SQLite database and ensures the `admins` table exists.
- `src/middleware/verifyAdmin.js` – Protects admin routes with JWT bearer token authentication. Legacy `x-admin-token` support is still present for compatibility.
- `src/routes/public.js` – Public endpoints for listing films, retrieving details and voting.
- `src/routes/admin.js` – Administrative endpoints for creating, updating and deleting films.
- `src/routes/adminAuth.js` – Endpoints for registering and logging in admin users.
- `src/server.js` – Application entry point.

## Running the server

```bash
npm install
npm start
```

The server listens on port 3000 by default.

## Admin auth flow

### Register admin
`POST /admin/register`

```json
{
  "login": "admin",
  "password": "1234",
  "apiKey": "vJFbfeP_cpMYsH9l5BVHY23Ss"
}
```

### Login admin
`POST /admin/login`

```json
{
  "login": "admin",
  "password": "1234"
}
```

Login returns a JWT token. Use it for protected routes:

```http
Authorization: Bearer <your_token>
```

### Example protected request
`POST /films`

Headers:
- `Content-Type: application/json`
- `Authorization: Bearer <your_token>`

## Security note

Passwords are stored as bcrypt hashes, not in plain text. For production, set `JWT_SECRET` from environment variables.
