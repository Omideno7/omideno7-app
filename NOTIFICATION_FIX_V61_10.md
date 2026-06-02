# V61.10 — OneSignal Audience Target Fix

This hotfix corrects the notification target from stale/unsubscribed player IDs to OneSignal's active `Subscribed Users` segment.

## Files

- `.github/workflows/send-test-notification-debug.yml`
- `scripts/send-dynamic-notification.js`

## Main fix

The previous debug result showed:

```text
All included players are not subscribed
```

This means the OneSignal API call was valid, but the target audience used by the request had no active subscribed players. This version uses:

```json
"included_segments": ["Subscribed Users"]
```

## Notes

- The existing GitHub Secrets are still used:
  - `ONESIGNAL_APP_ID`
  - `ONESIGNAL_REST_API_KEY`
- Daily Word, Faith Declaration, and Thanksgiving still use OneSignal local-time delivery.
- Morning Prayer and Sunday Service reminders use immediate sending when GitHub Actions runs at the scheduled Central European time.
