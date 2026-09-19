# CI/CD smoke testing

The repository has two smoke-test paths:

- `CI` runs on every push and pull request. It installs the locked dashboard
  dependencies, runs all local contract tests, builds the Vite dashboard,
  typechecks it, and runs `npm audit --audit-level=moderate`.
- `Live smoke` runs manually from GitHub Actions or on the scheduled nightly
  trigger. It verifies Supabase Email/Password Auth, `public.profiles`, cross-
  user RLS isolation, the quota RPC, and the authenticated production API.

The live workflow is fail-closed when its secrets are absent. Configure these
repository secrets before running it. The `live-smoke` environment can
additionally be protected with required reviewers:

- `AMZ_SMOKE_SUPABASE_URL`
- `AMZ_SMOKE_SUPABASE_ANON_KEY` (publishable/anon key only; never `service_role`)
- `AMZ_SMOKE_EMAIL`
- `AMZ_SMOKE_PASSWORD`
- `AMZ_SMOKE_ALLOW_QUOTA_DECREMENT` with the exact value `1`
- optional `AMZ_PRODUCTION_API_URL` to override the canonical production API

The live smoke intentionally runs with quota mutation enabled only in the
isolated live workflow. Its concurrency group prevents overlapping runs from
consuming the same test user's daily quota concurrently. No credential values
are printed by the workflow or the smoke script.
