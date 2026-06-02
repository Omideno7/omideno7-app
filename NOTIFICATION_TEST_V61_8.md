# V61.8 — Immediate OneSignal Test Workflow

This package adds one isolated GitHub Actions workflow:

- `.github/workflows/send-test-notification.yml`

Purpose:
- Send one immediate push notification through OneSignal.
- It does not use local-time scheduling.
- It does not modify the app, Bible, fasting, Q&A, audio, or existing notification workflows.

How to test:
1. Upload this file to the GitHub repository in the same path.
2. Go to GitHub → Actions → Send Test Notification.
3. Click Run workflow.
4. Check OneSignal → Delivery for a new message with today's timestamp.
5. Check if the push arrives on subscribed devices.

If GitHub is green and OneSignal shows Delivered, but the phone does not receive it, the problem is device subscription/permission, not GitHub Actions.
