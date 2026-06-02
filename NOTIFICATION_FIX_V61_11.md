# V61.11 Notification Audience Fix

This version changes OneSignal targeting to `included_segments: ["All"]` for both the debug test notification and all scheduled notification types.

Purpose:
- Avoid targeting old player IDs or non-existing segments.
- Send to all active/subscribed OneSignal users.
- Keep local-time delivery for Daily Word, Faith Declaration, and Thanksgiving.

Files changed:
- `.github/workflows/send-test-notification-debug.yml`
- `.github/workflows/send-daily-word.yml`
- `.github/workflows/send-faith-declaration.yml`
- `.github/workflows/send-thanksgiving.yml`
- `.github/workflows/send-morning-prayer-reminder.yml`
- `.github/workflows/send-sunday-service-reminder.yml`
- `scripts/send-dynamic-notification.js`

No web app UI files are changed.
