# SECURITY_AUDIT_V63_41.md

## Scope
V63.41 is Beta-only and does not modify stable index.html.

## Verified design
- No automatic sync on stable public app.
- Auto-save only runs when beta.html is loaded.
- Supabase writes require authenticated user.
- Tables are protected by RLS.
- notifications_enabled is always sent as true/false, not null.

## Known limitations
- This is still Beta.
- Offline cache/media is not included yet.
- School full cloud backup is not enabled yet.
- The technical panel should not be published to public stable UI.

## Next security work
- V63.42 Offline Foundation
- V63.43 Offline School Foundation
- Future public release with hidden/admin-only diagnostics
