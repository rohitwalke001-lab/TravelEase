# TravelEase — Backend Connected Version

The original frontend files are preserved in their existing structure and styling. The backend adds a persistent state API without requiring a frontend redesign.

## Run locally

1. Install Node.js 18+.
2. Open terminal in `backend`.
3. Run `npm install`. 
4. Copy `.env.example` to `.env`.
5. Add your MongoDB Atlas connection string to `MONGO_URI` if you want MongoDB persistence. If it is blank/unavailable, the server uses `backend/data/state.json` as a local fallback.
6. Run `npm start`.
7. Open `http://localhost:5000`.

## Render

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `MONGO_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`

The backend serves the existing frontend, so only one Render Web Service is needed.

## API

- `GET /api/health`
- `GET /api/state`
- `PUT /api/state`
- `POST /api/auth/admin-login`
- `GET /api/backups`
- `POST /api/backups/restore`
