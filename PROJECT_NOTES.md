# PROJECT NOTES — V63.10

## Scope
Admin and school-management refinement only. No Bible, notifications, daily word, public plans, or general user sections were intentionally changed.

## Changes
- Unified admin panel keeps School Management and Q&A separate.
- Q&A no longer shows student-list tabs inside the Q&A screen.
- Q&A is grouped by language: Persian, English, Croatian.
- Admin can answer, mark for public publish, and save responses.
- School content review now includes audio playback speed controls.
- School content review now turns key scripture references into clickable buttons with related text display.
- Pending student and pending Q&A counters added.
- Optional `school_admin_events` SQL added for admin awareness of registrations.

## Important
If Q&A rows do not show correctly, confirm the actual Supabase table/column names for the Q&A system. The app currently checks common table names, including `qa_questions`.
