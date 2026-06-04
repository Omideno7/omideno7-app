Omideno7 V63.36 Stable + Bible 365 Mobile UI Cleanup

Upload/replace all files in this ZIP into the root of the GitHub repository, keeping folders exactly as they are.

This package keeps the stable V63.36 app and adds two safe visual-only fixes for the Bible 365 page:
1) v63-36-bible365-mobile-layout-fix.js
   - centers the Bible 365 cards on mobile/tablet
   - improves width and spacing

2) v63-36-bible365-ui-cleanup-fix.js
   - hides the "You have not started the plan" card
   - hides the side title that was squeezing the reading content
   - keeps the reading text centered and readable

This package does NOT enable V63.37 cloud backup.
It does NOT change Supabase tables.
It does NOT change school, Daily Word, Q&A, notifications, or the Bible text data.

After upload and Commit changes, wait for GitHub Actions Pages deployment to turn green.
Then test:
https://omideno7.github.io/omideno7-app/?v=6336clean
