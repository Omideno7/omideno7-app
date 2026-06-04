/* Omideno7 V63.40 Beta — Bottom Nav Book Icon Fix
   Beta-only visual repair. Does not change app data or navigation logic.
*/
(function(){
  'use strict';
  function run(){
    try{
      document.querySelectorAll('.bottom-nav .nav-btn[data-page="bible"] .icon, .bible-nav-symbol').forEach(function(el){
        if(!el.textContent || !el.textContent.trim()) el.textContent = '📖';
        el.setAttribute('aria-hidden','true');
      });
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  setTimeout(run, 300);
})();
