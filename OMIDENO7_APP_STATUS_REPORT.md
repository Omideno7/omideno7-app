# Omideno7 App Status Report

**Current working line:** V63.36  
**Project:** Omideno7 Church Web App  
**Live URL:** https://omideno7.github.io/omideno7-app/  
**Admin URL:** https://omideno7.github.io/omideno7-app/admin.html  
**Hosting:** GitHub Pages  
**Backend / Storage:** Supabase  
**Push Notifications:** OneSignal + GitHub Actions  
**Languages:** Persian (FA), English (EN), Croatian (HR)

This file is the permanent technical handoff record for the app. Each future change should update this report so a new AI assistant or developer can continue without starting from zero.

---

## 1. Current Stable State

The app is currently working after the V63.31 Bible 365 fix and V63.34–V63.36 notification fixes. The current upload package includes V63.36 app-announcement notifications, language sync for OneSignal, and a footer version stability lock.

The bottom navigation must remain:

1. Home
2. Plans
3. Book
4. Word
5. School
6. More

The **More** item must remain the last bottom-navigation item. The **School** item must remain visible in the bottom navigation.

---

## 2. Major Functional Areas

### 2.1 Home

The home page introduces Omideno7 Church, online meetings, prayer, church service information, and quick access to major app sections.

### 2.2 Plans

The Plans area includes spiritual growth plans, fasting journey material, thanksgiving content, faith declarations, and other devotional/discipleship material.

### 2.3 Book / Bible

The Bible section must not be removed or replaced. The app’s own Bible data is the source for Bible chapter text.

The 365-day reading plan is inside the Book section only. It must not replace the main Bible reader.

### 2.4 Word / Daily Word

Daily Word is trilingual and is based on:

`ROR_May_2026_church_app_FINAL_31_days_EN_FA_HR.xlsx`

Daily Word must contain only:

- Main verse
- Message
- Prayer / Confession
- Further study

The one-year/two-year Bible reading plan must not appear inside Daily Word.

Further-study verses must open on click and show the full verse text. Daily Word page-jumping was fixed by disabling the old V62.14 Daily Word toggle script and using the later V63.24 fix.

### 2.5 School

The online school is added and works with Supabase authentication.

Access rules:

- User signs up with email/password.
- New users receive `pending_review` status.
- Admin must approve the student.
- Before approval, classes are locked.
- After approval, Class 1 opens.
- The next lesson/class opens only after the required notes/homework progress is recorded.

School sections:

1. New Creation
2. Holy Spirit
3. Christian Teachings
4A. Evangelism
4B. Cell Ministry
5. Christian Character and Prosperity
6. Local Church
7. Mobile Technology for Personal Growth, Evangelism, and Church Growth

Persian audio files are stored in Supabase Storage bucket:

`school-audio`

Audio filenames:

- class-01-fa.mp3
- class-02-fa.mp3
- class-03-fa.mp3
- class-04a-fa.mp3
- class-04b-fa.mp3
- class-05-fa.mp3
- class-06-07-fa.mp3

Audio must show only in Persian. English and Croatian must not show audio. The file path must not be shown to the user. A separate volume slider should not be added; only native player controls and playback speed are needed.

### 2.6 More

The More page includes app information, footer, notification controls, and version display. A previous issue caused the displayed version to jump/change because old scripts tried to write older version numbers. V63.36 adds:

`v63-36-version-stability-lock.js`

This script stabilizes the footer label as:

`App Version: V63.36`

---

## 3. Admin Panel

Admin panel URL:

https://omideno7.github.io/omideno7-app/admin.html

Admin email:

`omideno7church@gmail.com`

Admin functions:

- View students
- View student details
- Approve students
- View progress, notes, homework, and exams
- Review school content without loading all lessons at once
- Listen to school audio
- Manage multilingual Q&A

Q&A must be separated by language:

- Persian
- English
- Croatian

Admin can write answers, save answers, and publish publicly. Public answers must appear in the public “View answers” area when published.

---

## 4. Bible 365 Reading Plan

The 365-day Bible plan was fixed in V63.31 using:

`v63-31-bible-365-complete-fix.js`

Requirements:

- User starts from Day 1.
- The plan does not automatically advance by calendar date.
- User can select Day 1–365.
- The reading list and full chapter text update immediately when a day is selected.
- Text is read from the app Bible data.
- Main Bible section remains intact.

Older experimental files V63.26–V63.30 should remain disabled/commented if present.

---

## 5. Notifications

Push notifications use:

- OneSignal
- GitHub Actions
- `scripts/send-dynamic-notification.js`

Important fixes:

- V63.34 removed the invalid OneSignal conflict caused by sending both `url` and `web_url`.
- Notifications now work after testing; Morning Prayer successfully arrived on the phone.
- Main workflows turned green in GitHub Actions.

### 5.1 Daily Notification Types

Daily notifications include:

1. Daily Word
2. Faith Declaration
3. Thanksgiving
4. Morning Prayer Reminder
5. Sunday Service Reminder

Daily Word, Faith Declaration, and Thanksgiving use local-time delivery through OneSignal where applicable.

Current intended user-local delivery times:

- Daily Word: 07:00 local time
- Faith Declaration: 10:00 local time
- Thanksgiving: 12:00 local time

