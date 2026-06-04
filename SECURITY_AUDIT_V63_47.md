# SECURITY_AUDIT_V63_47.md

## V63.47c additions
- Fixes security panel client discovery.
- Adds audit table schema fix.
- Hardens known functions with fixed search_path where present.
- Revokes public execute on sensitive functions where safe.

## Advisor notes
Supabase Security Advisor warnings should be treated seriously, but many are hardening warnings, not evidence of compromise.
