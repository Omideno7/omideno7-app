/* Omideno7 V63.37 — stronger final version stability lock
   Purpose: force the More-page footer version to stay on V63.37 even if older scripts write V63.36.
   Safe scope: only app-version/footer version labels.
*/
(function(){
  'use strict';

  var VERSION = 'V63.37';
  var LABEL = 'App Version: ' + VERSION;
  var STYLE_ID = 'om7-v6337-version-lock-style';

  window.APP_VERSION = VERSION;
  window.OMIDENO7_APP_VERSION = VERSION;

  function injectStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '' +
      '#appVersion,.app-version,[data-app-version]{' +
      'display:inline-block!important;' +
      'min-width:150px!important;' +
      'min-height:18px!important;' +
      'line-height:18px!important;' +
      'white-space:nowrap!important;' +
      'font-variant-numeric:tabular-nums!important;' +
      '}';
    document.head.appendChild(style);
  }

  function findFooter(){
    return document.querySelector('#more .footer')
      || document.querySelector('#mainFooter')
      || document.querySelector('.footer')
      || document.querySelector('#more')
      || document.body;
  }

  function cleanTextNodes(scope){
    try{
      var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(node){
        if(node.parentElement && (node.parentElement.id === 'appVersion' || node.parentElement.classList.contains('app-version'))) return;
        var txt = node.nodeValue || '';
        if(/App\s*Version\s*:\s*V\d+(?:\.\d+)?/i.test(txt)){
          node.nodeValue = txt.replace(/\s*App\s*Version\s*:\s*V\d+(?:\.\d+)?\s*/gi, ' ');
        }
      });
    }catch(e){}
  }

  function forceVersion(){
    try{
      injectStyle();
      window.APP_VERSION = VERSION;
      window.OMIDENO7_APP_VERSION = VERSION;

      var footer = findFooter();
      if(!footer) return;

      // Remove duplicated version nodes except the final #appVersion.
      document.querySelectorAll('small.app-version,[data-app-version]').forEach(function(el){
        if(el.id !== 'appVersion' && /App\s*Version\s*:/i.test(el.textContent || '')) el.remove();
      });

      var versionEl = document.getElementById('appVersion');
      if(!versionEl){
        versionEl = document.createElement('small');
        versionEl.id = 'appVersion';
        versionEl.className = 'app-version';
        versionEl.setAttribute('data-app-version','v6337-final');
        if(footer.lastChild && footer.lastChild.nodeName !== 'BR') footer.appendChild(document.createElement('br'));
        footer.appendChild(versionEl);
      }

      versionEl.className = 'app-version';
      versionEl.setAttribute('data-app-version','v6337-final');
      if(versionEl.textContent !== LABEL) versionEl.textContent = LABEL;

      cleanTextNodes(footer);
    }catch(e){}
  }

  function runMany(){
    forceVersion();
    setTimeout(forceVersion, 100);
    setTimeout(forceVersion, 400);
    setTimeout(forceVersion, 1000);
    setTimeout(forceVersion, 2500);
  }

  document.addEventListener('DOMContentLoaded', runMany);
  window.addEventListener('load', runMany);
  document.addEventListener('click', function(){ setTimeout(forceVersion, 100); }, true);

  // Stronger than the V63.36 lock: keep this active, but only touches the version label.
  setInterval(forceVersion, 1000);

  try{
    var obs = new MutationObserver(function(){ forceVersion(); });
    function startObserver(){
      var target = findFooter();
      if(target) obs.observe(target, {childList:true, subtree:true, characterData:true});
    }
    document.addEventListener('DOMContentLoaded', startObserver);
    setTimeout(startObserver, 500);
    setTimeout(startObserver, 2000);
  }catch(e){}
})();
