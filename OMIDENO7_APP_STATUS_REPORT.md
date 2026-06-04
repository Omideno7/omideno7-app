# Omideno7 App Status Report — V63.45 Full Restore After Reinstall Beta

## Stable app
Public stable app remains unchanged.

## Completed
- V63.41G: Bible365 cloud save/restore works.
- V63.42: Offline cache + offline queue works.
- V63.42b: School offline fallback works.
- V63.43: Offline school lesson text and school notes queue works.
- V63.44c: Personal cloud backup to `user_app_backups` works.

## V63.45 scope
- Detect cloud backup for signed-in user.
- Restore app-owned localStorage keys from `user_app_backups`.
- Simulate reinstall by clearing app-owned keys only, not auth tokens.
- Prepare stable logic for post-sign-in restore.
