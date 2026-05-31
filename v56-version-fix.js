/* Omideno7 V56 — version label fix */
(function(){
  const APP_VERSION='V56';
  window.APP_VERSION=APP_VERSION;
  function paint(){
    try{
      document.querySelectorAll('.app-version,[data-app-version],#appVersion').forEach(el=>{ el.textContent='App Version: '+APP_VERSION; });
      document.querySelectorAll('footer,.footer,small').forEach(el=>{
        if(/App Version:\s*V\d+/i.test(el.textContent||'')) el.textContent=(el.textContent||'').replace(/App Version:\s*V\d+/i,'App Version: '+APP_VERSION);
      });
    }catch(e){}
  }
  document.addEventListener('DOMContentLoaded',paint);
  setTimeout(paint,300); setInterval(paint,2500);
})();
