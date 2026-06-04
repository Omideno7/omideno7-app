# Omideno7 App Status Report — V63.40 Beta

## Stable public version
The public app should remain stable on the V63.36/V63.39 line until beta testing is complete.

## Current beta goal
V63.40 introduces a separate `beta.html` for Security & Cloud Diagnostic testing.

## What V63.40 adds
- `beta.html` — isolated beta copy of the app.
- `v63-40-security-cloud-diagnostic.js` — manual diagnostic panel in More.
- `supabase-v63-40-secure-cloud-foundation.sql` — add-only tables and RLS policies.
- `SECURITY_AUDIT_V63_40.md` — security notes and release gates.
- `v63-40-beta-book-icon-fix.js` — restores book icon in beta bottom nav.

## What V63.40 intentionally does not do
- Does not change `index.html`.
- Does not automatically sync all users.
- Does not touch Daily Word, School, Q&A, Notifications, or Bible 365 logic in the stable app.
- Does not activate scoring/badges yet.

## Testing URL
`https://omideno7.github.io/omideno7-app/beta.html?v=6340`

## Testing steps
1. Open beta URL.
2. Confirm stable UI loads.
3. Go to More.
4. Use the Cloud Diagnostic panel.
5. Press Check account.
6. If not signed in, sign in through School, then return to More.
7. Press Test sync my data.
8. Refresh Supabase tables.

## Supabase tables for V63.40
- `user_profiles`
- `user_app_settings`
- `bible365_progress`
- `school_cloud_profiles`
- `security_audit_log`

## Next planned version
V63.41 — Safe Cloud Backup Activation after beta diagnostics pass.
