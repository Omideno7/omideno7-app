/* Omideno7 V60 - Final Footer Version Fix
   Scope: ONLY manages the footer version/tagline inside #more .footer.
   It removes old duplicate version labels and prints one clean V60 label.
*/
(function(){
  'use strict';
  var VERSION = 'V60';
  var running = false;

  function currentLang(){
    try{
      return localStorage.getItem('omideno7_lang') || document.documentElement.lang || 'fa';
    }catch(e){ return 'fa'; }
  }

  function tagline(lang){
    if(lang === 'fa') return 'بنا شده بر مسیح، هدایت‌شده با روح‌القدس.';
    if(lang === 'hr') return 'Izgrađena na Kristu. Vođena Duhom.';
    return 'Built on Christ. Led by the Spirit.';
  }

  function copyright(lang){
    // Keep the church name consistent and do not duplicate the copyright symbol.
    if(lang === 'fa') return '© Omideno7 Church (New Hope7)';
    if(lang === 'hr') return '© Omideno7 Church (New Hope7)';
    return '© Omideno7 Church (New Hope7)';
  }

  function cleanLooseVersionNodes(){
    try{
      document.querySelectorAll('.footer').forEach(function(footer){
        footer.querySelectorAll('#appVersion,.app-version,[data-app-version-label]').forEach(function(el){ el.remove(); });
        Array.from(footer.childNodes).forEach(function(node){
          if(node.nodeType === 3 && /App\s*Version\s*:/i.test(node.textContent || '')) node.remove();
        });
      });
    }catch(e){}
  }

  function renderFooter(){
    if(running) return;
    running = true;
    try{
      cleanLooseVersionNodes();
      var footer = document.querySelector('#more .footer');
      if(!footer) return;
      var lang = currentLang();
      footer.id = 'mainFooter';
      footer.setAttribute('data-footer-managed','v60');
      footer.innerHTML = '';

      var line1 = document.createElement('div');
      line1.className = 'footer-copy';
      line1.textContent = copyright(lang);

      var line2 = document.createElement('div');
      line2.className = 'footer-tagline';
      line2.textContent = tagline(lang);

      var line3 = document.createElement('div');
      line3.id = 'appVersion';
      line3.className = 'app-version';
      line3.setAttribute('data-app-version-label','1');
      line3.textContent = 'App Version: ' + VERSION;

      footer.appendChild(line1);
      footer.appendChild(line2);
      footer.appendChild(line3);
      window.APP_VERSION = VERSION;
    }catch(e){
      console.warn('V60 footer render failed:', e);
    }finally{
      setTimeout(function(){ running = false; }, 80);
    }
  }

  function schedule(){
    [0, 250, 750, 1500, 3000].forEach(function(ms){ setTimeout(renderFooter, ms); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
  else schedule();

  // React to language button clicks only, not continuous scanning.
  document.addEventListener('click', function(e){
    if(e.target && (e.target.matches('[data-lang]') || e.target.closest('[data-lang]'))){
      setTimeout(renderFooter, 250);
      setTimeout(renderFooter, 900);
    }
  }, true);

  // A tiny, limited observer for footer changes only.
  setTimeout(function(){
    var footer = document.querySelector('#more .footer');
    if(!footer || !window.MutationObserver) return;
    var timer = null;
    var obs = new MutationObserver(function(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(renderFooter, 150);
    });
    obs.observe(footer, {childList:true, subtree:false, characterData:false});
  }, 1200);
})();
