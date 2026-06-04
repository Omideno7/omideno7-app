Omideno7 V63.55 — Single Stable Home Layer Beta

این نسخه برای رفع ریشه‌ای پرش بخش خوشامدگویی ساخته شد.

علت مشکل:
در نسخه‌های قبلی چند اسکریپت هم‌زمان روی کارت خوشامدگویی کار می‌کردند:
- V63.52
- V63.53
- V63.54
این باعث می‌شد کارت خوشامدگویی محو شود یا پرش داشته باشد.

راه‌حل:
این نسخه از V63.51 شروع شده و فقط یک لایه پایدار واحد اضافه می‌کند:
- v63-55-single-stable-home-layer-beta.js

اصلاحات:
- پرش کارت خوشامدگویی برطرف شد.
- پیام ورود به اپ سه‌زبانه شد: فارسی، انگلیسی، کرواتی.
- متن و دکمه بخش تولد تازه / نجات سه‌زبانه شد، بدون تغییر دادن محتوای داخلی آن.
- آیکون FreeConferenceCall کنار دکمه ورود به جلسه باقی می‌ماند.
- کارت مدال‌ها در منوی بیشتر حفظ/بازسازی می‌شود.
- بخش‌های دیگر اپ تغییر نکرده‌اند.

Upload/Replace:
- beta.html
- fcc-icon.jpg
- v63-49-salvation-registration-form-beta.js
- v63-51-precise-home-restore-beta.js
- v63-55-single-stable-home-layer-beta.js
- OMIDENO7_APP_STATUS_REPORT.md

فایل‌های زیر دیگر نباید در beta.html خوانده شوند و می‌توانی برای تمیزی پروژه حذف‌شان کنی:
- v63-52-home-ui-polish-medals-beta.js
- v63-53-welcome-meetings-ui-beta.js
- v63-54-stable-welcome-fcc-icon-beta.js

SQL جدید لازم نیست.

تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6355
