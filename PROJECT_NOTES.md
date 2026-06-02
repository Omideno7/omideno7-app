# PROJECT_NOTES — V63.9

V63.9 updates only school/admin/more-page metadata areas.
No intentional changes to Bible, Daily Word, OneSignal notification workflows, or general Q&A user-facing form.

Changes:
- Full written lessons from `omidno7_complete_written_lessons_trilingual.xlsx` were embedded in `v63-online-school.js`.
- Lesson pages show full lesson through a clickable button/details block.
- Admin school content review now has playable audio controls for Persian lesson MP3s.
- Admin area now starts as a unified dashboard with School Management and Q&A access.
- Q&A admin attempts to read known Supabase table names; if empty, the exact Q&A table name should be supplied for a precise connector patch.
- Students remain locked until `school_students.status='approved'`.
- Approval inserts an optional row in `school_notifications` if the SQL patch has been run.
- Dashboard includes school introduction and certificate note.
- More page includes a small multilingual update list before the version display.
- Admin install entrypoint added: `admin.html` + `admin.webmanifest`.

Important:
Run `SCHOOL_SUPABASE_SQL_V63.sql` again in Supabase SQL Editor after upload to add the optional `school_notifications` table.
