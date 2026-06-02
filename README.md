# Omideno7 WebApp V63.5

Online School navigation/admin/audio hotfix.

Changes:
- Back buttons now use a safer page stack.
- Inside School, back from a lesson returns to My Lessons, not Home.
- Inside School, back from Lessons/Exam/Admin returns to the School dashboard.
- More/Home/other app pages should no longer jump unexpectedly to Home unless there is no previous page.
- Admin school link support: `?v=635&school_admin=1`.
- School audio source is prepared for Supabase Storage bucket `school-audio`.

Audio files are not inside this ZIP because they are large. Upload them to Supabase Storage bucket `school-audio` using their original Persian filenames.
