/* Omideno7 V63.36 — OneSignal app language tag sync
   Makes notification targeting follow the app language: fa, en, hr.
*/
(function(){
  'use strict';

  var VERSION = 'V63.36';

  function getLang(){
    try{
      var saved = localStorage.getItem('lang');
      if(saved === 'fa' || saved === 'en' || saved === 'hr') return saved;
      var htmlLang = document.documentElement.lang;
      if(htmlLang === 'fa' || htmlLang === 'en' || htmlLang === 'hr') return htmlLang;
    }catch(e){}
    return 'fa';
  }

  function syncTag(){
    try{
      var lang = getLang();
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(async function(OneSignal){
        try{
          if(OneSignal.User && OneSignal.User.addTags){
            await OneSignal.User.addTags({
              app_language: lang,
              language: lang,
              omideno7_lang: lang
            });
          }else if(OneSignal.User && OneSignal.User.addTag){
            await OneSignal.User.addTag('app_language', lang);
            await OneSignal.User.addTag('language', lang);
            await OneSignal.User.addTag('omideno7_lang', lang);
          }else if(OneSignal.sendTags){
            OneSignal.sendTags({app_language: lang, language: lang, omideno7_lang: lang});
          }else if(OneSignal.sendTag){
            OneSignal.sendTag('app_language', lang);
            OneSignal.sendTag('language', lang);
            OneSignal.sendTag('omideno7_lang', lang);
          }
          try{ localStorage.setItem('omideno7_notification_language_synced_v6336', lang); }catch(e){}
          console.log('Omideno7 notification language synced:', lang);
        }catch(e){
          console.warn('Omideno7 notification language sync failed:', e && e.message ? e.message : e);
        }
      });
    }catch(e){}
  }

  function install(){
    syncTag();

    document.addEventListener('click', function(ev){
      var btn = ev.target && ev.target.closest ? ev.target.closest('[data-lang]') : null;
      if(btn){ setTimeout(syncTag, 250); setTimeout(syncTag, 1000); }
    }, true);

    document.addEventListener('click', function(ev){
      var nbtn = ev.target && ev.target.closest ? ev.target.closest('.enable-notifications,[data-enable-notifications]') : null;
      if(nbtn){ setTimeout(syncTag, 1000); setTimeout(syncTag, 2500); }
    }, true);

    setInterval(syncTag, 1000 * 60 * 30);
  }

  document.addEventListener('DOMContentLoaded', install);
  window.addEventListener('load', function(){ setTimeout(syncTag, 500); setTimeout(syncTag, 2500); });
  setTimeout(syncTag, 1000);
  setTimeout(syncTag, 4000);

  window.OMIDENO7_APP_VERSION = VERSION;
})();
