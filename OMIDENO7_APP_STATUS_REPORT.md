# Omideno7 App Status Report — V63.44 Personal Cloud Backup Beta

## Stable app
Public stable app remains unchanged.

## Completed
- V63.41G: Bible365 cloud save/restore works.
- V63.42: Offline cache + offline queue works.
- V63.42b: School offline fallback works.
- V63.43: Offline School lesson text and school notes queue works.

## V63.44 scope
Full personal local app backup in Beta:
- localStorage app data scanning
- notes/saved verses/highlights/settings/Bible365/school/offline detectable keys
- Supabase table: `user_app_backups`
- RLS user-owned backup rows
- restore from cloud in Beta
- offline backup queue

## Stable release behavior later
No test buttons. Automatic background save, offline queue, and restore after sign-in.
