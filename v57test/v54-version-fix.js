(function(){
  'use strict';
  const VERSION='V54';
  window.OMIDENO7_APP_VERSION=VERSION;
  function setVersionText(){
    document.querySelectorAll('small,.footer,footer,[data-app-version]').forEach(el=>{
      if(/App Version:\s*V\d+/i.test(el.innerHTML)) el.innerHTML=el.innerHTML.replace(/App Version:\s*V\d+/ig,'App Version: '+VERSION);
    });
    const more=document.querySelector('#more .footer small');
    if(more) more.textContent='App Version: '+VERSION;
  }
  function fixHomeDesc(){
    document.querySelectorAll('[data-i18n="homeDesc"]').forEach(el=>{
      if(el.textContent.includes('کلیسای آنلاین مسیحی')) el.textContent=el.textContent.replace('کلیسای آنلاین مسیحی','کلیسای آنلاین');
      if(el.textContent.includes('online Christian church')) el.textContent=el.textContent.replace('online Christian church','online church');
      if(el.textContent.includes('Online kršćanska crkva')) el.textContent=el.textContent.replace('Online kršćanska crkva','Online crkva');
    });
  }
  function install(){ setVersionText(); fixHomeDesc(); }
  document.addEventListener('DOMContentLoaded',()=>{ install(); setInterval(install,1500); });
})();
