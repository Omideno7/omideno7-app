Omid No 7 Church PWA - V14 Cache-Bust Final

This version uses renamed files:
- styles-v14.css
- app-v14.js
- plans-v14.js
- daily-messages-v14.js
- declarations-v14.js
- config-v14.js

Why:
Browsers and Home Screen PWAs can keep old app.js/css cached. Renaming files forces the new version to load.

Fixes included:
- Bottom navigation: Home | Plans | Bible | Word | More
- Bible icon visible in nav as 📖
- Plans page opens first as a list of plans
- Selecting a plan starts at Day 1 and continues day by day
- Scripture references in plans are localized for English, Persian, Croatian
- More page footer shows App Version: V14 so you can confirm this version is loaded

Upload ALL files in this zip to GitHub root and commit.
Test URL:
https://omideno7.github.io/omideno7-app/?v=14

IMPORTANT:
After uploading, delete the old Home Screen app icon once and reinstall it from Safari if it still shows old content.


V15:
- Removed personal photo banners from the Obedience plan.
- Plans now use a clean professional design without portrait images.
Test URL:
https://omideno7.github.io/omideno7-app/?v=15


V16:
- Scripture references inside the Teaching Plans are now clickable expandable buttons.
- Tapping a scripture reference opens the verse text.
- Verse text is localized for English, Persian, and Croatian where the plan is viewed.
Test URL:
https://omideno7.github.io/omideno7-app/?v=16


V17:
- Salvation and New Life in Christ plan now has a unique devotional teaching for each of the 10 days.
- Each day is deeper and aligned with its title/topic.
- Scripture references remain clickable expandable buttons.
- Verse text remains localized in English, Persian, and Croatian.
Test URL:
https://omideno7.github.io/omideno7-app/?v=17


V18:
- Footer now shows: Omideno7 Church (New Hope7) before App Version.
- Expanded Faith Declarations: financial prosperity, health, victory/success.
- Expanded Our Vision with discipleship, strengthening faith, and helping believers know the truth.
- Expanded Beliefs of Omideno7 Church.
Test URL:
https://omideno7.github.io/omideno7-app/?v=18

V19:
- Daily Word now has clickable scripture references.
- Tapping the reference opens the full verse.
- Daily Word has longer reflection text in English, Persian, and Croatian.
- Other app sections remain unchanged.
Test URL:
https://omideno7.github.io/omideno7-app/?v=19

V20: Daily Word replaced with user 30-day messages; clickable verse, localized references, explanation, declaration, and prayer. Test URL: https://omideno7.github.io/omideno7-app/?v=20


V21:
- Added audio reading for the Daily Word section.
- Users can tap "Listen to Daily Word" to hear the daily message read aloud.
- Added Stop Reading button.
- Audio text follows the selected language: Persian, English, or Croatian.
- Other app sections remain unchanged.
Test URL:
https://omideno7.github.io/omideno7-app/?v=21

V22:
- Added a new 28-day Thanksgiving course.
- Includes introduction, usage guide, clickable scripture verses, daily practice, reflection question, declaration, and unlimited local notes.
- Notes are saved on the user's own device.
- Course is available in Persian, English, and Croatian.
- Other app sections remain unchanged.
Test URL: https://omideno7.github.io/omideno7-app/?v=22

V23:
- Removed Daily Word card from Home because Word is already in the bottom navigation.
- Added Thanksgiving course card to Home.
- Improved Thanksgiving declaration readability with black text.
- Corrected Daily Word text for the later days to match the user-provided Persian content and translated it into English and Croatian.
- Other app sections remain unchanged.
Test URL:
https://omideno7.github.io/omideno7-app/?v=23

V24:
- Rebuilt the salvation/new birth section.
- Added four clickable topics: What Is Salvation, Prayer of Salvation, What Is New Birth, and Christian Life.
- Replaced the incomplete prayer with the full prayer of salvation provided by the user.
- Added six new birth teaching video links.
- Added registration call-to-action after salvation prayer and Christian life section.
- Persian, English, and Croatian versions included.
- Other app sections remain unchanged.
Test URL:
https://omideno7.github.io/omideno7-app/?v=24

V25: Bible App link in Bible section; direct notification links; OneSignal language tags; 30-day faith declarations; OneSignal setup guide.

V26:
- Added GitHub Actions automation for dynamic OneSignal notifications.
- Daily Word, Thanksgiving, and Faith Declaration notifications now read the current day’s content from the app files.
- Notifications are sent separately for Persian, English, and Croatian users based on OneSignal language tags.
- Added scripts/send-dynamic-notification.js.
- Added .github/workflows/send-daily-word.yml, send-thanksgiving.yml, and send-faith-declaration.yml.
Test URL:
https://omideno7.github.io/omideno7-app/?v=26

