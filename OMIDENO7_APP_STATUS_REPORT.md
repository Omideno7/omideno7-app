# Omideno7 App Status Report — V63.41 Beta

## Current stable app
Stable public app remains on the V63.36/V63.39 line. The public `index.html` is not changed by this Beta package.

## V63.41 Beta purpose
This version tests automatic cloud save and restore before enabling it for all users.

## Scope
- `beta.html` only
- No effect on public users
- Uses the existing Supabase client captured from the School system
- Stores:
  - user profile language
  - user app settings
  - Bible 365 current/selected day
  - completed days when available
  - notification state as true/false
- Adds a Beta panel in More:
  - enable/disable auto-save
  - save now
  - restore from cloud
  - log display

## Security model
- Supabase RLS remains the primary protection.
- Users can only select/update their own rows.
- Admin is controlled by `omideno7church@gmail.com` through `omideno7_is_admin()`.
- No service role key or private secret is placed in frontend files.

## Next planned version
V63.42 Beta — Offline Foundation:
- open core app without internet
- cache important app files
- offline queue for changes
- sync when online

## Important
The Beta diagnostic panels are for testing only. In stable release, user-facing cloud sync should run quietly and the technical panels should be hidden or admin-only.
