# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + Vite frontend for NHG (a Galle hospital management system). Public-facing hospital website plus a role-based, authenticated dashboard for staff/patients. Talks to a separate backend API (not in this repo) at `http://localhost:5000/api`.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # production build
npm run lint      # eslint over the whole repo
npm run preview   # preview the production build
```

There is no test suite configured in this repo.

## Architecture

**Feature-based structure under `src/features/<feature>/`**, each typically split into:
- `pages/` — route-level components
- `components/` — feature-local UI pieces
- `services/` — API calls (thin wrappers around the shared axios client)
- `data/` or `config/` — static config/content for that feature

Cross-cutting code lives in `src/shared/` (api client, `Navbar`/`Footer`, `shared/utils/auth.js`) and `src/utils/` (`authStorage.js`). `src/components/ProtectedRoute.jsx` and `src/app/App.jsx` sit outside `features/` as top-level app wiring.

### Routing (`src/app/App.jsx`)

All page components are lazy-loaded. Two route groups:
- `PUBLIC_ROUTES` — plain array of `{ path, element }`, rendered directly under `<Routes>`.
- `DASHBOARD_ROUTES` — array of `{ path, element, roles }`, rendered as nested routes under `/dashboard`, each wrapped in `<ProtectedRoute requiredRole={roles}>`. The `/dashboard` parent route itself is wrapped in `<ProtectedRoute>` (no role) and renders `DashboardLayout`.

When adding a new dashboard page: add the lazy import, add an entry to `DASHBOARD_ROUTES` with the roles allowed, and add a matching entry to `DASHBOARD_LINKS` in `src/features/dashboard/config/dashboardConfig.js` (sidebar nav) if it should be user-navigable. Role-based copy for labels/cards lives in the same config file (`ROLE_LABELS`, `DASHBOARD_HOME_CONTENT`, `getDashboardLinkLabel`).

Note: files under `src/features/clinical specialities/` (space in the directory name) are named lowercase (`cardiologyicu.jsx`, `maternitygynaecology.jsx`, etc.) but some imports in `App.jsx` reference them with capitalized names (`Maternitygynaecology`, `Pediatricsneonatology`, `Radiologyimaging`). This resolves on case-insensitive filesystems (Windows/default macOS) but will break on case-sensitive ones (Linux, most CI) — keep this in mind if build/deploy runs on Linux.

### Auth & roles

- Roles are defined in `src/shared/utils/auth.js` as `ROLE = { ADMIN, DOCTOR, LAB, NURSE, PATIENT }`. Always compare roles via `normalizeRole`/`hasRole` from that file rather than raw string comparison, since stored role casing isn't guaranteed.
- Session data is persisted client-side in `src/utils/authStorage.js` using `localStorage` (`authData` + a SHA-256 `authDataChecksum` keyed with a hardcoded string, purely to detect casual localStorage tampering in the UI). **This is explicitly a frontend-only, non-cryptographic tamper-detection layer** (see comment at the top of that file) — it is not a security boundary. All real authorization must be enforced by the backend; don't treat client-side role checks as sufficient access control when touching backend-adjacent code.
- `saveAuthData`/`getAuthData`/`clearAuthData` are async and dispatch a `window` `authDataChanged` event on change — components that need to react to login/logout state outside of `ProtectedRoute` should listen for that event rather than polling localStorage.
- `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) checks auth async on mount: shows a loading state, then either the `Login` page inline (not a redirect) if unauthenticated, `<Navigate to="/" />` if authenticated but wrong role, or the children/render-prop if authorized. `children` can be passed as a render function receiving `user`.
- `src/shared/utils/auth.js` also exports its own lightweight `getAuthData`/`normalizeRole`/`hasRole` — this is a *sync* wrapper around `authStorage.getStoredAuthDataSync` for places (like nav config filtering) that can't await. Don't confuse it with `authStorage.js`'s async `getAuthData`.

### API layer

- `src/shared/api/api.js` exports a single configured axios instance (`apiClient`) with `baseURL: 'http://localhost:5000/api'` and `withCredentials: true` (cookie-based session). This base URL is hardcoded, not read from an env var.
- Every `services/*.js` file follows the same pattern: one exported async function per endpoint, wrapping `apiClient` calls in `try/catch` and re-throwing `error.response?.data || { message: '...' }` so callers get a consistent shape to read `.message` from.
- One exception: the chatbot in `features/public/components/home/HomePageContent.jsx` calls `fetch("http://localhost:5000/api/chat", ...)` directly instead of going through `apiClient`/a service file.
- `import.meta.env.VITE_SHOW_BOOKING_SECTION` is the one place env vars gate behavior (toggles the booking section on the homepage).

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js` — v4 config is CSS-first, see `src/index.css`'s `@import 'tailwindcss'`). Global font is Poppins, loaded via Google Fonts `@import` in `index.css`. Dashboard theme colors are hardcoded hex values inline in className strings (e.g. `#002325`, `#FFB703`) rather than Tailwind theme tokens — match this pattern when styling other dashboard UI.
