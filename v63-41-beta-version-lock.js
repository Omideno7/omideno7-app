/* Omideno7 V63.41 Beta Version Display Lock */
(function(){
  'use strict';
  var VERSION='V63.41 Beta';
  function run(){
    try{
      if(!/beta\.html/i.test(location.pathname) && !/v=6341/i.test(location.search)) return;
      window.APP_VERSION = VERSION;
      window.OMIDENO7_APP_VERSION = VERSION;
      var footer = document.querySelector('#more .footer') || document.querySelector('.footer');
      if(!footer) return;
      var el = footer.querySelector('#appVersion') || footer.querySelector('.app-version');
      if(!el){
        el = document.createElement('small');
        el.id = 'appVersion';
        el.className = 'app-version';
        footer.appendChild(document.createElement('br'));
        footer.appendChild(el);
      }
      el.textContent = 'App Version: ' + VERSION;
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded', run);
  window.addEventListener('load', run);
  document.addEventListener('click', function(){ setTimeout(run,100); }, true);
  setTimeout(run,300);
  setTimeout(run,1200);
})();
