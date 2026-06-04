Omideno7 V63.44b — Stable Personal Backup Fix

مشکل مشاهده‌شده:
- با کلیک روی «ذخیره پشتیبان در کلود»، اپ به مدرسه/کلاس بازشده می‌پرید.
- جدول user_app_backups در Supabase خالی می‌ماند.

این هات‌فیکس چه می‌کند؟
- پنل قبلی V63.44 را مخفی می‌کند.
- پنل جدید V63.44b می‌سازد.
- همه کلیک‌های پنل را ایزوله می‌کند تا دیگر به مدرسه نپرد.
- دکمه «تست اتصال جدول» اضافه می‌کند.
- بعد از ذخیره، خروجی Supabase را در گزارش نشان می‌دهد.
- اگر SQL/RLS/لاگین مشکل داشته باشد، خطای واقعی را نشان می‌دهد.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-44b-personal-cloud-backup-stable-beta.js
- supabase-v63-44-user-app-backups.sql
- README_V63_44B_STABLE_PERSONAL_BACKUP_FIX.txt

SQL:
اگر جدول user_app_backups را قبلاً درست اجرا کرده‌ای، لازم نیست.
اگر هنوز جدول خالی/مشکوک است، دوباره فایل SQL را اجرا کن:
supabase-v63-44-user-app-backups.sql

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6344b

روش تست:
1. با اکانت دانشجو وارد مدرسه شو تا Supabase client فعال شود.
2. برو بخش بیشتر.
3. پنل V63.44b را پیدا کن.
4. اول بزن: تست اتصال جدول.
5. اگر سبز شد، بزن: بررسی اطلاعات.
6. بعد بزن: ذخیره قطعی در کلود.
7. Supabase → user_app_backups را Refresh کن.
8. باید یک ردیف personal_app_data ببینی.

اگر خطا آمد، متن خطای قرمز را بفرست تا دقیق همان را اصلاح کنیم.
