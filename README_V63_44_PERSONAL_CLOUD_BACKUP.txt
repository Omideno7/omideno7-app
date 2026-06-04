Omideno7 V63.44 — Personal Cloud Backup Beta

این مرحله یک قدم بزرگ‌تر است:
- یادداشت‌های من
- آیه‌های ذخیره‌شده
- هایلایت‌ها
- تنظیمات زبان/نوتیفیکیشن
- پیشرفت برنامه ۳۶۵
- داده‌های مدرسه و صف آفلاین قابل شناسایی

همه به صورت Beta در جدول user_app_backups ذخیره می‌شوند.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-43-offline-school-lessons-beta.js
- v63-44-personal-cloud-backup-beta.js
- supabase-v63-44-user-app-backups.sql
- OMIDENO7_APP_STATUS_REPORT.md
- SECURITY_AUDIT_V63_44.md

SQL:
فایل زیر را یک بار در Supabase SQL Editor اجرا کن:
supabase-v63-44-user-app-backups.sql

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6344

روش تست:
1. با اکانت دانشجو وارد مدرسه شو.
2. در اپ چند یادداشت/آیه ذخیره‌شده/روز ۳۶۵ داشته باش.
3. برو بخش بیشتر.
4. پنل V63.44 را پیدا کن.
5. بزن: بررسی اطلاعات قابل پشتیبان‌گیری.
6. بزن: ذخیره پشتیبان در کلود.
7. Supabase → user_app_backups را Refresh کن.
8. باید یک ردیف backup_type = personal_app_data ببینی.
9. بعد برای تست Restore، یک مقدار محلی را تغییر بده و «بازیابی از کلود» را بزن.

در نسخه اصلی آینده:
این کارها اتوماتیک می‌شوند و کاربر این دکمه‌ها را نمی‌بیند.
