
Omideno7 V63.57 — RC Stable Home + Access Beta

این نسخه برای پایدارسازی نهایی بتا ساخته شده است.

اصلاحات:
1. ورود اپ همیشه روی Home/خانه باز می‌شود، نه پرسش و پاسخ یا ادمین.
2. کارت «به کلیسای امیدنو۷ خوش آمدید» پایدار شد و دیگر دوبل/پرشی نیست.
3. پیام روزانه سه‌زبانه و پایدار است.
4. دکمه‌ها و متن‌های تولد تازه سه‌زبانه هستند و از متن کامل نسخه V63.56 استفاده می‌کنند.
5. اطلاعات عمومی جلسه فقط زمان جلسات را نشان می‌دهد؛ لینک، Access Code و Security Code عمومی نیست.
6. دکمه ورود به جلسه فقط بعد از تأیید ثبت‌نام، لینک و رمز را نمایش می‌دهد.
7. اگر رکورد کاربر در جدول church_member_registrations با approval_status='approved' یا meeting_access_visible=true باشد، رمز 789987 در اپ نمایش داده می‌شود.
8. کارت مدال‌ها در More برگشت.
9. کارت گزارش تست نسخه بتا در More اضافه شد.
10. پنل‌های تست/آزمایشی عمومی در More تا حد امکان مخفی می‌شوند.
11. آیکن‌های خانه حفظ/افزوده می‌شوند.

Upload/Replace:
- beta.html
- v63-57-rc-stable-home-access-beta.js
- OMIDENO7_APP_STATUS_REPORT.md

همچنین اگر در GitHub نبودند، فایل‌های قبلی همراه ZIP را هم نگه دار:
- v63-49-salvation-registration-form-beta.js
- v63-51-precise-home-restore-beta.js

SQL:
اگر می‌خواهی رمز فقط بعد از تأیید ادمین نمایش داده شود، فایل زیر را یک بار در Supabase SQL Editor اجرا کن:
- supabase-v63-57-meeting-access-approval.sql

تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6357
