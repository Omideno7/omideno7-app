Omideno7 V63.44c — Personal Backup Button Fix

مشکل V63.44b:
در نسخه 44b برای جلوگیری از پریدن به مدرسه، کلیک‌های پنل را بیش از حد مسدود کرده بودیم. همین باعث شد دکمه‌های خود پنل هم کار نکنند.

این نسخه چه می‌کند؟
- پنل‌های قبلی 44 و 44b را مخفی می‌کند.
- پنل جدید 44c می‌سازد.
- دکمه‌ها با onclick مستقیم کار می‌کنند.
- دیگر click isolation روی خود پنل ندارد.
- خطای Supabase را واضح نشان می‌دهد.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-44c-personal-backup-button-fix-beta.js
- supabase-v63-44-user-app-backups.sql
- README_V63_44C_PERSONAL_BACKUP_BUTTON_FIX.txt

SQL:
اگر جدول user_app_backups را قبلاً ساخته‌ای، SQL لازم نیست.
اگر مطمئن نیستی، دوباره supabase-v63-44-user-app-backups.sql را اجرا کن.

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6344c

روش تست:
1. وارد مدرسه شو تا کاربر لاگین باشد.
2. برو بخش بیشتر.
3. پنل V63.44c را ببین.
4. بزن: تست اتصال جدول.
5. اگر سبز شد، بزن: بررسی اطلاعات.
6. بعد بزن: ذخیره قطعی در کلود.
7. Supabase → user_app_backups را Refresh کن.

اگر خطا آمد، متن قرمز را بفرست.
