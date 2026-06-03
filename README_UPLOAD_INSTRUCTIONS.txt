Omideno7 V63.32 Notifications Fix

Upload/replace these files in your GitHub repository exactly with the same folder paths:

1) scripts/send-dynamic-notification.js
2) .github/workflows/send-daily-word.yml
3) .github/workflows/send-faith-declaration.yml
4) .github/workflows/send-thanksgiving.yml
5) .github/workflows/send-morning-prayer-reminder.yml
6) .github/workflows/send-sunday-service-reminder.yml

Important:
- Do not upload the ZIP itself into the repo. Unzip it first.
- Keep the same folders: scripts and .github/workflows.
- Existing GitHub Secrets must be present:
  ONESIGNAL_APP_ID
  ONESIGNAL_REST_API_KEY

After upload:
1) Commit changes.
2) Wait for GitHub Actions / Pages build to finish.
3) Go to Actions and open each notification workflow.
4) If GitHub shows "Enable workflow", click Enable workflow.
5) Run "Send Test Notification" or manually run one of these workflows using "Run workflow".
6) Then wait for the scheduled times.
