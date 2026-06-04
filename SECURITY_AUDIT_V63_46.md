# SECURITY_AUDIT_V63_46.md

## Key principle
Because the app is hosted on GitHub Pages, frontend code is public. Therefore security must not depend on hiding frontend code.

## Must never be in frontend
- Supabase service_role key
- private API keys
- passwords
- access/refresh tokens intentionally written by app code
- server-side secrets

## Controls added/tested in V63.46
- `user_app_backups` RLS:
  - users select/insert/update own backup
  - admins can select/delete for support
- `offline_sync_queue` RLS:
  - users insert/select own queue items
  - admins can view/update for support
- `security_audit_log`:
  - authenticated users insert their own audit events
  - admin-only select
- beta diagnostic checks:
  - Supabase user
  - admin RPC
  - sensitive localStorage keys
  - backup table access
  - queue table access
  - audit log write

## Important limitations
No web app is 100% unhackable. This hardening makes attacks harder, limits damage, and improves auditability.

## Stable release requirement
Before stable:
- remove or hide Beta panels
- keep no secrets in frontend
- test RLS with student and admin accounts
- verify public user cannot see another user's backup/queue rows
