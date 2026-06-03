V63.17 — School stability, Q&A save, clickable key scriptures

Changes:
- Keeps the clean stable V63.16 base.
- Fixes admin Q&A answer saving with flexible column detection.
- Adds optional Supabase Q&A admin update policies in SCHOOL_SUPABASE_SQL_V63.sql.
- Makes key scriptures clickable in student lessons and admin school review.
- Uses the app Bible data for verse text instead of loading all verses into the school page.
- Displays scripture references in the selected app language: Persian, English, or Croatian.
- Keeps the school content review lightweight to avoid freezing.


V63.18: Fixed localized scripture reference title inside opened verse panels and refreshed Q&A admin save so saved answers update visibly after save. Built from stable V63.16/63.17 line.


V63.19: Fixes public Q&A visibility by saving allow_public=true and public_question for the existing qa_public_answers view schema. No SQL change required.


## V63.20 Daily Word replacement
- Replaces the daily devotional display with the final uploaded 31-day EN/FA/HR Excel data.
- June 3 displays message 3; June 4 displays message 4, and so on by Europe/Zagreb day.
- 31-day months use messages 1-31; 30-day months use messages 1-30.
- Further Study references are clickable and show the full verse text provided in the uploaded sheet.
- No source, publisher, author, contact, or promotion information is displayed.


## V63.21
- Removed one-year/two-year Bible reading plan from Daily Word card.
- Added a small next-day helper button for Bible reading plan pages.
- Converted school scripture reference/verse digits to Persian numerals in Persian mode.
- Kept patch isolated to avoid affecting school/Q&A/Supabase logic.
