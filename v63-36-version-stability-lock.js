/* Omideno7 V63.36 — stable footer version lock
   Purpose: stop the More-page app version label from jumping/changing because older scripts still try to write old version numbers.
   Safe scope: only the More footer version label.
*/
(function(){
  'use strict';

  var VERSION = 'V63.36';
  var LABEL = 'App Version: ' + VERSION;
  var STYLE_ID = 'om7-v6336-version-lock-style';
  var OBSERVER_TIMEOUT_MS = 30000;

  window.APP_VERSION = VERSION;
  window.OMIDENO7_APP_VERSION = VERSION;

  function injectStyle(){
    if(document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = '' +
      '#more .footer .app-version,#more .footer #appVersion{' +
      'display:inline-block!important;' +
      'min-width:150px!important;' +
      'min-height:18px!important;' +
      'line-height:18px!important;' +
      'white-space:nowrap!important;' +
      'font-variant-numeric:tabular-nums!important;' +
      '}';
    document.head.appendChild(style);
  }

  function getFooter(){
    return document.querySelector('#more .footer') || document.querySelector('.footer');
  }

  function cleanTextNodes(footer){
    try{
      var walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
      var nodes = [];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(node){
        if(node.parentElement && node.parentElement.id === 'appVersion') return;
        var txt = node.nodeValue || '';
        if(/App\s*Version\s*:\s*V\d+(?:\.\d+)?/i.test(txt)){
          node.nodeValue = txt.replace(/\s*App\s*Version\s*:\s*V\d+(?:\.\d+)?\s*/gi, ' ');
        }
      });
    }catch(e){}
  }

  function stabilizeVersion(){
    injectStyle();

    var footer = getFooter();
    if(!footer) return;

    try{
      var versionEl = footer.querySelector('#appVersion');

      footer.querySelectorAll('small.app-version,[data-app-version]').forEach(function(el){
        if(el.id !== 'appVersion') el.remove();
      });

      if(!versionEl){
        versionEl = document.createElement('small');
        versionEl.id = 'appVersion';
        versionEl.className = 'app-version';
        versionEl.setAttribute('data-app-version','stable');

        if(footer.lastChild && footer.lastChild.nodeName !== 'BR'){
          footer.appendChild(document.createElement('br'));
        }
        footer.appendChild(versionEl);
      }

      versionEl.className = 'app-version';
      versionEl.setAttribute('data-app-version','stable');
      if(versionEl.textContent !== LABEL) versionEl.textContent = LABEL;

      cleanTextNodes(footer);
    }catch(e){}
  }

  function runMany(){
    stabilizeVersion();
    setTimeout(stabilizeVersion, 150);
    setTimeout(stabilizeVersion, 600);
    setTimeout(stabilizeVersion, 1500);
  }

  document.addEventListener('DOMContentLoaded', runMany);
  window.addEventListener('load', runMany);
  document.addEventListener('click', function(){ setTimeout(stabilizeVersion, 120); }, true);

  try{
    var observer = new MutationObserver(function(){ stabilizeVersion(); });
    var started = false;
    function startObserver(){
      if(started) return;
      var footer = getFooter();
      if(!footer) return;
      started = true;
      observer.observe(footer, {childList:true, subtree:true, characterData:true});
      setTimeout(function(){ try{ observer.disconnect(); }catch(e){} }, OBSERVER_TIMEOUT_MS);
    }
    document.addEventListener('DOMContentLoaded', startObserver);
    setTimeout(startObserver, 500);
    setTimeout(startObserver, 2000);
  }catch(e){}
})();
