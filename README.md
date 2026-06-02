# Omideno7 WebApp V63.9 — School Admin and Written Lessons Update

Files included:
- index.html
- v63-online-school.js
- v63-5-navigation-admin-audio-fix.js
- v63-9-admin-and-more-polish.js
- SCHOOL_SUPABASE_SQL_V63.sql
- admin.html
- admin.webmanifest
- existing V62 Daily Word and navigation support scripts

What changed:
- Full written lessons from the trilingual lesson spreadsheet are embedded for all 8 school lessons.
- Student lesson pages now show a button for the full written lesson.
- Persian audio remains MP3 from Supabase Storage.
- Admin content review now includes audio players so the admin can listen to each lesson audio.
- Admin panel is more organized with School Management and Q&A access.
- Approval flow remains: students cannot access classes until admin approves them.
- Student dashboard shows an approval confirmation and certificate information.
- More page includes a small multilingual list of recent app features and version V63.9.
- admin.html is added as an installable admin entry point.

Storage expected:
Supabase Storage bucket: school-audio (public)
Expected MP3 files:
class-01-fa.mp3
class-02-fa.mp3
class-03-fa.mp3
class-04a-fa.mp3
class-04b-fa.mp3
class-05-fa.mp3
class-06-07-fa.mp3

Admin link:
https://omideno7.github.io/omideno7-app/admin.html
or
https://omideno7.github.io/omideno7-app/?v=639&admin=1&school_admin=1
