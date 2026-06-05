Omideno7 cleanup-beta V63.85

این بسته فقط beta.html را جایگزین می‌کند و فایل جدید JS اضافه نمی‌کند.

اصلاحات انجام‌شده:
1) سه فایل تستی/diagnostic که پنل‌ها و نوارهای رنگی می‌ساختند غیرفعال شدند:
   - v63-40-security-cloud-diagnostic.js
   - v63-41g-cloud-autosave-stable-beta.js
   - v63-45b-restore-visible-test-beta.js

2) بخش «ارتباط با ما» به صورت مستقیم داخل More اضافه شد، نه با patch جدید.
3) لینک PayPal از MehdiBadanFirouz377 به MehdiBadanFirouz337 اصلاح شد.
4) خط خراب آخر فایل با </script></script> اصلاح شد.
5) هیچ فایل جدیدی به پروژه اضافه نمی‌شود.
6) بخش‌های Supabase، Cloud، Offline، Security، OneSignal، School، New Birth، Daily Word، Bible و Bible365 در همین beta.html حذف نشده‌اند.

روش استفاده:
- فقط beta.html داخل این ZIP را در branch cleanup-beta جایگزین beta.html فعلی کن.
- فایل‌های دیگر را فعلاً دست نزن.
- بعد تست کن:
  https://omideno7.github.io/omideno7-app/beta.html?v=6385-clean
