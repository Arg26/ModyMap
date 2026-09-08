# ModyMap 🗺️

**A live campus navigation platform for Mody University of Science and Technology.**

ModyMap replaces the university's old static campus map website with a full-stack, interactive application — letting students, faculty, and visitors search for buildings and locations, view them on a live map, and navigate the campus with ease.

---

## ✨ Features

- 🔍 **Search** — Look up any campus building or point of interest by name
- 🗺️ **Interactive map** — Pan, zoom, and explore campus via Leaflet.js on OpenStreetMap tiles
- 📍 **Location markers** — Buildings and points of interest rendered as custom map markers with details
- 🔐 **Authenticated routes** — JWT-based authentication for user-specific features
- 📱 **Responsive UI** — Built with React for a smooth experience across devices

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Leaflet.js, OpenStreetMap |
| **Backend** | Spring Boot, Gradle |
| **Auth** | JWT (JSON Web Tokens) |
| **Database** | Relational DB via Spring Data |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render (Docker) |

---

## 📐 Architecture

```
┌─────────────────┐        REST API         ┌──────────────────┐
│   React + Vite   │ ─────────────────────▶ │   Spring Boot      │
│   (Vercel)        │ ◀───────────────────── │   (Render/Docker)  │
│  Leaflet + OSM     │        JSON            │  REST + JWT Auth   │
└─────────────────┘                         └──────────────────┘
                                                       │
                                                       ▼
                                              ┌──────────────────┐
                                              │   Database          │
                                              │  (locations, users)  │
                                              └──────────────────┘
```

The frontend and backend are deployed independently — the React app is built and served as a static site on Vercel, while the Spring Boot API runs as a containerized service on Render. The two communicate over REST, with CORS explicitly configured on the backend to allow the deployed frontend's origin.

---

## 🚀 Getting Started

### Prerequisites

- Java 17+ and Gradle (or use the included `./gradlew` wrapper)
- Node.js 18+ and npm/yarn
- A running instance of the database (see `application.properties` / `application.yml`)

### Backend Setup

```bash
cd backend
./gradlew build
./gradlew bootRun
```

The API will start on `http://localhost:8080` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will start on `http://localhost:5173` by default.

### Environment Variables

| Variable | Where | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Frontend | Base URL of the backend API |
| `SPRING_DATASOURCE_URL` | Backend | Database connection string |
| `JWT_SECRET` | Backend | Secret key used to sign JWTs |
| `CORS_ALLOWED_ORIGINS` | Backend | Comma-separated list of allowed frontend origins |

> **Note:** Never hardcode API URLs or CORS origins — always drive them from environment variables so the same build works correctly across local, staging, and production environments.

---

## 🧩 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/locations` | Fetch all campus locations |
| `GET` | `/api/locations/{id}` | Fetch a specific location's details |
| `GET` | `/api/locations/search?q=` | Search locations by name/category |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT |
| `GET` | `/api/health` | Health check endpoint (public, no auth required) |

---

## ☁️ Deployment

- **Frontend** is auto-deployed to **Vercel** on every push to `main`.
- **Backend** is auto-deployed to **Render** via Docker on every push to `main`.
- The backend Dockerfile uses the Gradle **wrapper** (`./gradlew`) rather than a system-installed Gradle, to guarantee a consistent, reproducible build version across environments.
- The `/api/health` endpoint is explicitly whitelisted in Spring Security so Render's health checks aren't rejected as unauthorized.

---

## 🐛 Known Issues & Lessons Learned

A few production issues surfaced during deployment that are worth documenting for future contributors:

- **CORS & API URLs:** These must always be environment-driven, never hardcoded to `localhost` — a mismatch here silently breaks every API call once deployed.
- **Leaflet marker icons in production:** Vite's asset bundling changes default icon paths — marker icon assets must be explicitly imported and reassigned to Leaflet's icon options rather than relying on default path resolution.
- **JWT expiry:** The frontend should gracefully handle expired tokens (401/403 responses) by clearing them and redirecting to login, rather than assuming a token is always valid.
- **DataSeeder idempotency:** Any startup data-seeding logic should check for existing records before inserting, so it doesn't crash against a fresh production database.

---

## 👥 Contributors

Built collaboratively as a team project for Mody University, with frontend development, Leaflet/OpenStreetMap integration, and UI components led by **Aryaa Agarwal**.

---

## 📄 License

_Add your chosen license here (e.g., MIT)._

---

*This README documents the intended structure and setup of ModyMap. Since the repository is private, double-check exact folder names, scripts, and environment variable keys against the actual codebase before publishing.*
