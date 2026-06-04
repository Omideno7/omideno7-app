Omideno7 V63.65 — Admin Registration Approval in School/Admin Panel ONLY

این فایل جایگزین فایل قبلی است:
v63-63-admin-registration-approval-beta.js

این نسخه فقط همان بخش تأیید ثبت‌نام‌ها را اصلاح می‌کند:
- کارت تأیید ثبت‌نام دیگر در منوی «بیشتر» نمایش داده نمی‌شود.
- کارت فقط داخل پنل مدرسه/ادمین، کنار بخش‌های مدیریتی مثل پرسش و پاسخ، نمایش داده می‌شود.
- دکمه‌های «بارگذاری درخواست‌ها»، «بروزرسانی» و «تأیید» با event delegation پایدارتر شده‌اند.

Upload:
فقط این فایل را در GitHub جایگزین کن:
- v63-63-admin-registration-approval-beta.js

نیازی به تغییر beta.html نیست، چون beta.html همین فایل را از قبل لود می‌کند.

اگر دکمه‌ها باز هم خطای Supabase/RLS دادند، فایل SQL را یک بار در Supabase SQL Editor اجرا کن:
- supabase-v63-65-admin-registration-approval.sql

بعد از اجرای SQL، فایل SQL را در GitHub نگه ندار.
