
Omideno7 V63.63 — Admin Registration Approval

این نسخه فقط یک بخش ادمین برای تأیید ثبت‌نام‌های کلیسا اضافه می‌کند و بخش‌های دیگر اپ را تغییر نمی‌دهد.

کارکرد:
- فقط اگر کاربر با ایمیل ادمین وارد شده باشد، در منوی «بیشتر» کارت «درخواست‌های ثبت‌نام کلیسا» نمایش داده می‌شود.
- ادمین لیست ثبت‌نام‌ها را می‌بیند.
- با دکمه «تأیید و فعال‌سازی کد جلسه»، این موارد برای کاربر فعال می‌شود:
  approval_status = approved
  status = approved
  meeting_access_visible = true
  meeting_access_code = 789987

Upload/Replace:
- beta.html
- v63-63-admin-registration-approval-beta.js
- OMIDENO7_APP_STATUS_REPORT.md

SQL:
- supabase-v63-63-admin-registration-approval.sql
این فایل را فقط یک بار در Supabase SQL Editor اجرا کن و در GitHub نگه ندار.

Test:
https://omideno7.github.io/omideno7-app/beta.html?v=6363
