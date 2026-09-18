# Amazon Review Reply MVP Verification Record

## Local checks

- Adapter test: `node extension/content/amazon-review-adapter.test.js`
- Manifest parse: `node -e "JSON.parse(require('fs').readFileSync('./extension/manifest.json'))"`
- Migration static checks: required tables, RLS, grants, and unique request ID.
- Dashboard build: run from `web-dashboard` with the repository's configured package manager.

## Expected fixture behavior

- `B000000001` is detected from the fixture root.
- Only the 2-star review is returned; the 5-star review is ignored.
- The 2-star review exposes a seller reply textarea.
- Fill dispatches input/change events only; no submit or click action is permitted.

## Evidence boundaries

Local fixture and static checks do not prove compatibility with the live Seller Central DOM, live Supabase, deployed API, authentication, billing, or Chrome Web Store review. Those require separate connected verification with a user-owned test account and deployment credentials.

## 2026-09-17 execution evidence

- Google Drive `web-dashboard` dependency install: failed with repeated `EBADF`, `EPERM`, and corrupted tar warnings; no success was reported.
- Clean local copy: `C:\Users\july ane\AppData\Local\AMZ-Leads-Radar\web-dashboard-clean`.
- Clean copy dependency install: completed with 146 packages added.
- `npm run build`: PASS with Vite 6.4.3.
- Vite dev server: PASS at `http://127.0.0.1:3000/`.
- HTTP health check: `200 OK`; Vite HMR marker detected.
