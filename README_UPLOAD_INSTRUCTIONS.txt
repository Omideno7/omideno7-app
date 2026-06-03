Omideno7 V63.34 Notifications URL Conflict Fix

Replace this file in GitHub:

scripts/send-dynamic-notification.js

Reason:
OneSignal returned HTTP 400:
"Remove url field when setting app_url or web_url"

This fix removes the old url field and uses web_url only.

After upload:
1. Commit changes.
2. Wait for GitHub Actions to finish.
3. Run workflow manually: Send Morning Prayer reminder.
4. If it is green, check OneSignal Messages/Delivery.
