# Omideno7 Notification Fix V61.7

Scope: notifications and notification activation helper only. This update does not modify Bible, Q&A, fasting, audio, plans, apocrypha, or core app content.

## New notification behavior

### Local-time devotional notifications

These are scheduled through OneSignal using the subscriber/device timezone:

- Daily Word: 07:00 local time
- Faith Declaration: 10:00 local time
- Thanksgiving: 12:00 local time

GitHub Actions creates the message; OneSignal handles local timezone delivery.

### Live meeting reminders

Live meetings remain tied to the church meeting time in Europe/Zagreb / Central European Time:

- Morning Prayer Reminder: 04:30 Europe/Zagreb, message says the meeting starts at 5:00 AM Central European Time.
- Sunday Service Reminder: Sunday 19:30 Europe/Zagreb, message says the service starts at 8:00 PM Central European Time.

The message no longer says "in 30 minutes" to avoid confusion if delivery is delayed.

## Important OneSignal dashboard instruction

Pause/disable duplicate scheduled Campaigns in OneSignal dashboard for:

- Daily Word
- Faith Declaration
- Thanksgiving
- Morning Prayer Reminder
- Sunday Service Reminder

Only GitHub Actions should send these regular messages, otherwise users may receive duplicate or old-time notifications.

## App helper

`v61-7-notification-ui-footer-fix.js` tags OneSignal users with:

- `app_lang`
- `timezone`
- `church_app=omideno7`

It also exposes:

- `window.omideno7EnableNotifications()`
- `window.omideno7UpdateNotificationTags()`

This helps existing app buttons activate notifications and keep OneSignal user data updated.
