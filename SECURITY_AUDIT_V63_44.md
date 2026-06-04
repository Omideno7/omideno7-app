# SECURITY_AUDIT_V63_44.md

## Scope
Beta-only personal app backup.

## Security controls
- No Supabase service role key or private secret in frontend.
- Known sensitive keys are excluded from backup:
  - auth tokens
  - refresh/access tokens
  - JWT/session keys
  - OneSignal IDs/secrets
  - passwords/API keys
- RLS protects `user_app_backups`.
- Users can select/insert/update only their own backup row.
- Admin can select/delete through existing `omideno7_is_admin()`.

## Risk
This stores personal app data as JSONB in Supabase. It should be used only after user sign-in and only for app-owned data.

## Next recommended step
V63.45 — Full Restore After Reinstall Beta and public-ready silent sync behavior.
