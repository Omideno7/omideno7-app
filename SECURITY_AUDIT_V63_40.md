# Omideno7 V63.40 — Security & Cloud Foundation Beta Audit

## Purpose
This version introduces a beta-only diagnostic layer for cloud backup and security. It does **not** enable automatic sync for all users.

## Safety model
- Stable public app remains on `index.html`.
- Beta testing happens on `beta.html?v=6340`.
- No automatic Supabase writes on page load.
- Only admin/test user can press manual buttons in the More section.
- If Supabase is unavailable or misconfigured, the error stays inside the diagnostic panel.

## Data minimization
Initial beta sync stores only:
- user id
- email from Supabase Auth
- app language
- timezone
- Bible 365 current/selected day
- last sync timestamp

School data is prepared but not migrated automatically in this version.

## RLS design
All new cloud tables use Row Level Security.
- Users can select/insert/update only their own rows.
- Admin access is limited to `omideno7church@gmail.com` through the helper function `omideno7_is_admin()`.
- Security audit logs are admin-readable only.

## Not enabled yet
- Automatic sync for all users
- Public chat
- School homework/notes migration
- Scoring/badges
- Prayer requests

## Next gate before public release
V63.41 should only be built after V63.40 beta proves:
1. Supabase client is detected correctly.
2. Signed-in user is detected correctly.
3. RLS allows own-row writes and blocks other-user reads.
4. Manual sync creates rows in `user_profiles`, `user_app_settings`, and `bible365_progress`.
5. Stable app remains unaffected.
