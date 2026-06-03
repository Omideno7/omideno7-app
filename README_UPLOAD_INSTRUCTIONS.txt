Omideno7 V63.36 Complete App Announcement Notifications

Upload/replace these files in the GitHub repository root, preserving folders:

index.html
v63-36-notification-language-sync.js
scripts/send-dynamic-notification.js
.github/workflows/send-app-announcement.yml
.github/workflows/send-daily-word.yml
.github/workflows/send-faith-declaration.yml
.github/workflows/send-thanksgiving.yml
.github/workflows/send-morning-prayer-reminder.yml
.github/workflows/send-sunday-service-reminder.yml

After commit:
1. Wait for GitHub Actions / Pages deployment to turn green.
2. Open app once on devices so app_language is synced to OneSignal.
3. Go to Actions -> Send App Announcement notification -> Run workflow.
4. Choose announcement_type: qa or school.
