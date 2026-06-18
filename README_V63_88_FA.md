# OmideNo7 V63.88 — اصلاح نهایی Supabase Client + ثبت‌نام + پنل ادمین

این نسخه برای رفع خطای زیر ساخته شده است:

`Supabase client not available`

## علت مشکل
در بعضی دستگاه‌ها Supabase SDK قبل از ثبت فرم آماده نمی‌شد یا از CDN دیر/ناموفق لود می‌شد. بنابراین فرم ثبت‌نام به Supabase نمی‌رسید و کاربر خطا می‌دید.

## اصلاحات V63.88

1. فایل جدید `omideno7-v63-88-supabase-bridge-final.js` اضافه شد.
2. این فایل یک Supabase client مشترک و پایدار برای مدرسه، ثبت‌نام و ادمین می‌سازد.
3. اگر CDN اول کار نکند، از CDNهای جایگزین استفاده می‌کند.
4. فرم ثبت‌نام جلسه فقط بعد از ذخیره واقعی در `access_requests` پیام موفقیت می‌دهد.
5. فرم ثبت‌نام پس از ثبت موفق با پیام انتظار تأیید جایگزین می‌شود.
6. دکمه‌های صف محلی/ارسال فرم‌های ذخیره‌شده از فرم ثبت‌نام حذف شدند تا کاربر گیج نشود.
7. پنل درخواست‌ها در More نمایش داده نمی‌شود و فقط داخل School Admin قرار دارد.
8. مدرسه و روند ثبت‌نام مدرسه همچنان چندزبانه است.

## فایل‌هایی که باید در GitHub آپلود شوند

همه فایل‌های زیر را در ریشه پروژه جایگزین/اضافه کنید:

- index.html
- beta.html
- admin.html
- v63-online-school.js
- v63-49-salvation-registration-form-beta.js
- v63-49d-home-salvation-registration-fasting-fix-beta.js
- v63-63-admin-registration-approval-beta.js
- omideno7-v63-88-supabase-bridge-final.js
- omideno7-v63-88-final-registration-school-admin-flow-fix.js
- README_V63_88_FA.md

## لینک تست

بعد از Commit و Deploy:

https://omideno7.github.io/omideno7-app/?v=6388-final

پنل ادمین:

https://omideno7.github.io/omideno7-app/admin.html

## تست Supabase

درخواست‌های جلسه:

```sql
select * from public.access_requests order by created_at desc limit 50;
```

ثبت‌نام‌های مدرسه:

```sql
select * from public.school_students order by updated_at desc limit 50;
```

