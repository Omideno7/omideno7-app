
Omideno7 V63.62 — Meeting Approval Strict

مشکل نسخه قبلی:
- اگر کاربر در مدرسه/اپ لاگین بود، لینک جلسه مستقیم باز می‌شد، حتی اگر تأیید ادمین نشده بود.

اصلاح:
- دکمه ورود به جلسه فقط وقتی لینک و کد را نشان می‌دهد که رکورد کاربر در جدول church_member_registrations تأیید شده باشد.
- شرط تأیید:
  approval_status = approved
  یا status = approved
  یا meeting_access_visible = true

Upload/Replace:
- beta.html
- v63-62-meeting-approval-strict-beta.js
- OMIDENO7_APP_STATUS_REPORT.md

SQL کمکی:
- supabase-v63-62-approve-registration-example.sql
این فایل را در GitHub نگه ندار؛ فقط برای اجرای دستی در Supabase SQL Editor است.

Test:
https://omideno7.github.io/omideno7-app/beta.html?v=6362
