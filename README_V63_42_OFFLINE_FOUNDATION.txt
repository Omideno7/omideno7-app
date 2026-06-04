Omideno7 V63.42 — Offline Foundation Beta

این مرحله فقط نسخه Beta را تغییر می‌دهد و روی اپ اصلی کاربران اثر ندارد.

هدف:
شروع آفلاین‌کردن پایه اپ بدون Service Worker عمومی، تا هیچ خطری برای اپ اصلی ایجاد نشود.

این نسخه چه می‌کند؟
- فایل‌های لودشده اپ را داخل Cache Storage ذخیره می‌کند.
- یک اسنپ‌شات محلی از زبان، روز برنامه ۳۶۵، وضعیت آنلاین و بخشی از کلام روزانه ذخیره می‌کند.
- یک صف آفلاین محلی می‌سازد.
- می‌تواند صف تستی آفلاین را به جدول offline_sync_queue در Supabase بفرستد.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-41g-cloud-autosave-stable-beta.js
- v63-42-offline-foundation-beta.js
- OMIDENO7_APP_STATUS_REPORT.md
- SECURITY_AUDIT_V63_42.md

SQL:
اگر قبلاً SQL نسخه V63.41 را اجرا کرده‌ای و جدول offline_sync_queue را داری، SQL جدید لازم نیست.
اگر جدول offline_sync_queue را نداری، فایل supabase-v63-42-offline-foundation-check.sql را اجرا کن.

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6342

تست:
1. وارد مدرسه شو.
2. برو بخش بیشتر.
3. پنل V63.42 Offline Foundation را ببین.
4. دکمه «آماده‌سازی آفلاین پایه» را بزن.
5. دکمه «تست وضعیت آفلاین» را بزن.
6. دکمه «ثبت تست در صف آفلاین» را بزن.
7. دکمه «ارسال صف آفلاین به کلود» را بزن.
8. در Supabase جدول offline_sync_queue را Refresh کن.

قدم بعدی بعد از موفقیت:
V63.43 — Isolated Service Worker Offline Beta
