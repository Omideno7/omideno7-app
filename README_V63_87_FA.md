# Omideno7 V63.87 — Final Registration / School / Admin Flow Fix

این نسخه برای اصلاح نهایی جریان ثبت‌نام و پنل ادمین آماده شده است.

## اصلاحات اصلی

1. پنل درخواست‌ها دیگر در More / بیشتر نمایش داده نمی‌شود.
2. درخواست‌های ورود به جلسه و ثبت‌نام‌های مدرسه داخل مسیر زیر نمایش داده می‌شوند:

School / مدرسه → Admin / پنل مدیریت → درخواست‌های ثبت‌نام و دسترسی

3. پنل ادمین دو لیست را نشان می‌دهد:
   - Meeting Access Requests / درخواست‌های ورود به جلسه از جدول `access_requests`
   - School Registrations / ثبت‌نام‌های مدرسه از جدول `school_students`

4. لیست‌ها به صورت خودکار فقط هنگام ساخت پنل لود می‌شوند؛ بنابراین با باز کردن جزئیات، کارت بسته نمی‌شود و صفحه نمی‌پرد.
5. هر کارت دکمه‌های Approve / Reject / Delete دارد.
6. فرم درخواست لینک جلسه بعد از ذخیره واقعی در Supabase با پیام انتظار تأیید جایگزین می‌شود.
7. اگر ذخیره در Supabase خطا بدهد، پیام موفقیت نشان داده نمی‌شود؛ خطای واقعی نشان داده می‌شود.
8. در مدرسه روند ثبت‌نام به زبان کاربر نمایش داده می‌شود:
   - ساخت حساب
   - تأیید ایمیل از Inbox
   - ورود دوباره و تکمیل فرم مدرسه
   - انتظار برای تأیید ادمین
9. پیام‌های فارسی، انگلیسی و کرواتی برای روند ثبت‌نام اضافه شده‌اند.

## فایل‌هایی که باید در ریشه GitHub جایگزین/اضافه شوند

- `index.html`
- `beta.html`
- `admin.html`
- `v63-online-school.js`
- `v63-49-salvation-registration-form-beta.js`
- `v63-49d-home-salvation-registration-fasting-fix-beta.js`
- `v63-63-admin-registration-approval-beta.js`
- `omideno7-v63-87-final-registration-school-admin-flow-fix.js`

## لینک تست بعد از Deploy

https://omideno7.github.io/omideno7-app/?v=6387-final

## لینک ادمین

https://omideno7.github.io/omideno7-app/admin.html
