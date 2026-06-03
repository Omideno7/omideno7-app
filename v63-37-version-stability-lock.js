/* Omideno7 V63.37 — final version stability lock
   Purpose: keep the More/footer version stable after older hotfix scripts try to change it.
*/
(function(){
  'use strict';
  var VERSION = 'V63.37';
  var LABEL = 'App Version: ' + VERSION;
  window.APP_VERSION = VERSION;
  window.OMIDENO7_APP_VERSION = VERSION;

  function cleanFooterVersion(){
    try{
      var footer = document.querySelector('#more .footer, #mainFooter');
      if(!footer) return;
      var nodes = footer.querySelectorAll('small.app-version,[data-app-version],#appVersion');
      for(var i=0; i<nodes.length; i++){
        if(nodes[i].id !== 'appVersion') nodes[i].remove();
      }
      var versionEl = footer.querySelector('#appVersion');
      if(!versionEl){
        versionEl = document.createElement('small');
        versionEl.id = 'appVersion';
        versionEl.className = 'app-version';
        footer.appendChild(versionEl);
      }
      versionEl.className = 'app-version';
      versionEl.setAttribute('data-app-version','v6337');
      versionEl.textContent = LABEL;

      var walker = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
      var textNodes = [];
      while(walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach(function(node){
        if(node.parentElement && node.parentElement.id === 'appVersion') return;
        if(/App Version:\s*V\d+(?:\.\d+)?/i.test(node.nodeValue || '')){
          node.nodeValue = (node.nodeValue || '').replace(/(?:\s*App Version:\s*V\d+(?:\.\d+)?\s*)+/gi, ' ');
        }
      });
    }catch(e){}
  }

  function run(){
    cleanFooterVersion();
    setTimeout(cleanFooterVersion, 150);
    setTimeout(cleanFooterVersion, 800);
  }

  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){ setTimeout(cleanFooterVersion, 120); }, true);
  setInterval(cleanFooterVersion, 2500);
})();
