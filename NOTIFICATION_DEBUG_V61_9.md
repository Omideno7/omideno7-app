# V61.9 — OneSignal Immediate Debug Test

This package adds a single GitHub Actions workflow:

`.github/workflows/send-test-notification-debug.yml`

Purpose:
- Verify `ONESIGNAL_APP_ID` exists.
- Verify `ONESIGNAL_REST_API_KEY` exists.
- Send one immediate test push notification directly to OneSignal.
- Print the OneSignal HTTP status and response in the GitHub Actions log.
- Fail the workflow if OneSignal returns an error.

How to test:
1. Upload this workflow file to the repository.
2. Go to GitHub → Actions → Send Test Notification Debug.
3. Click Run workflow.
4. Open the run log and check:
   - `OneSignal HTTP status`
   - `OneSignal response`
5. If the response includes an `id` and recipients, OneSignal accepted the message.
6. If it shows `errors`, fix the GitHub Secrets or OneSignal app settings.

This workflow does not modify the app UI, Bible, fasting, Q&A, audio, or other features.
