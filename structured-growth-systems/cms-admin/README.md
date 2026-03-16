# CMS Admin Panel

Production-ready React admin interface for the CMS backend API.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| Data Fetching | SWR (stale-while-revalidate) |
| Styling | Tailwind CSS v3 |
| HTTP Client | Axios |
| Rich Editor | EditorJS |
| Icons | Lucide React |
| Build Tool | Vite |

---

## Project Structure

```
src/
├── App.jsx                         # Routes + SWR global config
├── main.jsx                        # Entry point
├── index.css                       # Tailwind + CSS design tokens
│
├── lib/
│   └── api.js                      # Axios instance + SWR fetcher + API methods
│
├── context/
│   ├── AuthContext.jsx             # JWT auth state (login/logout)
│   └── ToastContext.jsx            # Global toast notifications
│
├── hooks/
│   └── useData.js                  # SWR hooks: useBlogs, useInquiries, etc.
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── layout/
│   │   ├── AppLayout.jsx           # Sidebar + Outlet wrapper
│   │   └── Sidebar.jsx             # Navigation sidebar
│   ├── blog/
│   │   └── RichEditor.jsx          # EditorJS wrapper (lazy-loaded tools)
│   ├── inquiry/
│   │   └── InquiryDetailPanel.jsx  # Slide-over detail view
│   └── ui/
│       └── index.jsx               # Spinner, Skeleton, Pagination, Modal, etc.
│
└── pages/
    ├── LoginPage.jsx
    ├── DashboardPage.jsx
    ├── BlogsPage.jsx
    ├── BlogFormPage.jsx             # Create + Edit (same component)
    └── InquiriesPage.jsx
```

---

## Quick Start

```bash
cd cms-admin
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000 — the Vite dev server proxies `/api` to `localhost:5000`.

---

## Features

### Login
- JWT stored in `localStorage`
- Auto-redirect to `/login` on 401
- Password visibility toggle

### Dashboard
- Live stats: total blogs, published count, inquiry counts by status
- Recent blogs and inquiries panels
- Quick-action links

### Blog Management
- Table with image thumbnail, heading, status badge, date
- Search by heading + filter by status
- Paginated results (SWR with `keepPreviousData`)
- Full EditorJS rich text editor (Header, List, Quote, Code blocks)
- Featured image upload with preview (stored as Buffer in MongoDB)
- Inline save-as-draft / publish toggle
- Delete with confirmation modal

### Inquiry Management
- Table with name, email, message preview, status
- Clickable status badge — inline dropdown to change status
- Slide-over detail panel with full message, contact info
- One-click "Reply by email" link
- Status filter tabs with live counts
- Delete with confirmation

---

## SWR Data Flow

All data fetching uses SWR for automatic caching, deduplication, and revalidation:

```js
// Example — blogs list with filters
const { blogs, pagination, isLoading, mutate } = useBlogs({ page: 1, status: 'published' })

// After mutation (create/update/delete), call mutate() to revalidate
await blogApi.delete(id)
mutate()
```

Global SWR config (in `App.jsx`) sets shared `fetcher`, disables focus-revalidation, and suppresses 401 errors (handled by Axios interceptor).

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | Backend API base URL |

When using `npm run dev`, Vite's proxy rewrites `/api` → `http://localhost:5000/api` automatically — no env var needed in development.

For production builds, set:
```
VITE_API_URL=https://your-api.com/api
```

---

## Design System

Dark industrial theme using CSS custom properties:

```css
--bg-base      /* deepest background */
--bg-surface   /* sidebar, headers */
--bg-elevated  /* cards, inputs */
--bg-hover     /* hover states */
--border       /* default borders */
--text-primary /* headings, values */
--text-secondary /* body, labels */
--text-muted   /* captions, meta */
--accent       /* amber-500 — CTAs, active states */
```

Typography: **Syne** (display/headings) + **DM Sans** (body) + **JetBrains Mono** (code/IDs)
