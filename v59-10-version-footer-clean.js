/* Omideno7 V59.10 - Footer Version Display Fix
   Scope: only cleans duplicate App Version labels in the footer.
   It does not change Bible, Plans, Q&A, Audio, Notifications, or navigation.
*/
(function(){
  'use strict';
  var VERSION = 'V59.10';
  var fixing = false;

  function cleanFooterVersion(){
    if(fixing) return;
    fixing = true;
    try{
      window.APP_VERSION = VERSION;
      var footers = document.querySelectorAll('.footer');
      footers.forEach(function(footer){
        // Remove all existing version labels, including old hotfixes.
        footer.querySelectorAll('#appVersion, .app-version, [data-app-version-label]').forEach(function(el){
          el.remove();
        });

        // Remove text nodes that contain old App Version text.
        Array.from(footer.childNodes).forEach(function(node){
          if(node.nodeType === 3 && /App\s*Version\s*:/i.test(node.textContent || '')){
            node.remove();
          }
        });

        // Remove empty line breaks at the end created by old fixes.
        while(footer.lastChild && footer.lastChild.nodeName === 'BR'){
          footer.lastChild.remove();
        }

        var label = document.createElement('small');
        label.id = 'appVersion';
        label.className = 'app-version';
        label.setAttribute('data-app-version-label','1');
        label.textContent = 'App Version: ' + VERSION;

        footer.appendChild(document.createElement('br'));
        footer.appendChild(label);
      });
    }catch(e){
      console.warn('Version footer clean failed:', e);
    }finally{
      setTimeout(function(){ fixing = false; }, 50);
    }
  }

  function scheduleFixes(){
    [0, 300, 1000, 2500, 5000].forEach(function(ms){
      setTimeout(cleanFooterVersion, ms);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', scheduleFixes, {once:true});
  }else{
    scheduleFixes();
  }

  // Only watch the More footer area, not the whole app, to avoid performance issues.
  setTimeout(function(){
    var moreFooter = document.querySelector('#more .footer');
    if(!moreFooter || !window.MutationObserver) return;
    var timer = null;
    var observer = new MutationObserver(function(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(cleanFooterVersion, 120);
    });
    observer.observe(moreFooter, {childList:true, subtree:false, characterData:true});
  }, 1200);
})();
