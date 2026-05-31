/* Omideno7 V58.1 — single stable version label fix
   This removes duplicate App Version texts created by older hotfix scripts
   and keeps one clean, stable label in the More page footer. */
(function(){
  'use strict';
  const VERSION = 'V58.1';
  const LABEL = 'App Version: ' + VERSION;
  window.APP_VERSION = VERSION;
  window.OMIDENO7_APP_VERSION = VERSION;

  function cleanText(text){
    return String(text || '')
      .replace(/(?:App Version:\s*V\d+(?:\.\d+)?\s*){1,}/gi, '')
      .replace(/(?:نسخه\s*:?[\s\u200c]*V\d+(?:\.\d+)?\s*){1,}/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function normalizeVersion(){
    try{
      const footer = document.querySelector('#more .footer');
      if(!footer) return;

      // Remove old small/version nodes inside the footer only.
      footer.querySelectorAll('small,.app-version,[data-app-version],#appVersion').forEach(el => el.remove());

      // Clean duplicated version text that older hotfixes may have injected into text nodes.
      const walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if(/App Version:|نسخه/i.test(node.nodeValue || '')){
          node.nodeValue = cleanText(node.nodeValue);
        }
      });

      // Remove empty text-only leftovers and excessive whitespace.
      footer.innerHTML = footer.innerHTML
        .replace(/(?:\s|&nbsp;)*(?:<br\s*\/?>\s*){2,}/gi, '<br>')
        .replace(/>\s+</g, '><')
        .trim();

      // Append exactly one clean version label.
      const br = document.createElement('br');
      const small = document.createElement('small');
      small.id = 'appVersion';
      small.className = 'app-version';
      small.textContent = LABEL;
      footer.appendChild(br);
      footer.appendChild(small);
    }catch(e){/* keep app running */}
  }

  document.addEventListener('DOMContentLoaded', () => {
    normalizeVersion();
    setTimeout(normalizeVersion, 200);
    setTimeout(normalizeVersion, 1000);
  });

  // Run after language/page changes too, but avoid endless DOM churn.
  let timer = null;
  document.addEventListener('click', () => {
    clearTimeout(timer);
    timer = setTimeout(normalizeVersion, 250);
  }, true);
})();