V27:
- Added Bible Reader Beta to the Bible section.
- Added professional reader UI with book/chapter selectors, search over imported text, bookmarks, read marker, highlight colors, bold, and verse notes up to 1000 characters.
- Added starter/sample Bible text only to test the reader system. Full trilingual Bible import is the next stage.
- Fixed Persian daily audio by chunking long text into shorter spoken segments.
Test URL:
https://omideno7.github.io/omideno7-app/?v=27

V28:
- Moved Gospel Study/Bible Reader to the top of the Bible page.
- Removed the large generic Bible.com card from the top position; Bible App church link remains below the reader.
- Fixed blank Bible Reader page by rendering content when the page opens.
- Added complete four Gospels in Persian, English, and Croatian from public-domain/approved sources prepared through eBible/BibleNLP corpus.
- Reader features remain: search, bookmark, read marker, highlight, bold, and verse notes up to 1000 characters.
Test URL:
https://omideno7.github.io/omideno7-app/?v=28

V29:
- Removed the browser/computer text-to-speech controls from Daily Word because browser TTS was unstable on Persian/English/Croatian.
- Kept all V28 Gospel Reader features and the complete four Gospels.
- Prepared the app for a future upgrade using real recorded audio files by Omideno7 Church.
Test URL:
https://omideno7.github.io/omideno7-app/?v=29

V30:
- Replaced four-Gospels-only Bible Reader with the complete New Testament in Persian, English, and Croatian.
- Kept all reader features: search, bookmark, read marker, highlight, bold, personal note up to 1000 characters.
- Added original-language key word explanation infrastructure.
- Added first set of Greek key word notes for major verses. This dataset can be expanded progressively.
Test URL:
https://omideno7.github.io/omideno7-app/?v=30

V31:
- Fixed Bible Reader flow and made it cleaner:
  Bible > Bible Study card > Bible > New Testament > books > chapters/verses.
- Restored/kept the Bible App church card below the in-app Bible section.
- Cleaned verse UI: action buttons are no longer shown under every verse.
- Tapping a verse opens tools for bookmark, read marker, bold, highlight, note, and key words.
- Added stronger language fallback so Persian text is displayed when available.
Test URL:
https://omideno7.github.io/omideno7-app/?v=31

V32:
- Added the complete Old Testament in Persian, English, and Croatian.
- Kept the complete New Testament in Persian, English, and Croatian.
- Added Bible home sections: Old Testament, New Testament, and Apocrypha.
- Added Apocrypha section shell with book list, but not the full apocrypha text yet because publishable Persian and Croatian source texts must be verified first.
- All existing reader features work for Old Testament and New Testament: search, bookmark, read marker, highlight, bold, notes, and key word panels where available.
Test URL:
https://omideno7.github.io/omideno7-app/?v=32

V33:
- Added a trilingual Apocrypha introduction.
- Added English text loader for the main Project Gutenberg Deuterocanonical/Apocrypha books.
- Persian and Croatian Apocrypha translations are marked as coming later; the English text displays as fallback in all languages.
- Kept full Old Testament and New Testament in Persian, English, and Croatian.
- Kept search, highlight, bookmark, bold, read marker, and notes for Bible and loaded Apocrypha text.
Test URL:
https://omideno7.github.io/omideno7-app/?v=33

V34:
- Fixed Bible navigation: Old Testament, New Testament, and Apocrypha book cards now open reliably.
- Added explicit event binding instead of relying only on inline click handlers.
- Added stronger rendering refresh when entering the Bible Reader.
- Kept all V33 content and features.
Test URL:
https://omideno7.github.io/omideno7-app/?v=34

V35:
- Added stronger Persian Bible text handling and a clean v35 Bible data file to avoid old-cache confusion.
- Added Bible reading plans: one-year and two-year daily reading plans in Persian, English, and Croatian UI.
- Each reading plan shows today’s assigned chapters and the chapter text inside the app.
- Added Persian Audio Bible placeholder; real MP3 files can be connected after upload.
Test URL:
https://omideno7.github.io/omideno7-app/?v=35

V36:
- Fixed Persian Bible entry button by adding a dedicated Bible-home opener.
- The Bible button now resets Bible Reader to the main Bible section page before opening.
- Strengthened Persian text selection for Bible chapters and reading plans.
- Added cache-busting Bible data file bible-reader-v36.js.
Test URL:
https://omideno7.github.io/omideno7-app/?v=36

V37:
- Replaced generated one-year/two-year Bible reading plan with the uploaded PDF table schedule.
- One-year plan now follows the uploaded table.
- Two-year plan uses the same table, splitting each table day into two slower reading days.
- All displayed reading texts still follow the selected app language: Persian, English, or Croatian.
Test URL:
https://omideno7.github.io/omideno7-app/?v=37
