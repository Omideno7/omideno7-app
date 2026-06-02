# Omideno7 Web App — V63 Online School Phase 1

This package adds the **Online School** module as an independent feature.

## Files

- `index.html` — loads the new school module.
- `v63-online-school.js` — Online School UI, Supabase Auth, lesson progress, notes, assignments, exam, and admin view.
- `SCHOOL_SUPABASE_SQL_V63.sql` — SQL tables and RLS policies for Supabase.
- `school-audio/` — Persian audio lessons with normalized file names.
- `v62-14-daily-word-verse-toggle-fix.js` — preserved Daily Word fix.
- `v62-9-plan-navigation-final-fix.js` — preserved Plans navigation fix.

## Important setup

1. Upload all files to the root of the GitHub Pages repository.
2. Upload the full `school-audio` folder to the repository root.
3. In Supabase, open SQL Editor and run `SCHOOL_SUPABASE_SQL_V63.sql` once.
4. Make sure Supabase Authentication Email/Password is enabled.
5. Test the school page from the bottom navigation.

## Design decisions

- The School button is added to the bottom navigation without removing existing buttons.
- Users must create an account and complete registration before seeing lessons.
- Data is saved in Supabase, not only on the phone.
- Persian audio is available with playback speed control.
- English and Croatian show written lessons only, with audio-unavailable notice.
- Each lesson requires 15 notes and a submitted assignment before the next lesson unlocks.
- The final exam unlocks after all lessons are complete.
- Pass mark is 80%.
- If a user scores below 80%, one retry is allowed.
- Admin email: omideno7church@gmail.com.

## No changes intended

This package does not modify Daily Word content, Q&A, Bible, notifications, fasting content, or existing audio messages.
