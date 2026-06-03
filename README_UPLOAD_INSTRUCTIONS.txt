Omideno7 V63.35 — Morning Prayer Croatia-time Reminder

Upload/replace exactly these files:

1) scripts/send-dynamic-notification.js
2) .github/workflows/send-morning-prayer-reminder.yml

What it does:
- Morning prayer meeting starts at 05:00 Croatia time (Europe/Zagreb).
- Notification is sent around 04:45 Croatia time.
- It is sent immediately to all push subscribers at that same real-world time.
- This means Iran, Malaysia, Australia, Canada, USA, etc. receive it at their own local equivalent of 04:45 Croatia time.
- The workflow has two UTC schedules for summer/winter time, and the script checks Europe/Zagreb local time before sending, so it avoids the DST problem.

Manual test:
- Go to GitHub Actions.
- Open Send Morning Prayer reminder.
- Click Run workflow.
- Manual runs force immediate sending for testing.

Automatic behavior:
- Scheduled runs only send during the 04:40–04:59 Europe/Zagreb reminder window.
