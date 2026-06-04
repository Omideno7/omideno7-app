Omideno7 V63.47c — Security Client Fix + Function Hardening

مشکل:
در پنل امنیت حداکثری خطا می‌آمد:
Supabase client not found. Login/open School once, then return to More.

علت:
پنل امنیتی قبلی فقط به Supabase client بخش مدرسه وابسته بود. اگر آن client در حافظه صفحه پیدا نمی‌شد، بررسی امنیت متوقف می‌شد.

این نسخه:
- پنل امنیت قبلی را مخفی می‌کند.
- پنل جدید V63.47c می‌سازد.
- Supabase client را از چند مسیر مختلف پیدا می‌کند.
- اگر امکان داشته باشد با public anon key خودش client می‌سازد.
- تست اتصال Supabase جدا اضافه می‌کند.
- SQL برای fix ستون metadata و hardening functionهای هشدار داده‌شده آماده شده.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-47c-security-client-fix-beta.js
- supabase-v63-47c-security-advisor-hardening.sql
- README_V63_47C_SECURITY_CLIENT_FIX.txt
- OMIDENO7_APP_STATUS_REPORT.md
- SECURITY_AUDIT_V63_47.md

SQL:
یک بار اجرا کن:
supabase-v63-47c-security-advisor-hardening.sql

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6347c

روش تست:
1. صفحه را کامل Refresh کن.
2. اگر لازم شد، یک بار وارد مدرسه شو و برگرد به بیشتر.
3. پنل V63.47c را پیدا کن.
4. اول بزن: تست اتصال Supabase.
5. اگر سبز شد، بزن: اجرای بررسی امنیت حداکثری.

اگر Security Advisor هنوز warning داد:
صفحه Advisor را Refresh کن، چون بعضی warningها بعد از schema reload چند دقیقه طول می‌کشند.
