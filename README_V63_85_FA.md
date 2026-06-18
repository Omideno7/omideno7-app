# Omideno7 V63.85 Registration + School + Admin Stable Fix

این بسته برای اصلاح یکجای مشکل‌های ثبت‌نام و پنل ادمین آماده شده است.

## فایل‌هایی که باید روی GitHub جایگزین شوند

- index.html
- beta.html
- v63-online-school.js
- v63-49-salvation-registration-form-beta.js
- v63-63-admin-registration-approval-beta.js
- omideno7-v63-85-registration-school-admin-stable-fix.js

admin.html و v63-49d-home-salvation-registration-fasting-fix-beta.js هم برای هماهنگی داخل بسته گذاشته شده‌اند؛ اگر همین فایل‌ها در GitHub وجود دارند، می‌توانید جایگزین کنید.

## چه چیزی اصلاح شده است؟

1. ثبت‌نام دریافت لینک/کد جلسه به جدول `access_requests` با `status='pending'` می‌رود.
2. ثبت‌نام مدرسه به جدول `school_students` با `status='pending_review'` می‌رود.
3. پنل ادمین جدید، هم درخواست‌های جلسه و هم ثبت‌نام‌های مدرسه را نشان می‌دهد.
4. کارت‌ها بسته هستند و با کلیک روی نام باز می‌شوند.
5. دکمه‌های Approve / Reject / Delete اضافه شده‌اند.
6. اگر Supabase خطا بدهد، پیام موفقیت دروغین نمایش داده نمی‌شود.
7. بعد از ثبت موفق، فرم ثبت‌نام با پیام انتظار تأیید جایگزین می‌شود.

## تست بعد از آپلود

اپ را با این لینک باز کنید:

https://omideno7.github.io/omideno7-app/?v=6385-final

ادمین:

https://omideno7.github.io/omideno7-app/admin.html

## کوئری‌های تست

برای جلسه:

select * from public.access_requests order by created_at desc limit 50;

برای مدرسه:

select * from public.school_students order by updated_at desc limit 50;

