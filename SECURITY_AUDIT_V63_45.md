# SECURITY_AUDIT_V63_45.md

## V63.45b safety
- Clear-only action excludes:
  - Supabase auth keys
  - access/refresh tokens
  - JWT/session keys
  - passwords/secrets/API keys
- Restore excludes forbidden sensitive keys.
- Beta-only.
