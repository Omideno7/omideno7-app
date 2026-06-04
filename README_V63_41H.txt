Omideno7 V63.41h — Beta Version Display Clean Fix

این هات‌فیکس فقط مشکل نمایش نسخه در Beta را اصلاح می‌کند.

مشکل:
در پایین بخش «بیشتر» نسخه‌ها بین V61.5 / V63.36 / V63.41 Beta عوض می‌شدند و پرش داشتند.

کار این بسته:
- اسکریپت قدیمی v63-36-version-stability-lock.js را فقط در beta.html غیرفعال می‌کند.
- همه متن‌های نسخه قدیمی را مخفی می‌کند.
- یک نسخه ثابت بالا و پایین می‌گذارد:
  App Version: V63.41 Beta

فایل‌هایی که باید Upload/Replace شوند:
- beta.html
- v63-41h-beta-version-clean-lock.js

نیازی به SQL نیست.

لینک تست:
https://omideno7.github.io/omideno7-app/beta.html?v=6341h

بعد از این اگر ذخیره خودکار V63.41G همچنان درست کار کند، قدم بعدی:
V63.42 — Offline Foundation Beta
