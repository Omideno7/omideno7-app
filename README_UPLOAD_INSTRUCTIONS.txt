# Omideno7 V63.37 — Safe Cloud Backup Foundation

This package is designed as an ADD-ONLY safe upgrade.
It does not change the working School, Daily Word, Q&A, notifications, Bible, or admin logic.

## Step 1 — Upload/Replace files in GitHub
Upload all files in this ZIP into the root of the `omideno7-app` repository, preserving folders.
Replace existing files when GitHub asks.

Important files:
- `index.html`
- `v63-31-bible-365-complete-fix.js`
- `v63-36-notification-language-sync.js`
- `v63-36-version-stability-lock.js`
- `v63-37-cloud-backup-sync.js`
- `v63-37-version-stability-lock.js`
- `OMIDENO7_APP_STATUS_REPORT.md`
- `scripts/send-dynamic-notification.js`
- `.github/workflows/*.yml`

## Step 2 — Run SQL once in Supabase
Open Supabase Dashboard → SQL Editor.
Copy all text from:

`supabase-v63-37-cloud-backup.sql`

Run it once.

This creates:
- `user_profiles`
- `user_app_settings`
- `bible365_progress`

RLS is enabled so each signed-in user can only access their own data.

## Step 3 — Test
Open:

https://omideno7.github.io/omideno7-app/?v=6337

Check:
- Home works
- Daily Word works
- Bible 365 day selector works
- School still works
- Notifications still work
- More footer shows App Version: V63.37

Then sign in with a Supabase user and change the Bible 365 day.
Check Supabase table `bible365_progress`.

## Rollback
If needed, remove these two lines from `index.html`:

```html
<script src="v63-37-cloud-backup-sync.js?v=6337"></script>
<script src="v63-37-version-stability-lock.js?v=6337"></script>
```

The database tables can remain; they do not affect existing features.
