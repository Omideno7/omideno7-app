/* Omideno7 V63.41h — Clean Beta Version Display Lock
   Beta-only. Fixes flickering/competing version labels like V61.5/V61.7/V63.36.
   Does not affect public index.html.
*/
(function(){
  'use strict';

  var VERSION = 'V63.41 Beta';
  var FULL = 'App Version: ' + VERSION;
  var BADGE_ID = 'om7BetaVersionBadgeV6341h';
  var FOOTER_ID = 'om7BetaFooterVersionV6341h';

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function isVersionText(txt){
    txt = String(txt || '').trim();
    return /App\s*Version\s*:\s*V/i.test(txt) || /Version\s*:\s*V/i.test(txt) || /ورژن|نسخه/i.test(txt);
  }

  function hideOldVersionNodes(){
    try{
      var nodes = Array.prototype.slice.call(document.querySelectorAll('header, .app-header, .footer, #more, .app-version, #appVersion, small, span, p, b, div'));
      nodes.forEach(function(el){
        if(!el || el.dataset.om7FixedVersion === '1') return;
        if(el.id === BADGE_ID || el.id === FOOTER_ID) return;
        var txt = (el.textContent || '').trim();
        if(!txt || txt.length > 90) return;
        if(isVersionText(txt)){
          el.textContent = '';
          el.style.display = 'none';
          el.setAttribute('aria-hidden','true');
          el.dataset.om7OldVersionHidden = '1';
        }
      });
    }catch(e){}
  }

  function ensureHeaderBadge(){
    try{
      var header = document.querySelector('.app-header') || document.querySelector('header');
      if(!header) return;
      var badge = document.getElementById(BADGE_ID);
      if(!badge){
        badge = document.createElement('div');
        badge.id = BADGE_ID;
        badge.dataset.om7FixedVersion = '1';
        badge.style.cssText = [
          'position:absolute',
          'left:50%',
          'transform:translateX(-50%)',
          'top:8px',
          'color:#fff',
          'font-weight:900',
          'font-size:14px',
          'line-height:1.2',
          'z-index:9999',
          'pointer-events:none',
          'text-shadow:0 1px 2px rgba(0,0,0,.25)',
          'white-space:nowrap'
        ].join(';');
        header.style.position = header.style.position || 'relative';
        header.appendChild(badge);
      }
      badge.textContent = FULL;
      badge.style.display = 'block';
    }catch(e){}
  }

  function ensureFooterVersion(){
    try{
      var footer = document.querySelector('#more .footer') || document.querySelector('.footer');
      if(!footer) return;
      var el = document.getElementById(FOOTER_ID);
      if(!el){
        el = document.createElement('div');
        el.id = FOOTER_ID;
        el.dataset.om7FixedVersion = '1';
        el.style.cssText = 'font-size:12px;font-weight:800;color:#667085;margin-top:6px;text-align:center;';
        footer.appendChild(el);
      }
      el.textContent = FULL;
      el.style.display = 'block';
    }catch(e){}
  }

  function lockGlobals(){
    try{
      window.APP_VERSION = VERSION;
      window.OMIDENO7_APP_VERSION = VERSION;
      window.OMIDENO7_BETA_VERSION = VERSION;
      window.OMIDENO7_VERSION_DISPLAY = FULL;
    }catch(e){}
  }

  function run(){
    lockGlobals();
    hideOldVersionNodes();
    ensureHeaderBadge();
    ensureFooterVersion();
  }

  function installCss(){
    if(document.getElementById('om7BetaVersionCssV6341h')) return;
    var st = document.createElement('style');
    st.id = 'om7BetaVersionCssV6341h';
    st.textContent = [
      '#'+BADGE_ID+'{display:block!important;visibility:visible!important;opacity:1!important;}',
      '#'+FOOTER_ID+'{display:block!important;visibility:visible!important;opacity:1!important;}',
      '[data-om7-old-version-hidden="1"]{display:none!important;visibility:hidden!important;}'
    ].join('\n');
    document.head.appendChild(st);
  }

  document.addEventListener('DOMContentLoaded', function(){ installCss(); run(); });
  window.addEventListener('load', function(){ installCss(); run(); });
  document.addEventListener('click', function(){ setTimeout(run, 50); setTimeout(run, 250); }, true);
  document.addEventListener('change', function(){ setTimeout(run, 50); setTimeout(run, 250); }, true);

  try{
    var mo = new MutationObserver(function(){ run(); });
    mo.observe(document.documentElement || document.body, {childList:true, subtree:true, characterData:true});
  }catch(e){}

  installCss();
  setInterval(run, 300);
  setTimeout(run, 50);
  setTimeout(run, 300);
  setTimeout(run, 1200);
})();
