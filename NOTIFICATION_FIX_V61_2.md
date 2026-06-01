# Omideno7 V61.2 — Notification Schedule Verification Fix

This update only affects GitHub Actions notification workflows and the notification sender script.

## Fixed
- Added support for `morning-prayer-reminder` notification type.
- Added support for all active notification types:
  - `daily-word`
  - `thanksgiving`
  - `faith-declaration`
  - `morning-prayer-reminder`
  - `sunday-service-reminder`
- Added Europe/Zagreb time guard for scheduled runs.
- Manual `Run workflow` still sends immediately for testing.

## Required GitHub Secrets
- `ONESIGNAL_APP_ID`
- `ONESIGNAL_REST_API_KEY`

## Scheduled local times
- Daily Word: 04:00 Europe/Zagreb
- Morning Prayer Reminder: 04:30 Europe/Zagreb
- Thanksgiving: 09:00 Europe/Zagreb
- Faith Declaration: 10:00 Europe/Zagreb
- Sunday Service Reminder: Sunday 19:30 Europe/Zagreb

No app UI, Bible, fasting, Q&A, audio, or plans files are changed by this fix.
