# CMS Backend API

A production-ready Content Management System backend built with **Node.js**, **Express**, **MongoDB Atlas**, and **JWT authentication**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js ≥ 18 |
| Framework | Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JSON Web Tokens (JWT) |
| Passwords | bcryptjs (12 salt rounds) |
| File Upload | Multer (memory storage → MongoDB Buffer) |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |
| Logging | morgan |

---

## Project Structure

```
cms-backend/
│
├── config/
│   └── db.js                  # MongoDB Atlas connection
│
├── controllers/
│   ├── authController.js      # Login, getMe
│   ├── blogController.js      # Blog CRUD + image serving
│   └── inquiryController.js   # Inquiry management
│
├── middleware/
│   ├── authMiddleware.js      # JWT protect + restrictTo
│   ├── uploadMiddleware.js    # Multer memory storage
│   ├── validationMiddleware.js# express-validator chains
│   └── errorMiddleware.js     # 404 + global error handler
│
├── models/
│   ├── Admin.js               # Admin schema (bcrypt hashing)
│   ├── Blog.js                # Blog schema (Buffer image + slug)
│   └── Inquiry.js             # Inquiry schema
│
├── routes/
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   └── inquiryRoutes.js
│
├── utils/
│   ├── generateToken.js       # JWT sign + verify
│   ├── apiResponse.js         # Standardised response helpers
│   └── seedAdmin.js           # One-time admin seeding script
│
├── server.js                  # App entry point
├── .env.example
└── package.json
```

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd cms-backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/cms?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret_minimum_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### 3. Seed the Admin User

```bash
npm run seed
```

This creates:
- **Email:** `admin@example.com`
- **Password:** `Admin@1234`

> ⚠️ Change the credentials in `utils/seedAdmin.js` before running in production.

### 4. Start the Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

---

## API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | ❌ | Login and receive JWT |
| `GET` | `/api/auth/me` | ✅ | Get current admin profile |

#### Login Request
```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "Admin@1234"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "64f...",
    "name": "Super Admin",
    "email": "admin@example.com",
    "role": "superadmin"
  }
}
```

---

### Blogs

All blog routes (except `GET /image`) require `Authorization: Bearer <token>`.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/blogs` | ✅ | List all blogs (paginated) |
| `POST` | `/api/blogs` | ✅ | Create blog (`multipart/form-data`) |
| `GET` | `/api/blogs/:id` | ✅ | Get single blog |
| `GET` | `/api/blogs/:id/image` | ❌ | Serve blog image (raw) |
| `PUT` | `/api/blogs/:id` | ✅ | Update blog |
| `DELETE` | `/api/blogs/:id` | ✅ | Delete blog |

#### Create Blog (multipart/form-data)

```
POST /api/blogs
Content-Type: multipart/form-data

Fields:
  image       — file (JPEG/PNG/WEBP/GIF, max 5MB)
  heading     — string (required, max 200)
  subHeading  — string (optional, max 500)
  content     — JSON string (EditorJS format)
  status      — "draft" | "published"
```

#### EditorJS Content Format
```json
{
  "time": 1700000000000,
  "blocks": [
    { "type": "header", "data": { "text": "Hello World", "level": 2 } },
    { "type": "paragraph", "data": { "text": "Body text here." } }
  ],
  "version": "2.28.0"
}
```

#### List Blogs — Query Params
```
GET /api/blogs?page=1&limit=10&status=published&search=keyword
```

---

### Inquiries

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/inquiries` | ❌ | Submit inquiry (public form) |
| `GET` | `/api/inquiries` | ✅ | List all inquiries (paginated) |
| `GET` | `/api/inquiries/stats` | ✅ | Status counts overview |
| `GET` | `/api/inquiries/:id` | ✅ | Get single inquiry |
| `PATCH` | `/api/inquiries/:id/status` | ✅ | Update status only |
| `DELETE` | `/api/inquiries/:id` | ✅ | Delete inquiry |

#### Submit Inquiry (Public)
```json
POST /api/inquiries
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "message": "I'd like to get in touch about your services."
}
```

#### Update Status
```json
PATCH /api/inquiries/:id/status
{
  "status": "contacted"
}
```
Valid statuses: `new` | `contacted` | `closed`

---

## Security Features

- **Helmet** — sets secure HTTP response headers
- **CORS** — configurable allowed origins
- **Rate Limiting** — auth (20/15min), inquiries (10/hr), API (300/15min)
- **JWT** — signed tokens with issuer/audience claims
- **bcryptjs** — 12 salt rounds for password hashing
- **Input Validation** — all inputs validated before hitting controllers
- **Error Sanitisation** — 5xx messages hidden in production
- **Graceful Shutdown** — handles SIGTERM/SIGINT cleanly

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token TTL (default: `7d`) |
| `NODE_ENV` | No | `development` \| `production` \| `test` |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |

---

## Deployment Notes

1. Set `NODE_ENV=production` — hides stack traces, uses `combined` Morgan format
2. Use a strong random `JWT_SECRET` (e.g. `openssl rand -hex 64`)
3. Enable MongoDB Atlas IP allowlist / VPC peering
4. Put the server behind a reverse proxy (Nginx/Caddy) with TLS
5. Consider using PM2 or a container for process management

```bash
# Generate a secure JWT secret

#node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
