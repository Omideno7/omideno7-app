Omideno7 V63.47 — Maximum Security + Offline Audio Beta

این نسخه هنوز Stable Release Candidate نیست.
اول امنیت را تا حد ممکن بالا می‌بریم و صوت آفلاین را تست می‌کنیم.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-46-security-cloud-final-beta.js
- v63-47-max-security-beta.js
- v63-47-offline-audio-beta.js
- supabase-v63-47-max-security-audio.sql
- README_V63_47_MAX_SECURITY_OFFLINE_AUDIO_BETA.txt
- OMIDENO7_APP_STATUS_REPORT.md
- SECURITY_AUDIT_V63_47.md

SQL:
یک بار اجرا کن:
supabase-v63-47-max-security-audio.sql

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6347

تست امنیت:
1. وارد اکانت دانشجو یا ادمین شو.
2. برو بیشتر.
3. پنل «امنیت حداکثری» را پیدا کن.
4. بزن: اجرای بررسی امنیت حداکثری.
5. باید کلید حساس 0 باشد، جدول‌ها OK باشند، Audit OK باشد.

تست صوت آفلاین:
1. اینترنت وصل باشد.
2. وارد یک درس مدرسه شو که صوت دارد.
3. صوت را یک بار آنلاین باز کن یا حداقل صفحه درس صوت‌دار را باز کن.
4. برو بیشتر.
5. پنل «فایل‌های صوتی آفلاین» را پیدا کن.
6. بزن: پیدا کردن فایل‌های صوتی.
7. اگر فایل پیدا شد، بزن: ذخیره صوت‌ها برای آفلاین.
8. اینترنت را قطع کن.
9. بزن: نمایش صوت‌های ذخیره‌شده و تست کن.

نکته مهم:
اگر فایل صوتی پیدا نشد، یعنی فایل‌های مدرسه در DOM با audio/src یا mp3 link نمایش داده نمی‌شوند. آن‌وقت باید مرحله بعدی را بسازیم که فایل‌نام‌های Supabase school-audio را مستقیم از لیست درس‌ها بخواند.
