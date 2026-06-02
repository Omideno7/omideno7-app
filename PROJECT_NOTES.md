# PROJECT NOTES — V63 Online School Phase 1

## Version
V63 — Online School Phase 1

## Purpose
Adds a complete Online School module for Omideno7 Church. The school is a prerequisite for official church membership.

## Core features
- Bottom navigation includes a new School button.
- No existing bottom navigation item is removed.
- Users cannot access school content until they are logged in and registered.
- Registration uses Supabase Auth email/password plus a detailed student profile form.
- All school data is stored in Supabase.
- Lessons are trilingual: FA, EN, HR.
- Persian audio is attached to lessons; English/Croatian audio message says audio is not available yet.
- Audio player includes playback speed control.
- 15 notes are required per lesson.
- Assignment submission is required per lesson.
- Admin review is not required to unlock the next lesson.
- Lessons unlock sequentially.
- Final exam has 50 questions, trilingual.
- Pass mark: 80%.
- One retry is allowed if the user scores below 80%.
- Admin panel is visible to omideno7church@gmail.com.

## Supabase tables
- school_students
- school_progress
- school_notes
- school_assignments
- school_exam_attempts
- school_exam_answers

## Audio mapping
- class-01-fa.m4a → Class 1: New Creation
- class-02-fa.m4a → Class 2: Holy Spirit
- class-03-fa.m4a → Class 3: Christian Doctrine
- class-04a-fa.m4a → Class 4A: Evangelism
- class-04b-fa.m4a → Class 4B: Cell Ministry
- class-05-fa.m4a → Class 5: Christian Character and Prosperity
- class-06-fa.m4a → Class 6: Local Church
- class-07-fa.m4a → Class 7: Mobile Technology

Class 6 and Class 7 currently use the same uploaded source audio file, copied under two normalized file names.

## Safety
The school module is isolated in `v63-online-school.js`. Existing app modules should not be edited for this feature.