Morning Prayer is different: the meeting is fixed at **05:00 Croatia time**, so the reminder should be based on Croatia time, not each user’s 05:00 local time. V63.35 adjusts this to send the reminder around **04:45 Croatia time**, about 15 minutes before the meeting.

### 5.2 Morning Prayer Text

Persian:

Title: جلسه صبحگاهی کلیسای امیدنو۷  
Body: به جمع خانواده الهی در جلسه صبحگاهی کلیسای امیدنو۷ بپیوندید و مشارکت امروز خود را با خداوند آغاز کنید.

English:

Title: Omid No 7 Morning Prayer  
Body: Join the Omid No 7 Church morning prayer meeting and begin today in fellowship with the Lord.

Croatian:

Title: Jutarnja molitva Crkve Omid No 7  
Body: Pridružite se obitelji vjere na jutarnjoj molitvi Crkve Omid No 7 i započnite dan u zajedništvu s Gospodinom.

### 5.3 App Announcement Notifications

V63.36 adds app announcement notifications. These are manually triggered from GitHub Actions and can announce new app sections such as:

- Q&A activation
- Online school activation
- Future new lessons or new app features

Workflow:

`.github/workflows/send-app-announcement.yml`

Users should receive the announcement in the language they selected in the app. Language sync is handled by:

`v63-36-notification-language-sync.js`

The script sets OneSignal tags such as:

- `app_language = fa`
- `app_language = en`
- `app_language = hr`

Users must open the app at least once after this update so their selected language is synced to OneSignal.

Q&A announcement text:

Persian:

Title: بخش پرسش و پاسخ فعال شد  
Body: اگر سوالی درباره ایمان، کتاب‌مقدس یا زندگی مسیحی دارید، در اپ کلیسای امیدنو۷ بپرسید و پاسخ را دریافت کنید.

English:

Title: Questions & Answers is now open  
Body: If you have a question about faith, the Bible, or Christian life, ask it in the Omid No 7 app and receive an answer.

Croatian:

Title: Pitanja i odgovori su sada dostupni  
Body: Ako imate pitanje o vjeri, Bibliji ili kršćanskom životu, postavite ga u aplikaciji Omid No 7 i primite odgovor.

School announcement text:

Persian:

Title: مدرسه آنلاین کلیسای امیدنو۷ فعال شد  
Body: به مدرسه آنلاین کلیسای امیدنو۷ بپیوندید، در کلام رشد کنید و برای خدمت مؤثرتر آماده شوید.

English:

Title: Omid No 7 Online School is now open  
Body: Join the Omid No 7 Online School, grow in the Word, and be equipped for a more effective life and ministry.

Croatian:

Title: Online škola Crkve Omid No 7 je otvorena  
Body: Pridružite se online školi Crkve Omid No 7, rastite u Božjoj riječi i budite opremljeni za učinkovitiji život i služenje.

---

## 6. Important Stability Warnings

Do not reintroduce the V63.11–V63.15 conflicts. Those versions caused instability in school/admin/content review areas.

Important rules:

- Do not render all school lessons/full content at once.
- Do not load all verse texts inside school content.
- Read verse text from the app Bible data.
- Do not remove the Bible section.
- Do not remove School from bottom navigation.
- Keep More as the last navigation item.
- Avoid activating old version-lock scripts such as V59.7 or V56.3 because they overwrite the version label with old numbers.

---

## 7. Current Upload Package V63.36

This package includes:

- `index.html`
- `v63-31-bible-365-complete-fix.js`
- `v63-36-notification-language-sync.js`
- `v63-36-version-stability-lock.js`
- `scripts/send-dynamic-notification.js`
- `.github/workflows/send-app-announcement.yml`
- `.github/workflows/send-daily-word.yml`
- `.github/workflows/send-faith-declaration.yml`
- `.github/workflows/send-thanksgiving.yml`
- `.github/workflows/send-morning-prayer-reminder.yml`
- `.github/workflows/send-sunday-service-reminder.yml`
- `OMIDENO7_APP_STATUS_REPORT.md`

---

## 8. Future Update Rule

Every time a new app feature, notification, workflow, Bible feature, school feature, or admin feature is added, update this file with:

1. Version number
2. Files changed
3. Reason for change
4. What was fixed or added
5. What must not be broken
6. Test instructions


---

## V63.36 Bible 365 Mobile UI Cleanup

Status: Stable visual hotfix prepared.

Changes:
- Added `v63-36-bible365-mobile-layout-fix.js` to center and widen Bible 365 cards on mobile/tablet.
- Added `v63-36-bible365-ui-cleanup-fix.js` to hide the "not started" intro card and the side title that squeezed the reading text.
- `index.html` loads both fixes after `v63-36-version-stability-lock.js`.
- No Supabase Cloud Backup code is enabled in this package.
- Existing stable features remain unchanged: school, Daily Word, Q&A, notifications, Bible 365 reader, and app announcement notifications.

Test URL:
`https://omideno7.github.io/omideno7-app/?v=6336clean`


## V63.39 — Stable Bible 365 Single Reader Fix
- Replaced unstable DOM-injection Bible 365 fixes with a direct renderReadingPlan override.
- Bible 365 reader now appears only inside Bible Reader one-year plan.
- Removed duplicated old day cards and stopped Home/Daily Word contamination.
- Removed repeated interval-based rendering to stop page jumping.
- Kept notifications, school, Daily Word, Q&A and Supabase unchanged.
