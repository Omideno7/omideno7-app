/* Omideno7 V63.41c — Strong Beta Version Lock
   Fixes different version numbers in the blue header and More footer.
   Beta-only. */
(function(){
  'use strict';
  var VERSION = 'V63.41 Beta';
  var FULL = 'App Version: ' + VERSION;

  function isBeta(){
    return /beta\.html/i.test(location.pathname) || /v=6341/i.test(location.search);
  }
  if(!isBeta()) return;

  function looksLikeVersionText(t){
    return /App\s*Version\s*:\s*V/i.test(t || '') || /نسخه|ورژن/i.test(t || '');
  }

  function setNodeText(node){
    if(!node || !node.childNodes || node.childNodes.length > 3) return;
    var txt = (node.textContent || '').trim();
    if(looksLikeVersionText(txt)){
      node.textContent = FULL;
    }
  }

  function run(){
    try{
      window.APP_VERSION = VERSION;
      window.OMIDENO7_APP_VERSION = VERSION;
      window.OMIDENO7_BETA_VERSION = VERSION;

      // Direct known version nodes
      ['appVersion','version','app-version'].forEach(function(id){
        var el = document.getElementById(id);
        if(el) el.textContent = FULL;
      });

      Array.prototype.slice.call(document.querySelectorAll('.app-version,.version,.footer small,.footer,header,.app-header,.top-version,b,small,div,p,span')).forEach(function(el){
        var txt = (el.textContent || '').trim();
        if(looksLikeVersionText(txt) && txt.length < 120){
          setNodeText(el);
        }
      });

      var footer = document.querySelector('#more .footer') || document.querySelector('.footer');
      if(footer){
        var found = false;
        Array.prototype.slice.call(footer.querySelectorAll('*')).forEach(function(el){
          if(looksLikeVersionText((el.textContent||'').trim()) && (el.textContent||'').length < 80){
            el.textContent = FULL; found = true;
          }
        });
        if(!found){
          var br=document.createElement('br');
          var s=document.createElement('small');
          s.className='app-version';
          s.textContent=FULL;
          footer.appendChild(br);
          footer.appendChild(s);
        }
      }

      // Add a small fixed beta label only if header version still can't be found
      var header = document.querySelector('.app-header') || document.querySelector('header');
      if(header && !document.getElementById('v6341BetaHeaderVersion')){
        var badge = document.createElement('div');
        badge.id = 'v6341BetaHeaderVersion';
        badge.textContent = FULL;
        badge.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);top:8px;color:#fff;font-weight:800;font-size:14px;z-index:20;pointer-events:none;';
        try{ header.style.position = header.style.position || 'relative'; header.appendChild(badge); }catch(e){}
      }
    }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){ setTimeout(run, 100); }, true);
  setInterval(run, 1200);
  setTimeout(run, 200);
  setTimeout(run, 800);
  setTimeout(run, 1800);
})();
