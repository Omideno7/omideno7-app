# SECURITY_AUDIT_V63_45.md

## Scope
Beta-only full restore.

## Safety controls
- Simulation clears only app-owned keys.
- Auth/session/sensitive token keys are not deleted or restored.
- Restore ignores forbidden keys:
  - auth tokens
  - refresh/access tokens
  - JWT/session keys
  - service role/API keys
  - passwords/secrets
- Backup row access remains protected by Supabase RLS.

## Risk
Restoring localStorage may overwrite local user preferences with cloud version. This is acceptable in Beta test. Stable release should show a simple restore confirmation.
