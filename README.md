# Omideno7 WebApp V63.6 — Online School Admin Approval Update

This package updates only the Online School module.

Changes:
- Students must register first.
- New school registrations are saved as `pending_review`.
- Students cannot access classes until the school admin approves them.
- Admin panel now shows a student list and full student registration profile.
- Admin can approve a student to unlock access to classes.
- Admin can review lessons, assignments, exam questions, and audio file status inside the school panel.
- Bottom navigation, Daily Word, Bible, Q&A, notifications, and other app modules are not changed.

After uploading the files, run `SCHOOL_SUPABASE_SQL_V63.sql` again in Supabase SQL Editor so the new approval status default is applied.

Test URL:
https://omideno7.github.io/omideno7-app/?v=636

Admin URL:
https://omideno7.github.io/omideno7-app/?v=636&school_admin=1

Admin email:
omideno7church@gmail.com
