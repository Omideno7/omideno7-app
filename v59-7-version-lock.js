/* Omideno7 V59.7 — final stable version label lock
   Purpose: prevent older hotfix scripts from repeatedly changing/duplicating the footer version.
*/
(function(){
  'use strict';
  const VERSION = 'V59.7';
  const LABEL = 'App Version: ' + VERSION;
  window.APP_VERSION = VERSION;
  window.OMIDENO7_APP_VERSION = VERSION;

  function cleanFooterVersion(){
    try{
      const footer = document.querySelector('#more .footer');
      if(!footer) return;

      // Remove all version elements except one final #appVersion.
      footer.querySelectorAll('small.app-version,[data-app-version]').forEach(el => {
        if(el.id !== 'appVersion') el.remove();
      });

      let versionEl = footer.querySelector('#appVersion');
      if(!versionEl){
        versionEl = document.createElement('small');
        versionEl.id = 'appVersion';
        versionEl.className = 'app-version';
        footer.appendChild(document.createElement('br'));
        footer.appendChild(versionEl);
      }
      versionEl.className = 'app-version';
      versionEl.textContent = LABEL;

      // Clean accidental duplicate plain text in the footer, without touching normal footer text.
      const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while(walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(node => {
        if(node.parentElement && node.parentElement.id === 'appVersion') return;
        if(/App Version:\s*V\d+(?:\.\d+)?/i.test(node.nodeValue || '')){
          node.nodeValue = (node.nodeValue || '').replace(/(?:\s*App Version:\s*V\d+(?:\.\d+)?\s*)+/gi, ' ');
        }
      });
    }catch(e){/* keep app running */}
  }

  function runSoon(){
    cleanFooterVersion();
    setTimeout(cleanFooterVersion, 200);
    setTimeout(cleanFooterVersion, 900);
  }

  document.addEventListener('DOMContentLoaded', runSoon);
  window.addEventListener('load', runSoon);
  document.addEventListener('click', () => setTimeout(cleanFooterVersion, 150), true);

  // Short-lived observer: fixes old script changes, then disconnects to avoid any performance issue.
  let obs;
  try{
    obs = new MutationObserver(() => cleanFooterVersion());
    const start = () => {
      const footer = document.querySelector('#more .footer');
      if(footer){
        obs.observe(footer, {childList:true, subtree:true, characterData:true});
        setTimeout(() => { try{ obs.disconnect(); }catch(e){} }, 15000);
      }
    };
    document.addEventListener('DOMContentLoaded', start);
    setTimeout(start, 1000);
  }catch(e){}
})();
