# Omideno7 App — Project Notes for Future Development

This file exists so another developer or a new ChatGPT session can understand the project without starting from zero.

## 1. Project identity
- App name: Omideno7 Church / کلیسای امیدنو۷
- Type: static Web App / PWA
- Hosting: GitHub Pages
- Main URL: https://omideno7.github.io/omideno7-app/
- Main languages: `fa` Persian, `en` English, `hr` Croatian
- Church email/admin: omideno7church@gmail.com

## 2. Development rule
To avoid breaking existing features, new features should be added as separate versioned files whenever possible.

Preferred pattern:
- Add one new file such as `v59-qa-system.js`
- Modify `index.html` only to load the new file
- Update `README.md`
- Update this `PROJECT_NOTES.md`

Avoid editing existing large feature files unless absolutely necessary.

## 3. Current major app sections
- Home
- Plans
- Bible / Bible Reader
- Daily Word
- Declarations
- Meetings
- New Birth / Salvation in Christ
- Thanksgiving
- More
- Audio Spiritual Messages: Persian only
- Apocrypha: Persian and English currently active; Croatian pending
- Q&A: added in V59; visible as a Home card only from V59.4
- Contact Us: added to More in V59.4

## 4. Bottom navigation
The bottom navigation currently has five primary tabs:
- Home
- Plans
- Bible
- Word
- More

Do not add Q&A to the bottom navigation unless redesigning the whole navigation. From V59.4, Q&A is shown only as a card on Home. The More section contains Contact Us instead of Q&A.

## 5. Bible system
- Persian Bible: FarTPV / Mojdeh structure was used.
- English Bible: KJVA was used.
- Croatian Bible: currently remains the previous text/data.
- Bible features include book-style verse display, verse tools, highlight, notes, stars, bold, copy, and key terms.
- Apocrypha is separate from the main Bible.

## 6. Audio messages
Audio spiritual messages should be shown only in Persian because the audio files are Persian.
Do not show audio messages in English or Croatian unless matching language audio is added.

## 7. Notifications
Notifications use OneSignal and GitHub Actions.
GitHub Secrets required:
- `ONESIGNAL_APP_ID`
- `ONESIGNAL_REST_API_KEY`

Notification schedules are intended for Croatia/Europe time:
- Daily Word: 04:00
- Morning Prayer Reminder: 04:30
- Thanksgiving: 09:00
- Faith Declaration: 10:00
- Sunday Service Reminder: 19:30 on Sundays

## 8. Supabase
Supabase is introduced for Q&A and future cloud-saved user data.
Project URL:
- https://uibhpgcsgcievktxmcfg.supabase.co

Public publishable key may be used in the frontend.
Never expose or paste the `service_role` key into app code or public chat.

Security approach:
- Row Level Security enabled
- Public users can submit questions
- Public users can read only published anonymous answers
- Admin can read private submitter info, answer, and publish
- Admin email: omideno7church@gmail.com

## 9. Q&A V59 behavior
The Q&A module is in `v59-qa-system.js`.
It adds:
- Home card only from V59.4
- Q&A page
- Submit question form
- Published anonymous Q&A list
- Admin login and answering panel

Public display must never show:
- submitter name
- email
- phone
- private original question if it includes personal data
- admin notes

When publishing, use `public_question` as a cleaned anonymous version.

## 10. Future cloud sync
LocalStorage is still used for many existing personal notes, thanksgiving entries, highlights, and progress.
Future version should add login + cloud sync using Supabase so user data is not lost if the app is removed or the phone changes.

Suggested future version:
- V60: cloud sync for Thanksgiving notes, Bible notes, highlights, stars, fasting notes, and plan progress.

## 11. Backup rules
Before major updates:
1. In GitHub, use Code → Download ZIP.
2. Save it as a live backup, e.g. `Omideno7_LIVE_BACKUP_V59.zip`.
3. Do not delete old hotfix files until `index.html` and the app are audited.

## 12. Repository cleanup
There are many old version and hotfix files. This is not immediately dangerous, but it is messy.
A future Clean Build should:
- list which files are currently loaded by `index.html`
- keep active files
- archive or delete unused hotfix files only after verification

Suggested future version:
- V61: clean repository audit and cleanup plan.


## 13. Contact Us V59.4
The Contact Us card is injected into the More page by `v59-qa-system.js`.
It intentionally replaced the former More-page Q&A card.
The card is three-language and includes:
- Church email: omideno7church@gmail.com
- Web app: https://omideno7.github.io/omideno7-app/
- Instagram: https://www.instagram.com/omideno7
- YouTube: https://www.youtube.com/@omideno7
- Address: Lastovska ulica 2A, Zagreb, Croatia
- Phone: +385 91 788 0824
- Online meeting: https://join.freeconferencecall.com/omideno7church


## V59.4 Q&A Admin and Contact Notes
- The public Q&A card remains only on the Home page.
- The Admin login is not shown to normal users. Admin may open it by visiting `https://omideno7.github.io/omideno7-app/?qa_admin=1` or using `#qa-admin`.
- Contact card in More is intentionally limited to church email, Instagram, and YouTube. Personal phone number, address, web app link, and online meeting link are not shown there.


### V59.4 Loading Hotfix
The install guide was changed to avoid continuous MutationObserver updates. Admin app entry remains `admin.html`.


## V59.6 — Admin Home Screen Fix
- Purpose: Fix the issue where `?qa_admin=1` works in Safari but is lost after Add to Home Screen.
- Added `admin.webmanifest` with `start_url` pointing to `admin.html?admin_app=1&v=595`.
- Updated `admin.html` to set `localStorage.omideno7_admin_app=1` and redirect to the Q&A admin panel.
- Updated `v59-qa-system.js` to auto-open the admin tab when `qa_admin=1`, `admin_app=1`, `#qa-admin`, or `omideno7_admin_app` is present.
- Normal users still do not see the admin button unless admin mode is activated.


## V59.6
- Admin panel changed to a standalone `admin.html` app so Home Screen installation opens admin directly instead of losing query parameters.
- More > Contact Us now shows only church email, Instagram, and YouTube. Phone number, address, website/app link, and online meeting link are intentionally hidden from this card.


## V59.9 — Loading Stability Fix
- Do not use `v59-7-version-lock.js`; it was removed from `index.html` because it could cause slow loading/freezing on mobile.
- The app version is now static in `index.html`: App Version: V59.9.
- Install guide is now `v59-8-install-minimal.js`, a lightweight script with no continuous observers.
- Keep Supabase Q&A and standalone `admin.html` unchanged.


## V59.9 Notes
- Public Q&A answers are displayed per selected app language.
- Answer text uses Supabase `text` fields; long pastoral answers are supported.
- Duplicate footer version labels are cleaned and replaced with a single App Version: V59.9 label.
- Supabase RLS may require the public answer select policy below for anon access to the security-invoker view.
