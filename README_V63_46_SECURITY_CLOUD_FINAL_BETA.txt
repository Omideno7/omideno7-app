Omideno7 V63.46 — Security + Cloud Final Beta

هدف:
- امنیت Supabase و Cloud Backup را با هم تست کنیم.
- قبل از رفتن به نسخه اصلی، ساختار نهایی را در Beta ببینیم.
- مشکل نمایش نسخه پایین صفحه مثل V61.5 را در Beta قفل کنیم.

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-45b-restore-visible-test-beta.js
- v63-46-security-cloud-final-beta.js
- supabase-v63-46-security-cloud-hardening.sql
- OMIDENO7_APP_STATUS_REPORT.md
- SECURITY_AUDIT_V63_46.md
- README_V63_46_SECURITY_CLOUD_FINAL_BETA.txt

SQL:
یک بار اجرا کن:
supabase-v63-46-security-cloud-hardening.sql

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6346

روش تست:
1. با اکانت دانشجو/ادمین وارد شو.
2. برو بیشتر.
3. پنل V63.46 را پیدا کن.
4. بزن: بررسی امنیت.
5. بزن: بررسی کلود.
6. بزن: اجرای همه تست‌ها.
7. بزن: نمایش ساختار نسخه اصلی.
8. پایین صفحه را چک کن که دیگر V61.5 پرش نداشته باشد و فقط App Version: V63.46 Beta دیده شود.

اگر همه چیز OK شد:
مرحله بعد ساخت Stable Release Candidate است، نه تغییر مستقیم نسخه اصلی.
