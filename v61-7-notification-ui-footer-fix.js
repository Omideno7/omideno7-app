/*
  Omideno7 V61.7 — Notification activation helper + footer version cleanup
  Scope: safe UI helper only. It does not modify Bible, Q&A, fasting, audio, plans, or workflows.
*/
(function () {
  'use strict';

  var VERSION_TEXT = 'App Version: V61.7';

  function getAppLang() {
    try {
      return localStorage.getItem('omideno7_language') ||
             localStorage.getItem('lang') ||
             document.documentElement.lang ||
             'fa';
    } catch (e) {
      return 'fa';
    }
  }

  function getDeviceTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    } catch (e) {
      return 'unknown';
    }
  }

  function withOneSignal(callback) {
    if (window.OneSignalDeferred && Array.isArray(window.OneSignalDeferred)) {
      window.OneSignalDeferred.push(function (OneSignal) { callback(OneSignal); });
      return true;
    }
    if (window.OneSignal && typeof window.OneSignal.push === 'function') {
      window.OneSignal.push(function () { callback(window.OneSignal); });
      return true;
    }
    if (window.OneSignal) {
      callback(window.OneSignal);
      return true;
    }
    return false;
  }

  async function applyNotificationTags() {
    var lang = getAppLang().slice(0, 2);
    if (!['fa', 'en', 'hr'].includes(lang)) lang = 'fa';
    var timezone = getDeviceTimezone();

    withOneSignal(async function (OneSignal) {
      try {
        if (OneSignal.User && typeof OneSignal.User.addTags === 'function') {
          await OneSignal.User.addTags({ app_lang: lang, timezone: timezone, church_app: 'omideno7' });
        } else if (typeof OneSignal.sendTags === 'function') {
          OneSignal.sendTags({ app_lang: lang, timezone: timezone, church_app: 'omideno7' });
        }
        if (OneSignal.User && typeof OneSignal.User.setLanguage === 'function') {
          await OneSignal.User.setLanguage(lang);
        } else if (typeof OneSignal.setLanguage === 'function') {
          OneSignal.setLanguage(lang);
        }
        console.log('[Omideno7] Notification tags updated:', { lang: lang, timezone: timezone });
      } catch (err) {
        console.warn('[Omideno7] Could not update OneSignal tags:', err);
      }
    });
  }

  async function requestNotifications() {
    applyNotificationTags();
    return new Promise(function (resolve) {
      var handled = withOneSignal(async function (OneSignal) {
        try {
          if (OneSignal.Notifications && typeof OneSignal.Notifications.requestPermission === 'function') {
            var ok = await OneSignal.Notifications.requestPermission();
            await applyNotificationTags();
            resolve(ok);
            return;
          }
          if (typeof OneSignal.showSlidedownPrompt === 'function') {
            OneSignal.showSlidedownPrompt();
            await applyNotificationTags();
            resolve(true);
            return;
          }
          resolve(false);
        } catch (err) {
          console.warn('[Omideno7] Notification permission request failed:', err);
          resolve(false);
        }
      });
      if (!handled) resolve(false);
    });
  }

  // Expose a safe helper for existing notification buttons in the app.
  window.omideno7EnableNotifications = requestNotifications;
  window.omideno7UpdateNotificationTags = applyNotificationTags;

  function isNotificationButton(el) {
    if (!el || !el.textContent) return false;
    var t = el.textContent.toLowerCase();
    return /notification|notifications|نوتیفیکیشن|اعلان|اعلان‌ها|obavijest|obavijesti/.test(t);
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest && event.target.closest('button, a, .btn, [role="button"]');
    if (!btn || !isNotificationButton(btn)) return;
    requestNotifications();
  }, true);

  function cleanFooterVersion() {
    try {
      var nodes = Array.from(document.querySelectorAll('body *'));
      var matches = nodes.filter(function (el) {
        if (!el || el.children.length > 0) return false;
        var txt = (el.textContent || '').trim();
        return /App\s*Version|نسخه|Version\s*[:：]?\s*V?\d|V\d{2}/i.test(txt);
      });
      var footerMatches = matches.filter(function (el) {
        var txt = (el.textContent || '').trim();
        return /App\s*Version|V\d{2}|V58|V59|V60|V61/i.test(txt);
      });
      if (!footerMatches.length) return;
      footerMatches.forEach(function (el, i) {
        if (i === 0) {
          el.textContent = VERSION_TEXT;
          el.style.display = '';
        } else {
          el.remove();
        }
      });
    } catch (e) {}
  }

  function init() {
    applyNotificationTags();
    cleanFooterVersion();
    var count = 0;
    var timer = setInterval(function () {
      count += 1;
      applyNotificationTags();
      cleanFooterVersion();
      if (count >= 8) clearInterval(timer);
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
