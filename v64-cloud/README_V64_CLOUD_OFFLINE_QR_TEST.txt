OMIDENO7 / NEW HOPE 7 — V64 CLOUD + OFFLINE + QR TEST

این ZIP فقط نسخه تست را اضافه می‌کند و نباید صفحه اصلی را جایگزین کند.

آپلود در GitHub:
1) پوشه v64-cloud را در ریشه پروژه omideno7-app آپلود کنید.
2) هیچ فایل اصلی مثل index.html یا beta.html را جایگزین نکنید.
3) Commit کنید و صبر کنید GitHub Pages deploy شود.

لینک تست:
https://omideno7.github.io/omideno7-app/v64-cloud/index.html?v=6402

قبل از تست Cloud:
در Supabase > SQL Editor فایل SUPABASE_USER_APP_STATE_SQL_V64.sql را اجرا کنید.

چه چیزهایی اضافه شده:
- کارت جدید در صفحه More / بیشتر: Cloud Save, Offline & App Install — V64 Test
- ذخیره دستی در کلود
- بازیابی دستی از کلود
- ذخیره خودکار اختیاری
- آماده‌سازی آفلاین با Service Worker جداگانه فقط برای /v64-cloud/
- QR Code برای نصب/اشتراک اپ اصلی
- لینک نصب عمومی: https://omideno7.github.io/omideno7-app/?install=1

محدودیت مهم:
در آیفون، وب‌اپ نمی‌تواند خودش مستقیم پنجره Add to Home Screen را باز کند. کاربر باید Safari > Share > Add to Home Screen را بزند.
در اندروید، Chrome ممکن است دکمه نصب را با beforeinstallprompt نشان دهد.

تست پیشنهادی:
1) لینک تست V64 را باز کنید.
2) به School وارد شوید تا Supabase session فعال شود.
3) به More بروید.
4) روی Save to cloud بزنید.
5) جدول user_app_state را در Supabase بررسی کنید.
6) یک یادداشت/زبان/پیشرفت را تغییر دهید.
7) Restore from cloud را بزنید و صفحه را Refresh کنید.
8) Prepare offline را بزنید، اینترنت را قطع کنید، همان لینک V64 را دوباره باز کنید.

اگر چیزی خراب شد:
فقط پوشه v64-cloud را حذف کنید. صفحه اصلی اپ دست‌نخورده می‌ماند.


V64.02 changes:
- QR/install block moved from More to the Home install guide/card.
- Cloud/offline status messages now stay visible and also show an alert on errors.
- QR image path changed to an absolute GitHub Pages path.
