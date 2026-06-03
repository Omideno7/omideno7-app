Omideno7 V63.36 Upload Package

Upload/replace all files in this ZIP into the root of the GitHub repository, preserving folders:

- index.html -> root
- v63-31-bible-365-complete-fix.js -> root
- v63-36-notification-language-sync.js -> root
- v63-36-version-stability-lock.js -> root
- OMIDENO7_APP_STATUS_REPORT.md -> root
- scripts/send-dynamic-notification.js -> scripts/
- .github/workflows/*.yml -> .github/workflows/

After uploading:
1. Commit changes.
2. Wait until GitHub Actions / Pages build turns green.
3. Test the app with: https://omideno7.github.io/omideno7-app/?v=6336
4. Open More and confirm the footer version stays stable: App Version: V63.36
5. Run the app announcement workflow manually if needed:
   Actions -> Send App Announcement notification -> Run workflow -> qa or school
